// Cloudflare Pages Function — POST /api/booking
// Receives the homepage booking form and sends an email via MailerSend.
// The API key lives in env (server-side only); it is never shipped to the client.
//
// Required env:
//   MAILERSEND_API_KEY   (secret)  — https://app.mailersend.com/api-tokens
//   MAIL_FROM            (var)     — a sender on a domain verified in MailerSend, e.g. noreply@moacollin.com
// Optional env:
//   MAIL_FROM_NAME       (var)     — display name for the sender
//   CONTACT_EMAIL        (var)     — recipient (defaults to info@moacollin.com)

const MAX = { name: 120, email: 160, org: 160, type: 80, msg: 4000 };

export async function onRequestPost(context) {
  const { env, request } = context;

  let data;
  try {
    data = await request.json();
  } catch (e) {
    return json({ error: 'invalid_json' }, 400);
  }

  const v = {
    name: clip(data.name, MAX.name),
    email: clip(data.email, MAX.email),
    org: clip(data.org, MAX.org),
    type: clip(data.type, MAX.type),
    msg: clip(data.msg, MAX.msg),
  };
  const lang = data.lang === 'en' ? 'en' : 'sv';

  // Honeypot: bots fill hidden fields. Pretend success and drop silently.
  if (clip(data.company_url, 200)) return json({ ok: true });

  if (!v.name || !isEmail(v.email)) {
    return json({ error: 'validation', message: 'Name and a valid email are required.' }, 422);
  }

  if (!env.MAILERSEND_API_KEY || !env.MAIL_FROM) {
    // Not configured yet — let the client fall back to a mailto link.
    return json({ error: 'not_configured', message: 'Email sending is not configured.' }, 503);
  }

  const recipient = env.CONTACT_EMAIL || 'info@moacollin.com';
  const L = lang === 'en'
    ? { subj: 'Booking request', f: { name: 'Name', email: 'Email', org: 'Organisation', type: 'Type of engagement', msg: 'Message' } }
    : { subj: 'Bokningsförfrågan', f: { name: 'Namn', email: 'E-post', org: 'Organisation', type: 'Typ av uppdrag', msg: 'Meddelande' } };

  const lines = [
    `${L.f.name}: ${v.name}`,
    `${L.f.email}: ${v.email}`,
    `${L.f.org}: ${v.org || '—'}`,
    `${L.f.type}: ${v.type || '—'}`,
    '',
    `${L.f.msg}:`,
    v.msg || '—',
  ];

  const payload = {
    from: { email: env.MAIL_FROM, name: env.MAIL_FROM_NAME || 'Moa Collin' },
    to: [{ email: recipient }],
    reply_to: { email: v.email, name: v.name },
    subject: `${L.subj} – ${v.name}`,
    text: lines.join('\n'),
  };

  let res;
  try {
    res = await fetch('https://api.mailersend.com/v1/email', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + env.MAILERSEND_API_KEY,
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    return json({ error: 'upstream_unreachable' }, 502);
  }

  // MailerSend returns 202 Accepted on success.
  if (res.status === 202 || res.ok) return json({ ok: true });

  const detail = await safeText(res);
  return json({ error: 'send_failed', status: res.status, detail }, 502);
}

function clip(s, max) {
  return (typeof s === 'string' ? s : '').trim().slice(0, max);
}
function isEmail(s) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s);
}
async function safeText(res) {
  try { return (await res.text()).slice(0, 500); } catch (e) { return ''; }
}
function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
