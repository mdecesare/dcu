// Brief topics: the coloured pill in the corner of each card. One word each.
// The content schema accepts only these, so a new topic fails the build until it has a colour here.
// Colours stay clear of the Regulation status pills (amber, red, blue, green).
export const BRIEF_TOPICS = {
  Power: 'tp-power',             // indigo
  Cooling: 'tp-cooling',         // sky
  Water: 'tp-water',             // teal
  Resilience: 'tp-resilience',   // plum
  Colocation: 'tp-colocation',   // violet
  Procurement: 'tp-procurement', // brown
  Regulation: 'tp-regulation',   // slate
  Standards: 'tp-standards',     // olive
} as const;

export type BriefTopic = keyof typeof BRIEF_TOPICS;

export const briefTopicNames = Object.keys(BRIEF_TOPICS) as [BriefTopic, ...BriefTopic[]];
