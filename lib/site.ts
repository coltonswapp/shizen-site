import type { Metadata } from "next";

export const SITE_URL = "https://shizenapp.com";
export const SITE_NAME = "Shizen";
export const LEGAL_ENTITY = "Swappfunc LLC";
export const SUPPORT_EMAIL = "support@shizenapp.com";

/** Page-specific title. Used for og:title / twitter:title — no site name (TN3156). */
export const HOME_TITLE =
  "Understand Japanese the way it’s actually spoken";
export const HOME_DOCUMENT_TITLE = `${HOME_TITLE} — ${SITE_NAME}`;
export const HOME_DESCRIPTION =
  "Shizen is an iPhone app for understanding spoken Japanese. Hear a line at full speed, take it apart, then hear it again. Join the waitlist.";

export const OG_IMAGE = {
  url: "/assets/og-yellow-1200x630.jpg",
  width: 1200,
  height: 630,
  alt: "Shizen wordmark on yellow with two illustrated characters walking",
  type: "image/jpeg",
};

/** Last time the shipped page content changed (privacy/terms + product homepage). */
export const CONTENT_LAST_MODIFIED = new Date("2026-11-03T19:33:53.000Z");

export function pageMetadata({
  title,
  description,
  path,
  documentTitle,
}: {
  title: string;
  description: string;
  path: string;
  /** Overrides `<title>`. Layout `title.template` does not apply to the `/` page. */
  documentTitle?: string;
}): Metadata {
  const canonical = path;
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;

  return {
    title: documentTitle ?? title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url,
      locale: "en_US",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}
