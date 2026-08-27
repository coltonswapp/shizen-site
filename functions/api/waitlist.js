function normalizeEmail(value) {
  return String(value || "")
    .trim()
    .toLowerCase();
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

export async function onRequestPost(context) {
  const kv = context.env.WAITLIST;
  if (!kv) {
    return json(
      { error: "Waitlist storage isn’t bound yet." },
      503
    );
  }

  let payload;
  try {
    payload = await context.request.json();
  } catch {
    return json({ error: "Expected JSON." }, 400);
  }

  const email = normalizeEmail(payload.email);
  if (!isEmail(email)) {
    return json({ error: "Need a real email." }, 400);
  }

  const existing = await kv.get(email);
  if (existing) {
    return json({ ok: true, already: true }, 409);
  }

  await kv.put(
    email,
    JSON.stringify({ at: new Date().toISOString() })
  );
  return json({ ok: true });
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      Allow: "POST, OPTIONS",
    },
  });
}
