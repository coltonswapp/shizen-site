import { after } from "next/server";
import {
  isEmail,
  kvGet,
  kvPut,
  normalizeEmail,
  notifySignup,
  waitlistConfigured,
} from "@/lib/waitlist";

function json(data: unknown, status = 200) {
  return Response.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

export async function POST(request: Request) {
  if (!waitlistConfigured()) {
    return json({ error: "Waitlist storage isn’t bound yet." }, 503);
  }

  let payload: { email?: unknown };
  try {
    payload = await request.json();
  } catch {
    return json({ error: "Expected JSON." }, 400);
  }

  const email = normalizeEmail(payload.email);
  if (!isEmail(email)) {
    return json({ error: "Need a real email." }, 400);
  }

  try {
    const existing = await kvGet(email);
    if (existing) {
      return json({ ok: true, already: true }, 409);
    }

    const at = new Date().toISOString();
    await kvPut(email, JSON.stringify({ at }));
    after(() => notifySignup(email));
    return json({ ok: true });
  } catch {
    return json({ error: "Couldn’t join just now. Try again." }, 502);
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      Allow: "POST, OPTIONS",
    },
  });
}
