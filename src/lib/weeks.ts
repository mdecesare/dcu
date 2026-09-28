// Monday-Sunday weeks in Eastern time, shared by the build (src/lib/changes.ts) and the reader's
// browser (src/scripts/this-week.ts). One copy of the rule, so the two can never disagree.
// No Astro imports here: the browser loads this file too.

const TZ = 'America/New_York';
const iso = (d: Date) => d.toISOString().slice(0, 10);

export type Week = { start: string; end: string };

/** The Monday-Sunday week containing a YYYY-MM-DD date. */
export function weekOf(date: string): Week {
  const day = new Date(`${date}T00:00:00Z`);
  const start = new Date(day);
  start.setUTCDate(day.getUTCDate() - ((day.getUTCDay() + 6) % 7));
  const end = new Date(start);
  end.setUTCDate(start.getUTCDate() + 6);
  return { start: iso(start), end: iso(end) };
}

/** The week the reader is in, by the Eastern-time calendar date. */
export function easternWeek(now = new Date()): Week {
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
  return weekOf(today);
}

export const within = (date: string, week: Week) => date >= week.start && date <= week.end;

export function weekLabel({ start, end }: Week) {
  const f = (s: string, opts: Intl.DateTimeFormatOptions) =>
    new Date(`${s}T12:00:00Z`).toLocaleDateString('en-GB', { ...opts, timeZone: 'UTC' });
  return start.slice(0, 7) === end.slice(0, 7)
    ? `${f(start, { day: 'numeric' })}–${f(end, { day: 'numeric', month: 'long', year: 'numeric' })}`
    : `${f(start, { day: 'numeric', month: 'long' })} – ${f(end, { day: 'numeric', month: 'long', year: 'numeric' })}`;
}

/**
 * Which week a section's "What changed" box shows:
 *   current  the reader's week has entries: show them
 *   latest   nothing yet this week: show the most recent earlier week that has entries, labelled as such
 *   none     the section has no published entries at all: the only case for the empty message
 */
export type WeekView =
  | { mode: 'current'; week: Week }
  | { mode: 'latest'; week: Week; current: Week }
  | { mode: 'none'; week: Week };

export function weekView(dates: string[], now = new Date()): WeekView {
  const current = easternWeek(now);
  if (dates.some((d) => within(d, current))) return { mode: 'current', week: current };
  const earlier = dates.filter((d) => d < current.start).sort();
  if (earlier.length > 0) return { mode: 'latest', week: weekOf(earlier[earlier.length - 1]), current };
  return { mode: 'none', week: current };
}
