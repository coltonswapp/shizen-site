import { HomeJsonLd } from "@/components/json-ld";
import { HomePage } from "@/components/home-page";
import {
  HOME_DESCRIPTION,
  HOME_DOCUMENT_TITLE,
  HOME_TITLE,
  pageMetadata,
} from "@/lib/site";

export const metadata = pageMetadata({
  title: HOME_TITLE,
  documentTitle: HOME_DOCUMENT_TITLE,
  description: HOME_DESCRIPTION,
  path: "/",
});

export default function Page() {
  return (
    <>
      <HomeJsonLd />
      <HomePage />
    </>
  );
}
