// ─────────────────────────────────────────────────────────────────────────────
//  DataCenterUpdate — site settings
//
//  To change a setting: edit the value after the colon, save the file, and
//  rebuild/publish the site. Use true or false (lowercase, no quotes).
// ─────────────────────────────────────────────────────────────────────────────

export const siteSettings = {
  // Homepage "Power & resilience" panel and its "At a glance" card.
  // Also needs at least one item file in src/content/power/ — if the folder is
  // empty, the panel stays hidden even when this is true.
  showPowerAndResilience: false,

  // Homepage "What we're watching" panel.
  // Also needs at least one item file in src/content/watching/.
  showWhatWereWatching: false,

  // Homepage newsletter signup band.
  // Stays hidden until a newsletter service is chosen AND its signup form
  // address is pasted into subscribeFormUrl below.
  showSubscribe: true,
  subscribeFormUrl: 'https://buttondown.com/api/emails/embed-subscribe/DataCenterUpdate',

  // Email addresses allowed to be clickable links anywhere on the site.
  // Leave an address out until its inbox is confirmed to deliver — it then shows
  // as plain text. Example once confirmed:
  //   confirmedEmailAddresses: ['corrections@datacenterupdate.com', 'hello@datacenterupdate.com'],
  // Confirmed 2026-09-15: both tested from an outside account, forwarding to the DCU inbox.
  confirmedEmailAddresses: ['hello@datacenterupdate.com', 'corrections@datacenterupdate.com'] as string[],

  // The few figures the homepage shows, in this order. Each one must match a row in the
  // latest Procurement Pulse edition exactly: `section` is a ## heading, `class` is the
  // text in that row's Class column. The build fails with a list of the available classes
  // if either is wrong, so the homepage can never quietly show a figure that no longer
  // exists. Keep this short — the homepage is a front door, not a copy of the edition.
  homepageFigures: [
    { section: 'Transformers', class: 'Substation, 5–25 MVA' },
    { section: 'Generators', class: '1,500–2,000 kW diesel' },
    { section: 'Medium-voltage switchgear', class: 'Standard configurations' },
  ],
};
