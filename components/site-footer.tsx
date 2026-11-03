import Link from "next/link";
import type { ReactNode } from "react";

export function SiteFooter({
  credit = "shizenapp.com",
}: {
  credit?: ReactNode;
}) {
  return (
    <footer className="foot">
      <span>{credit}</span>
      <nav className="foot-links" aria-label="Legal">
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
      </nav>
    </footer>
  );
}
