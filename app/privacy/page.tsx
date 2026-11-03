import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "Privacy Policy for Shizen, an iPhone app for learning Japanese.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return <LegalPage doc="privacy" />;
}
