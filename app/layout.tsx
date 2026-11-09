import type { Metadata } from "next";
import {
  HOME_DESCRIPTION,
  HOME_DOCUMENT_TITLE,
  HOME_TITLE,
  SITE_NAME,
  SITE_URL,
  pageMetadata,
} from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...pageMetadata({
    title: HOME_TITLE,
    documentTitle: HOME_DOCUMENT_TITLE,
    description: HOME_DESCRIPTION,
    path: "/",
  }),
  title: {
    default: HOME_DOCUMENT_TITLE,
    template: `%s — ${SITE_NAME}`,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
