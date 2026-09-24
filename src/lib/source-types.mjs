// The five DCU source types. Letters, names and legend wording live here only,
// so the coloured markers read the same on every page.
// Legend wording is taken from the Methodology page definitions.
// Colours are set in src/styles/global.css (--src-r, --src-p, --src-v, --src-g, --src-o).

export const SOURCE_TYPES = {
  R: { name: 'Research', legend: 'published research or recurring benchmark series' },
  P: { name: 'Practitioner', legend: 'involved directly in procuring, sourcing, specifying, or delivering equipment' },
  V: { name: 'Vendor', legend: 'manufactures, sells, supplies, or lists the equipment or service' },
  G: { name: 'Government', legend: 'government agencies, regulators, legislatures, and other official public bodies' },
  O: { name: 'Grid operator', legend: 'regional grid operators that run transmission planning and wholesale electricity markets' },
};

export const sourceTypeHref = (letter) => `/methodology#source-type-${letter.toLowerCase()}`;
