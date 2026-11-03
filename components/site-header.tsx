import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="top">
      <Link className="mark" href="/">
        Shizen
      </Link>
    </header>
  );
}
