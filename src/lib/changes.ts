// "What changed this week": editorial entries in src/content/changes, one YAML file each.
// See src/content/changes/_how-to-add-an-entry.yaml for what counts.
import { getCollection, type CollectionEntry } from 'astro:content';

export type Section = 'procurement' | 'regulation' | 'power';
export type Change = CollectionEntry<'changes'>;

export const SECTION_LABELS: Record<Section, string> = {
  procurement: 'Procurement',
  regulation: 'Regulation',
  power: 'Power',
};

const TZ = 'America/New_York';
const iso = (d: Date) => d.toISOString().slice(0, 10);

// Monday-Sunday week, in Eastern time, containing `now`. Returned as YYYY-MM-DD strings.
// The same rule runs in the browser (src/scripts/this-week.ts), so a page built earlier in
// the week still counts the week the reader is in.
export function easternWeek(now = new Date()) {
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
  const day = new Date(`${today}T00:00:00Z`);
  const start = new Date(day);
  start.setUTCDate(day.getUTCDate() - ((day.getUTCDay() + 6) % 7));
  const end = new Date(start);
  end.setUTCDate(start.getUTCDate() + 6);
  return { start: iso(start), end: iso(end) };
}

export const weekLabel = ({ start, end }: { start: string; end: string }) => {
  const f = (s: string, opts: Intl.DateTimeFormatOptions) =>
    new Date(`${s}T12:00:00Z`).toLocaleDateString('en-GB', { ...opts, timeZone: 'UTC' });
  const sameMonth = start.slice(0, 7) === end.slice(0, 7);
  return sameMonth
    ? `${f(start, { day: 'numeric' })}–${f(end, { day: 'numeric', month: 'long', year: 'numeric' })}`
    : `${f(start, { day: 'numeric', month: 'long' })} – ${f(end, { day: 'numeric', month: 'long', year: 'numeric' })}`;
};

export const changeDate = (c: Change) => iso(c.data.date);
export const inWeek = (c: Change, week: { start: string; end: string }) =>
  changeDate(c) >= week.start && changeDate(c) <= week.end;

export async function getChanges(section?: Section) {
  const all = await getCollection('changes');
  return all
    .filter((c) => !section || c.data.section === section)
    .sort((a, b) => changeDate(b).localeCompare(changeDate(a)));
}
