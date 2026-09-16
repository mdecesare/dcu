/**
 * Curly apostrophes and quotes, matching how the site's markdown pages render text.
 * Used for text shown outside markdown (list summaries, homepage notes).
 */
export function smartQuotes(s: string): string {
  return s
    .replace(/(\w)'(\w)/g, '$1’$2')
    .replace(/(^|[\s(\[—–-])'/g, '$1‘')
    .replace(/'/g, '’')
    .replace(/(^|[\s(\[—–-])"/g, '$1“')
    .replace(/"/g, '”');
}
