# Shizen site

Marketing site and waitlist for [shizenapp.com](https://shizenapp.com). Next.js (App Router, TypeScript) on Vercel. Waitlist emails still go to the existing Cloudflare KV namespace — no email migration.

Legal entity: **Swappfunc LLC**. Contact: [support@shizenapp.com](mailto:support@shizenapp.com). Privacy and Terms body copy lives in `content/privacy.html` and `content/terms.html` so the pages can be updated without touching the Next.js chrome.

## Local

```bash
cp .env.example .env.local   # then fill in secrets; never commit .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Without the Cloudflare KV env vars, joining the waitlist returns 503 on purpose (no fake success).

```bash
npm run lint
npm run build
npm start                    # production server for curl checks
```

## Environment variables

Set these in Vercel (Project → Settings → Environment Variables) for Production, Preview, and Development. Same names locally in `.env.local`.

| Variable | Required | Notes |
| --- | --- | --- |
| `CLOUDFLARE_ACCOUNT_ID` | Yes | Cloudflare account that owns the KV namespace. Not a secret. |
| `CLOUDFLARE_KV_NAMESPACE_ID` | Yes | Existing `WAITLIST` namespace: `866652b0b0ff4c278c94f84d939c7f10` (from the old `wrangler.toml`). |
| `CLOUDFLARE_API_TOKEN` | Yes | API token with **Account → Workers KV Storage → Edit**. Create at [API tokens](https://dash.cloudflare.com/profile/api-tokens). Treat as a secret. |
| `WAITLIST_WEBHOOK_URL` | For new-signup pings | Public webhook the old Pages Function called. Default value is in `.env.example`. |
| `WAITLIST_WEBHOOK_KEY` | For new-signup pings | Same secret as the Cloudflare Pages `WAITLIST_WEBHOOK_KEY`. Treat as a secret. |

The route handler is `POST /api/waitlist`. Keys are the normalized (trim + lowercase) email. Values are `{"at":"<ISO timestamp>"}`, matching the old Pages Function. Duplicate emails return 409; the page treats that as already on the list. The webhook is fire-and-forget and only runs on brand-new signups.

## Deploy on Vercel

1. Import `coltonswapp/shizen-site` as a Next.js project. Framework preset: Next.js. Production branch: `main`.
2. Add the env vars above. Do not put tokens in the repo.
3. Deploy a preview, then production.

## Domain (DNS stays on Cloudflare)

Do **not** change DNS or Vercel domains from this repo. When Colton cuts over:

1. In Vercel, add `shizenapp.com` and `www.shizenapp.com`. Set **www → apex** (301). Vercel already forces HTTPS.
2. In Cloudflare DNS, add the apex and www records Vercel shows. Use **DNS only** (grey cloud, no proxy) so Vercel can issue certificates.
3. Leave the existing **TXT** records for Google Search Console and Bing verification untouched.
4. After cutover, submit `https://shizenapp.com/sitemap.xml` in Search Console.

`next.config.ts` also 308-redirects `www.shizenapp.com` → `https://shizenapp.com` (Next.js permanent redirects are 308, the method-preserving equivalent of 301). Prefer the Vercel domain setting as the source of truth for www.

## SEO

- `app/robots.ts` — allow all, disallow `/api`, sitemap `https://shizenapp.com/sitemap.xml`
- `app/sitemap.ts` — `/`, `/privacy`, `/terms` with `lastModified`
- Self-referencing canonical, Open Graph, and Twitter tags on every page (`metadataBase` is `https://shizenapp.com`)
- Custom `not-found` page returns a real 404
- Organization + SoftwareApplication JSON-LD on the home page
