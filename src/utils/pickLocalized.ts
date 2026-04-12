/** Picks ar/en (or optional ur/hi) string for current language; falls back to en then ar. */
export function pickLocalized(
  pair: { ar?: string; en?: string } | undefined,
  lang: string,
): string {
  if (!pair) return "";
  const m = pair as Record<string, string>;
  return m[lang] ?? m.en ?? m.ar ?? "";
}
