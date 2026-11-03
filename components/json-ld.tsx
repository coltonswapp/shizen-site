import { HOME_DESCRIPTION, LEGAL_ENTITY, SITE_NAME, SITE_URL } from "@/lib/site";

const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: LEGAL_ENTITY,
      url: SITE_URL,
      brand: {
        "@type": "Brand",
        name: SITE_NAME,
      },
    },
    {
      "@type": ["SoftwareApplication", "MobileApplication"],
      name: SITE_NAME,
      url: SITE_URL,
      description: HOME_DESCRIPTION,
      applicationCategory: "EducationalApplication",
      operatingSystem: "iOS",
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/PreOrder",
        price: "0",
        priceCurrency: "USD",
      },
      publisher: {
        "@type": "Organization",
        name: LEGAL_ENTITY,
      },
    },
  ],
};

export function HomeJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
