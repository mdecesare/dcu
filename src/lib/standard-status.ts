// Standards & Guidance statuses, each with its own colour (the .ss-* classes in global.css).
// The content schema accepts only these, so a new status fails the build until it has a colour here.
export const STANDARD_STATUSES = {
  'Open for comment': 'ss-comment', // violet: anyone may comment now; a deadline applies
  'Draft in progress': 'ss-draft',  // sky: the committee is revising; nothing to comment on yet
  'Current edition': 'ss-current',  // slate: the edition in force at the standards body (adoption varies)
} as const;

export type StandardStatus = keyof typeof STANDARD_STATUSES;
export const standardStatusNames = Object.keys(STANDARD_STATUSES) as [StandardStatus, ...StandardStatus[]];
export const standardStatusClass = (s: StandardStatus) => STANDARD_STATUSES[s];
