import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Page not found",
    description: "That page isn’t on shizenapp.com.",
    path: "/404",
  }),
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="missing">
        <p className="kicker">404</p>
        <h1>This page isn’t here.</h1>
        <p>The link may be old, or the address might be a typo.</p>
        <p>
          <Link href="/">Back to shizenapp.com</Link>
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
