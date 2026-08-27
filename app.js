const form = document.getElementById("waitlist");
const statusEl = form.querySelector(".form-status");
const button = form.querySelector("button");

function setStatus(message, kind) {
  statusEl.textContent = message;
  statusEl.className = "form-status" + (kind ? " " + kind : "");
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = String(new FormData(form).get("email") || "").trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setStatus("Need a real email.", "error");
    return;
  }

  button.disabled = true;
  setStatus("Joining…");
  try {
    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const body = await res.json().catch(() => ({}));
    if (res.status === 409) {
      setStatus("You’re already on the list.", "ok");
      return;
    }
    if (!res.ok) {
      setStatus(body.error || "Couldn’t join just now. Try again.", "error");
      return;
    }
    form.reset();
    setStatus("You’re on the list. We’ll write when it’s ready.", "ok");
  } catch {
    setStatus("Couldn’t reach the waitlist. Try again.", "error");
  } finally {
    button.disabled = false;
  }
});
