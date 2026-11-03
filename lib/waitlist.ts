const CF_API = "https://api.cloudflare.com/client/v4";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(value: unknown) {
  return String(value || "")
    .trim()
    .toLowerCase();
}

export function isEmail(value: string) {
  return EMAIL_RE.test(value);
}

export function waitlistConfigured() {
  return Boolean(
    process.env.CLOUDFLARE_ACCOUNT_ID &&
      process.env.CLOUDFLARE_KV_NAMESPACE_ID &&
      process.env.CLOUDFLARE_API_TOKEN
  );
}

function kvValueUrl(key: string) {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const namespaceId = process.env.CLOUDFLARE_KV_NAMESPACE_ID;
  if (!accountId || !namespaceId) {
    throw new Error("Cloudflare KV is not configured.");
  }
  return `${CF_API}/accounts/${accountId}/storage/kv/namespaces/${namespaceId}/values/${encodeURIComponent(key)}`;
}

function kvHeaders() {
  const token = process.env.CLOUDFLARE_API_TOKEN;
  if (!token) {
    throw new Error("Cloudflare KV is not configured.");
  }
  return { Authorization: `Bearer ${token}` };
}

/** Same key as the Pages Function: the normalized email. */
export async function kvGet(key: string) {
  const res = await fetch(kvValueUrl(key), {
    headers: kvHeaders(),
    cache: "no-store",
  });
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`Cloudflare KV get failed (${res.status}).`);
  }
  return res.text();
}

/** Same value as the Pages Function: JSON `{"at":"<iso>"}`. */
export async function kvPut(key: string, value: string) {
  const res = await fetch(kvValueUrl(key), {
    method: "PUT",
    headers: {
      ...kvHeaders(),
      "Content-Type": "text/plain",
    },
    body: value,
  });
  if (!res.ok) {
    throw new Error(`Cloudflare KV put failed (${res.status}).`);
  }
}

/** Fire-and-forget ping to the Grok Bot waitlist webhook. Never fails the signup. */
export async function notifySignup(email: string) {
  const url = process.env.WAITLIST_WEBHOOK_URL;
  const key = process.env.WAITLIST_WEBHOOK_KEY;
  if (!url || !key) return;

  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
        "X-Automation-Key": key,
      },
      body: JSON.stringify({
        email,
        at: new Date().toISOString(),
        source: "shizenapp.com",
      }),
      signal: AbortSignal.timeout(8000),
    });
  } catch {
    // Signup already persisted; a missed ping is better than a failed join.
  }
}
