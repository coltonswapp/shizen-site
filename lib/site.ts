import type { Metadata } from "next";

export const SITE_URL = "https://shizenapp.com";
export const SITE_NAME = "Shizen";
export const LEGAL_ENTITY = "Swappfunc LLC";
export const SUPPORT_EMAIL = "support@shizenapp.com";

export const HOME_TITLE =
  "Shizen — Understand Japanese the way it’s actually spoken";
export const HOME_DESCRIPTION =
  "Shizen is an iPhone app for understanding spoken Japanese. Hear a line at full speed, take it apart, then hear it again. Join the waitlist.";

export const OG_IMAGE = {
  url: "/assets/app-home.jpg",
  width: 470,
  height: 1024,
  alt: "Shizen home screen with Daily Dialogue, lessons, and a yellow Start button",
};

/** Last time the shipped page content changed (privacy/terms + product homepage). */
export const CONTENT_LAST_MODIFIED = new Date("2026-11-03T19:33:53.000Z");

export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: string;
}): Metadata {
  const canonical = path;
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  const resolvedTitle = absoluteTitle ?? title;

  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: resolvedTitle,
      description,
      url,
      locale: "en_US",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
