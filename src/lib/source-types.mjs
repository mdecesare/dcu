// The four DCU source types. Letters, names and legend wording live here only,
// so the coloured markers read the same on every page.
// Colours are set in src/styles/global.css (--src-r, --src-p, --src-v, --src-g).

export const SOURCE_TYPES = {
  R: { name: 'Research', legend: 'published research or benchmark' },
  P: { name: 'Practitioner', legend: 'direct procurement visibility' },
  V: { name: 'Vendor', legend: 'sells the equipment' },
  G: { name: 'Government', legend: 'agency or regulator' },
};

export const sourceTypeHref = (letter) => `/methodology#source-type-${letter.toLowerCase()}`;
