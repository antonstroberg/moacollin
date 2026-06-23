// Cloudflare Worker entry — static assets + two API routes.
//
// The site is served from the static assets in this repo (see [assets] in
// wrangler.toml). This Worker only runs for requests that don't match a static
// asset, which is where the API routes live. Everything else falls through to
// the assets binding.
//
// The API handlers are the same modules that used to be Pages Functions; they
// take a `{ request, env }` context, so we call them directly.

import { onRequestPost as booking } from './functions/api/booking.js';
import { onRequestPost as checkout } from './functions/api/checkout.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === '/api/booking') {
      if (request.method !== 'POST') return methodNotAllowed();
      return booking({ request, env, ctx });
    }
    if (url.pathname === '/api/checkout') {
      if (request.method !== 'POST') return methodNotAllowed();
      return checkout({ request, env, ctx });
    }

    // Not an API route — let the static assets binding serve it (handles
    // clean URLs, _redirects, _headers, and 404s).
    return env.ASSETS.fetch(request);
  },
};

function methodNotAllowed() {
  return new Response(JSON.stringify({ error: 'method_not_allowed' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json', Allow: 'POST' },
  });
}
