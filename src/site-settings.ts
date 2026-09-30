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
    { section: 'Medium-voltage switchgear', class: '5 kV / 15 kV metal-enclosed' },
  ],

  // The homepage "Featured briefs" row: four positions, in this order. Each entry is a brief's
  // file name in src/content/briefs (without .md). To rotate, replace a name here; the brief
  // that comes off stays published at its own address and in the /briefs list.
  // Before launch, the live row appears only when all four positions hold published briefs, so
  // a half-built row can never go live. A preview build (DCU_PREVIEW=1) shows whatever is ready.
  featuredBriefs: [
    'next-1-5-mw',        // 1. Power
    'liquid-cooling',     // 2. Cooling
    'cooling-water-use',  // 3. Water
    'resilience-business-decision', // 4. Resilience
  ] as string[],

  // Set to true at the first publication of the row. After launch, a brief withdrawn for a
  // correction simply drops out and the others stay visible.
  featuredBriefsLaunched: false,

  // Shape of the card picture, width / height. 1 / 1 is square; 4 / 3, 3 / 2 and 2 / 1 are
  // a quarter, a third and a half shorter. Card images are cropped to fit, centred.
  briefCardImageRatio: '3 / 2',
};
