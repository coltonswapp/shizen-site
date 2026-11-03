import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Terms & Conditions",
  description:
    "Terms and Conditions for Shizen, an iPhone app for learning Japanese.",
  path: "/terms",
});

export default function TermsPage() {
  return <LegalPage doc="terms" />;
}
