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

  // Procurement Pulse sections shown on the homepage, in this order.
  // Each name must match a ## heading in the latest Pulse edition exactly.
  homepageProcurementSections: ['Transformers', 'Generators', 'Medium-voltage switchgear'],
};
