/**
 * Removes HTML tags from a string. Safe for display when content may come from API as HTML.
 */
export function stripHtml(html: string): string {
  if (typeof html !== "string") return "";
  return html.replace(/<[^>]*>/g, "").trim();
}
