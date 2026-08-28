# Shizen site

Marketing page and waitlist for [shizenapp.com](https://shizenapp.com).

Static HTML on Cloudflare Pages. Waitlist emails go to a KV namespace via a Pages Function at `POST /api/waitlist`.

## Local

```bash
npx wrangler pages dev . --kv WAITLIST
```

Open the printed localhost URL. Without `--kv WAITLIST`, joining the list returns 503 on purpose (no fake success).

## Cloudflare Pages

1. In Cloudflare, Workers & Pages → Create → Connect GitHub → `coltonswapp/shizen-site`.
2. Project name `shizen-site`. Production branch `main`. Build command empty. Output directory `/`.
3. Storage & Databases → KV → Create `shizen-waitlist`.
4. Pages project → Settings → Bindings → Add → KV namespace. Variable name `WAITLIST`, pick that namespace. Do not put a placeholder id in wrangler.toml.
5. Custom domains → `shizenapp.com` (the zone already lives in this Cloudflare account).

The function never logs the email. Duplicate signups return 409; the page treats that as already on the list.
