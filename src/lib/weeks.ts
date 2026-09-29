// Monday-Sunday weeks in Eastern time, shared by the build (src/lib/changes.ts) and the reader's
// browser (src/scripts/this-week.ts). One copy of the rule, so the two can never disagree.
// No Astro imports here: the browser loads this file too.

const TZ = 'America/New_York';
const iso = (d: Date) => d.toISOString().slice(0, 10);

export type Week = { start: string; end: string };

/** Today's calendar date in Eastern time, as YYYY-MM-DD. */
export function easternToday(now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
}

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
  return weekOf(easternToday(now));
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

// ── Homepage activity strip: a rolling window of days, not calendar weeks or months ──

export const ROLLING_DAYS = 30;

const addDays = (date: string, days: number) => {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return iso(d);
};


/** The `days` calendar days ending on `end`, both ends included: 30 days ending 28 Sep starts 30 Aug. */
export const windowEnding = (end: string, days = ROLLING_DAYS): Week => ({ start: addDays(end, -(days - 1)), end });

/**
 * What the homepage strip counts, given every published entry date:
 *   current  the past 30 days (Eastern) include at least one entry in some section
 *   latest   no section has an entry in the past 30 days: count the most recent 30 days that did,
 *            ending on the newest entry, and label them as that period, never as current activity
 *   none     nothing has ever been published: the past 30 days, all zero
 */
export type RollingView =
  | { mode: 'current'; window: Week }
  | { mode: 'latest'; window: Week; current: Week }
  | { mode: 'none'; window: Week };

export function rollingView(dates: string[], now = new Date()): RollingView {
  const current = windowEnding(easternToday(now));
  if (dates.some((d) => within(d, current))) return { mode: 'current', window: current };
  const earlier = dates.filter((d) => d < current.start).sort();
  if (earlier.length > 0) return { mode: 'latest', window: windowEnding(earlier[earlier.length - 1]), current };
  return { mode: 'none', window: current };
}

/** The strip's wording for a view, shared by the build and the browser so both say the same thing. */
export function rollingText(view: RollingView) {
  return view.mode === 'latest'
    ? {
        title: 'Most recent changes',
        dates: weekLabel(view.window),
        note: `None in the past ${ROLLING_DAYS} days (${weekLabel(view.current)}). Counts are for the ${ROLLING_DAYS} days shown.`,
      }
    : {
        title: `Changes in the past ${ROLLING_DAYS} days`,
        dates: weekLabel(view.window),
        note: 'Published editorial changes · Eastern time',
      };
}

/**
 * Link wording on a homepage tile, from the kinds of change inside the window.
 * No changes -> "View section". Every change a correction -> "See correction" (or "See corrections"
 * for more than one). Any other kind in the window -> "See updates".
 */
export function tileLinkText(kinds: string[]) {
  if (kinds.length === 0) return 'View section';
  if (kinds.every((k) => k === 'correction')) return kinds.length === 1 ? 'See correction' : 'See corrections';
  return 'See updates';
}
