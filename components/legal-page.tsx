import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { loadLegalHtml, type LegalDoc } from "@/lib/legal";

export function LegalPage({ doc }: { doc: LegalDoc }) {
  const html = loadLegalHtml(doc);
  return (
    <>
      <SiteHeader />
      <main className="legal" dangerouslySetInnerHTML={{ __html: html }} />
      <SiteFooter />
    </>
  );
}
