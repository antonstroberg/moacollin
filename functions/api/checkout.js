// Cloudflare Pages Function — POST /api/checkout
// Skeleton for creating a Stripe Checkout Session. Keys live in env (server-side
// only) and are NEVER shipped in the static bundle. Disabled by default until
// BOOKING_ENABLED="true" and a Stripe secret key are configured.
//
// Calls the Stripe REST API directly via fetch (no npm dependency needed on Workers).

export async function onRequestPost(context) {
  const { env, request } = context;

  if (env.BOOKING_ENABLED !== 'true') {
    return json({ error: 'Booking is not enabled yet.' }, 503);
  }
  if (!env.STRIPE_SECRET_KEY || !env.STRIPE_PRICE_ID) {
    return json({ error: 'Stripe is not configured.' }, 500);
  }

  const origin = new URL(request.url).origin;

  const form = new URLSearchParams();
  form.set('mode', 'payment');
  form.set('line_items[0][price]', env.STRIPE_PRICE_ID);
  form.set('line_items[0][quantity]', '1');
  form.set('success_url', origin + '/kontakt?status=success');
  form.set('cancel_url', origin + '/kontakt?status=cancelled');

  const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + env.STRIPE_SECRET_KEY,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: form,
  });

  if (!res.ok) {
    const detail = await res.text();
    return json({ error: 'Stripe error', detail }, 502);
  }

  const session = await res.json();
  return json({ id: session.id, url: session.url });
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
