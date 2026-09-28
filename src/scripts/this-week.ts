// Recounts the homepage strip (rolling 30 days) and the section "What changed this week" boxes in
// the reader's browser, so a page built earlier still shows the reader's own dates (Eastern time).
// Without JavaScript the build-time state stays, and it is always one consistent state.
// The rules are in src/lib/weeks.ts, shared with the build.
import { weekLabel, weekView, rollingView, rollingText, within } from '../lib/weeks';

const now = new Date();

// Homepage strip: a rolling 30-day tally. Each count holds every entry date for its section; the
// window, the fallback to the most recent period with changes, and the wording all come from the
// same rule the build used (src/lib/weeks.ts).
document.querySelectorAll<HTMLElement>('[data-rolling]').forEach((strip) => {
  const counts = [...strip.querySelectorAll<HTMLElement>('[data-roll-count]')];
  const datesOf = (el: HTMLElement) => (el.dataset.rollCount || '').split(' ').filter(Boolean);
  const view = rollingView(counts.flatMap(datesOf), now);
  const text = rollingText(view);
  const set = (sel: string, value: string) => strip.querySelectorAll<HTMLElement>(sel).forEach((el) => { el.textContent = value; });
  set('[data-roll-title]', text.title);
  set('[data-roll-dates]', text.dates);
  set('[data-roll-note]', text.note);
  counts.forEach((el) => {
    const count = datesOf(el).filter((d) => within(d, view.window)).length;
    el.textContent = String(count);
    const link = el.closest('a')?.querySelector<HTMLElement>('[data-roll-link]');
    if (link) link.textContent = count > 0 ? 'See updates' : 'View section';
  });
});

// Section pages: redraw the box for the reader's week, by the same rule the build used.
type Entry = { date: string; day: string; kind: string; kindClass: string; title: string; href: string };

document.querySelectorAll<HTMLElement>('[data-week-list]').forEach((box) => {
  const data = box.querySelector<HTMLScriptElement>('[data-week-entries]');
  const list = box.querySelector<HTMLElement>('[data-week-items]');
  const status = box.querySelector<HTMLElement>('[data-week-status]');
  if (!data || !status) return;

  const entries: Entry[] = JSON.parse(data.textContent || '[]');
  const view = weekView(entries.map((e) => e.date), now);

  status.textContent = view.mode === 'latest'
    ? `Nothing new yet this week (${weekLabel(view.current)}). Latest changes, ${weekLabel(view.week)}:`
    : `${weekLabel(view.week)} · Monday to Sunday, Eastern time`;

  // A section with no published entries has no list, only the empty message, which stays true.
  if (!list) return;
  list.replaceChildren(...entries.filter((e) => within(e.date, view.week)).map((e) => {
    const li = document.createElement('li');
    const time = document.createElement('time');
    time.dateTime = e.date;
    time.textContent = e.day;
    const kind = document.createElement('span');
    kind.className = `tw-k ${e.kindClass}`;
    kind.textContent = e.kind;
    const link = document.createElement('a');
    link.href = e.href;
    link.textContent = e.title;
    li.append(time, kind, link);
    return li;
  }));
});
