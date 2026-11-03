import { readFileSync } from "node:fs";
import { join } from "node:path";

export type LegalDoc = "privacy" | "terms";

/** Body of `<main class="legal">`. Swap the file in `content/` to update copy. */
export function loadLegalHtml(doc: LegalDoc) {
  return readFileSync(join(process.cwd(), "content", `${doc}.html`), "utf8");
}
