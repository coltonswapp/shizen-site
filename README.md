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
3. Create a KV namespace (e.g. `shizen-waitlist`) and bind it to the project as `WAITLIST`.
4. Custom domains → `shizenapp.com` (the zone already lives in this Cloudflare account). Put the KV id into `wrangler.toml` if you also deploy from the CLI.

The function never logs the email. Duplicate signups return 409; the page treats that as already on the list.
