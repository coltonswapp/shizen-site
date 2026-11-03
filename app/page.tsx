import { HomeJsonLd } from "@/components/json-ld";
import { HomePage } from "@/components/home-page";
import { HOME_DESCRIPTION, HOME_TITLE, pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  path: "/",
  absoluteTitle: HOME_TITLE,
});

export default function Page() {
  return (
    <>
      <HomeJsonLd />
      <HomePage />
    </>
  );
}
