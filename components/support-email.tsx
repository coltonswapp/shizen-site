import { SUPPORT_EMAIL } from "@/lib/site";

export function SupportEmail() {
  return <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>;
}
