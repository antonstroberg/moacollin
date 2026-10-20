# moacollin.com

Static site for **Moa Collin** — public speaker & author (relational leadership).
Built from the *Moa Collin Design System* (Claude Design). Bilingual (SV / EN),
fully responsive, deployable on **Cloudflare Pages**.

## Structure

```
index.html        /            Homepage — hero, credentials, About, offerings, quote, book, booking form
erfarenhet.html   /erfarenhet  Experience — hero, stats, section hub, CTA
karriar.html      /karriar     Career timeline
kompetens.html    /kompetens   Areas of expertise
assets/
  styles.css      Design tokens + components (Logo, Button, Eyebrow, Card, LanguageToggle,
                  Badge, Field/Input/Select/Textarea)
  app.js          Shared header/footer, bilingual content, SV/EN toggle, mobile drawer,
                  page renderers, booking form (mailto)
  moa.webp          Portrait — hero/About image + structured-data (JSON-LD) image
functions/
  api/booking.js  Booking form → MailerSend email (server-side)
  api/checkout.js Stripe Checkout skeleton (server-side, disabled by default)
_headers          Cache + security headers
_redirects        /kontakt → /#boka
wrangler.toml     Pages config + non-secret settings
.dev.vars.example Template for local secrets
```

Canonical nav (from the design): **Föreläsningar · Erfarenhet · Boken · Kontakt** —
the homepage carries the booking/offerings/book sections (anchors `/#forelasningar`,
`/#bok`, `/#boka`); Erfarenhet is its own page with `/karriar` and `/kompetens` as
shareable deep pages.

The booking form POSTs to `/api/booking`, which sends an email via MailerSend
(falls back to a `mailto:` link if the API isn't configured or errors).

Pages share one stylesheet and one script. Each HTML file is a thin shell with
per-page `<title>` / meta / Open Graph tags (good link previews when shared);
`app.js` renders the chrome and the page body, and remembers the chosen language
across pages via `localStorage`.

Clean URLs (`/karriar`) are resolved by Cloudflare Pages automatically.

## Local preview

Clean URLs and the `/api/*` function need a server (not `file://`):

```bash
npx wrangler pages dev .
# → http://localhost:8788
```

For static-only preview, any static server works (e.g. `npx serve .`).

## Deploy to Cloudflare Pages

DNS for `moacollin.com` is already on Cloudflare. Two options:

**A. Git integration (recommended)** — push this folder to a repo, then in the
Cloudflare dashboard: *Workers & Pages → Create → Pages → Connect to Git*.
Build command: *(none)*. Output directory: `/`.

**B. Direct upload**

```bash
npx wrangler pages deploy .
```

Then map the custom domain (`moacollin.com`) under the Pages project →
*Custom domains*.

## Environment & settings

Non-secret settings live in `wrangler.toml` under `[vars]`
(`CONTACT_EMAIL`, `MAIL_FROM`, `STRIPE_PAYMENT_LINK_ID`, …) and in the dashboard.

**Secrets are never committed.** Set them as encrypted Worker secrets
(dashboard → Settings → Variables and Secrets) or via CLI:

```bash
npx wrangler secret put MAILERSEND_API_KEY
npx wrangler secret put STRIPE_SECRET_KEY
npx wrangler secret put STRIPE_WEBHOOK_SECRET
```

Locally, copy `.dev.vars.example` → `.dev.vars` (git-ignored) and fill in.

### Booking form email (MailerSend)

`POST /api/booking` sends the form as an email via MailerSend. To enable:

1. Create a MailerSend account and **verify the `moacollin.com` domain** (add the
   DNS records MailerSend gives you — these can live on Cloudflare).
2. Create an API token → set it as a secret:
   ```bash
   npx wrangler pages secret put MAILERSEND_API_KEY
   ```
3. Confirm `MAIL_FROM` in `wrangler.toml` is a sender on the verified domain
   (e.g. `noreply@moacollin.com`). `CONTACT_EMAIL` is the recipient; `reply_to`
   is set to the visitor so Moa can reply straight from the inbox.

Until the key + verified sender exist, the endpoint returns `503` and the form
shows an inline "email me directly" `mailto:` fallback — nothing breaks.

### Book pre-order (Stripe Payment Link)

The "Förbeställ boken" button links straight to a Stripe Payment Link
(`BOOK_PAYMENT_LINK` in `assets/app.js`, with `?locale=sv|en`). Price, quantity,
shipping address and the text on the payment page are all set on the link in the
Stripe dashboard — no keys are needed for buying to work.

After paying, Stripe should redirect to `https://moacollin.com/boken?order=success`,
which shows a thank-you on the book page. Set this on the link: *Payment Links →
the link → Edit → After payment → Don't show confirmation page → redirect*.

Paid orders can also hit `/api/stripe-webhook` (`functions/api/stripe-webhook.js`),
which verifies the Stripe signature and emails the order (buyer, quantity,
shipping address) to `CONTACT_EMAIL` via MailerSend. Without it, every order is
still in the Stripe dashboard under *Payments*. To turn it on:

1. *Developers → Webhooks*: add `https://moacollin.com/api/stripe-webhook` with
   the events `checkout.session.completed` and
   `checkout.session.async_payment_succeeded` → copy the signing secret.
2. `npx wrangler secret put STRIPE_WEBHOOK_SECRET` and
   `npx wrangler secret put STRIPE_SECRET_KEY` (a restricted key with read access
   to Checkout Sessions is enough — it's used to look up the quantity).
3. Optional: set `STRIPE_PAYMENT_LINK_ID` (`plink_…`) in `wrangler.toml` so only
   book orders are emailed if the account sells other things later.

Pre-orders are charged at checkout (card authorisations expire after a week, so
holding the payment until December isn't an option).

**Testing the webhook locally:** put Stripe *test* keys in `.dev.vars` (see
`.dev.vars.example`), run `npx wrangler dev`, and in another terminal
`stripe listen --forward-to localhost:8080/api/stripe-webhook` — it prints the
`whsec_…` to use as `STRIPE_WEBHOOK_SECRET`. Then `stripe trigger checkout.session.completed`.

## Source of truth

Content & visual design come from the Claude Design project
*"Moa Collin Design System"* → `templates/experience/Experience.dc.html`.
That `.dc.html` uses Claude Design's authoring runtime; this repo is the
deployable plain-HTML/CSS/JS implementation of it.
