// Regulatory Watch statuses. Each has its own colour (the .st-* classes in global.css).
// The content schema accepts only these, so a new status fails the build until it is given a colour here.
export const REG_STATUSES = {
  Proposed: 'st-proposed',   // amber: put forward, not decided
  Directed: 'st-directed',   // red: ordered by an official, action pending
  Enacted: 'st-enacted',     // blue: passed into law, not yet in force
  'In effect': 'st-in-effect', // green: binding now
} as const;

export type RegStatus = keyof typeof REG_STATUSES;

export const regStatusNames = Object.keys(REG_STATUSES) as [RegStatus, ...RegStatus[]];

export function regStatusClass(status: RegStatus) {
  return REG_STATUSES[status];
}
