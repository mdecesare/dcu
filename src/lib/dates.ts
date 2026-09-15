/**
 * Formats a date as "21 May 2026".
 * UTC is used so a date written as 2026-05-07 is not shifted to the day before.
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}
