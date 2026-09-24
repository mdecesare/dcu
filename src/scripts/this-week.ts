// Recounts "This week" in the reader's browser, so a page built earlier still shows the
// current Monday-Sunday week in Eastern time. Without JavaScript, the build-time counts stay.
const TZ = 'America/New_York';
const iso = (d: Date) => d.toISOString().slice(0, 10);

function easternWeek(now = new Date()) {
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
  const day = new Date(`${today}T00:00:00Z`);
  const start = new Date(day);
  start.setUTCDate(day.getUTCDate() - ((day.getUTCDay() + 6) % 7));
  const end = new Date(start);
  end.setUTCDate(start.getUTCDate() + 6);
  return { start: iso(start), end: iso(end) };
}

function label({ start, end }: { start: string; end: string }) {
  const f = (s: string, opts: Intl.DateTimeFormatOptions) =>
    new Date(`${s}T12:00:00Z`).toLocaleDateString('en-GB', { ...opts, timeZone: 'UTC' });
  return start.slice(0, 7) === end.slice(0, 7)
    ? `${f(start, { day: 'numeric' })}–${f(end, { day: 'numeric', month: 'long', year: 'numeric' })}`
    : `${f(start, { day: 'numeric', month: 'long' })} – ${f(end, { day: 'numeric', month: 'long', year: 'numeric' })}`;
}

const week = easternWeek();
const within = (d: string) => d >= week.start && d <= week.end;

document.querySelectorAll<HTMLElement>('[data-week-label]').forEach((el) => { el.textContent = label(week); });

// Homepage strip: each count holds the dates of every entry in its section.
document.querySelectorAll<HTMLElement>('[data-week-count]').forEach((el) => {
  const dates = (el.dataset.weekCount || '').split(' ').filter(Boolean);
  el.textContent = String(dates.filter(within).length);
});

// Section pages: show only this week's entries, or the empty message.
document.querySelectorAll<HTMLElement>('[data-week-list]').forEach((box) => {
  let shown = 0;
  box.querySelectorAll<HTMLElement>('[data-date]').forEach((li) => {
    const show = within(li.dataset.date || '');
    li.hidden = !show;
    if (show) shown++;
  });
  box.querySelectorAll<HTMLElement>('[data-week-empty]').forEach((p) => { p.hidden = shown > 0; });
  box.querySelectorAll<HTMLElement>('[data-week-items]').forEach((ul) => { ul.hidden = shown === 0; });
});
