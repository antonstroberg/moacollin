// POST /api/stripe-webhook
// Receives Stripe events for the book pre-order (Stripe Payment Link) and emails each paid order
// (buyer, quantity, shipping address) to CONTACT_EMAIL via MailerSend.
// Every request is verified against the Stripe-Signature header.
//
// Required env:
//   STRIPE_WEBHOOK_SECRET  (secret)  — whsec_… from the webhook endpoint in Stripe
//   STRIPE_SECRET_KEY      (secret)  — used to look up the order's line items
// Optional env:
//   STRIPE_PAYMENT_LINK_ID (var)     — plink_…; only orders from this link are emailed
// Optional env (without them the order is only visible in the Stripe dashboard):
//   MAILERSEND_API_KEY     (secret)
//   MAIL_FROM / MAIL_FROM_NAME / CONTACT_EMAIL  (vars) — same as /api/booking
//
// Subscribe the endpoint to: checkout.session.completed,
// checkout.session.async_payment_succeeded

const TOLERANCE_SECONDS = 300;

export async function onRequestPost(context) {
  const { env, request } = context;

  if (!env.STRIPE_WEBHOOK_SECRET) return json({ error: 'not_configured' }, 503);

  const payload = await request.text();
  const valid = await verifySignature(payload, request.headers.get('Stripe-Signature'), env.STRIPE_WEBHOOK_SECRET);
  if (!valid) return json({ error: 'invalid_signature' }, 400);

  let event;
  try { event = JSON.parse(payload); } catch (e) { return json({ error: 'invalid_json' }, 400); }

  const session = (event.data && event.data.object) || {};
  const paid =
    (event.type === 'checkout.session.completed' && session.payment_status === 'paid') ||
    event.type === 'checkout.session.async_payment_succeeded';
  // Acknowledge everything else so Stripe doesn't retry it.
  const otherLink = env.STRIPE_PAYMENT_LINK_ID && session.payment_link !== env.STRIPE_PAYMENT_LINK_ID;
  if (!paid || otherLink) {
    return json({ received: true });
  }

  if (!env.MAILERSEND_API_KEY || !env.MAIL_FROM) return json({ received: true, emailed: false });

  const quantity = await lineItemQuantity(session.id, env.STRIPE_SECRET_KEY);
  const customer = session.customer_details || {};
  // Newer API versions moved shipping_details under collected_information.
  const shipping = (session.collected_information && session.collected_information.shipping_details) || session.shipping_details || {};
  const addr = shipping.address || {};
  const amount = new Intl.NumberFormat('sv-SE', { style: 'currency', currency: (session.currency || 'sek').toUpperCase() })
    .format((session.amount_total || 0) / 100);
  const dashboard = 'https://dashboard.stripe.com/' + (session.livemode ? '' : 'test/') + 'payments/' + session.payment_intent;

  const lines = [
    'Ny förbeställning av Från stök till studiero',
    '',
    `Antal: ${quantity || '—'}`,
    `Belopp: ${amount}`,
    '',
    `Namn: ${customer.name || '—'}`,
    `E-post: ${customer.email || '—'}`,
    `Telefon: ${customer.phone || '—'}`,
    '',
    'Leveransadress:',
    shipping.name,
    addr.line1,
    addr.line2,
    [addr.postal_code, addr.city].filter(Boolean).join(' '),
    addr.country,
    '',
    `Stripe: ${dashboard}`,
  ].filter((l) => l !== undefined && l !== null);

  const mail = {
    from: { email: env.MAIL_FROM, name: env.MAIL_FROM_NAME || 'Moa Collin' },
    to: [{ email: env.CONTACT_EMAIL || 'info@moacollin.com' }],
    subject: `Ny förbeställning – ${customer.name || customer.email || session.id}` + (quantity ? ` (${quantity} st)` : ''),
    text: lines.join('\n'),
  };
  if (customer.email) mail.reply_to = { email: customer.email, name: customer.name || customer.email };

  let res;
  try {
    res = await fetch('https://api.mailersend.com/v1/email', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + env.MAILERSEND_API_KEY,
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify(mail),
    });
  } catch (e) {
    return json({ error: 'upstream_unreachable' }, 502);
  }
  // A non-2xx response makes Stripe retry the event later.
  if (res.status === 202 || res.ok) return json({ received: true, emailed: true });
  return json({ error: 'send_failed', status: res.status }, 502);
}

// Stripe-Signature: t=<unix>,v1=<hex hmac-sha256 of "<t>.<payload>">[,v1=…]
async function verifySignature(payload, header, secret) {
  if (!header) return false;
  let t = null;
  const sigs = [];
  header.split(',').forEach((part) => {
    const i = part.indexOf('=');
    const k = part.slice(0, i).trim();
    const v = part.slice(i + 1).trim();
    if (k === 't') t = v;
    else if (k === 'v1') sigs.push(v);
  });
  if (!t || !sigs.length) return false;
  if (Math.abs(Date.now() / 1000 - Number(t)) > TOLERANCE_SECONDS) return false;

  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const mac = new Uint8Array(await crypto.subtle.sign('HMAC', key, enc.encode(`${t}.${payload}`)));
  const expected = Array.from(mac, (b) => b.toString(16).padStart(2, '0')).join('');
  return sigs.some((s) => timingSafeEqual(s, expected));
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

// The session object doesn't include line items, so fetch them for the quantity.
async function lineItemQuantity(sessionId, secretKey) {
  if (!secretKey) return null;
  try {
    const res = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}/line_items`, {
      headers: { Authorization: 'Bearer ' + secretKey },
    });
    if (!res.ok) return null;
    const items = await res.json();
    return (items.data || []).reduce((n, item) => n + (item.quantity || 0), 0) || null;
  } catch (e) {
    return null;
  }
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
