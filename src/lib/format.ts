// Number formatting shared by pages and the in-browser state picker, so both print figures alike.
export const pct = (n: number) => `${n > 0 ? '+' : n < 0 ? '−' : ''}${Math.abs(n).toFixed(1)}%`;
export const cents = (n: number) => `${n.toFixed(2)}¢`;
