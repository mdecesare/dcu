// Figures for the Power section, shared by /power and the homepage card so the two never disagree.
//
// PJM figures are quoted from PJM's 2028/2029 Base Residual Auction Report (14 July 2026).
// Source record: dcu-intelligence docs/source-records/pjm-2028-2029-bra-report.md
//
// EIA figures come from src/data/eia-prices.json, which is generated from the archived EIA table in
// dcu-intelligence (docs/evidence/eia-5-6-b-2026-06). When EIA publishes a newer edition, archive it
// there, rerun the script, and replace the JSON; do not edit the numbers here by hand.
import eia from '../data/eia-prices.json';

export const pjm = {
  reportTitle: '2028/2029 Base Residual Auction Report',
  reportDate: '14 July 2026',
  reportUrl: 'https://www.pjm.com/-/media/DotCom/markets-ops/rpm/rpm-auction-info/2028-2029/2028-2029-bra-results-report.pdf',
  deliveryYear: '2028/29',
  shortfallMw: '6,831',          // MW UCAP below the RTO Reliability Requirement (p. 3)
  priorShortfallMw: '6,516',     // 2027/28 auction (p. 3)
  procuredMw: '149,182',         // RPM 138,317.8 + FRR 10,863.8 MW UCAP (p. 3)
  requirementMw: '156,013',      // RTO Reliability Requirement, MW UCAP (p. 4)
  totalReserveMargin: '14.7%',   // RPM + FRR, estimated (p. 5)
  auctionReserveMargin: '14.4%', // RPM only (p. 3)
  targetReserveMargin: '20%',
  clearingPrice: '$325.00',      // $/MW-day UCAP, at the cap (p. 3)
  // RTO clearing prices, $/MW-day UCAP, from Table 2 (p. 5)
  priceHistory: [
    { year: '2024/25', price: '$28.92' },
    { year: '2025/26', price: '$269.92' },
    { year: '2026/27', price: '$329.17' },
    { year: '2027/28', price: '$333.44' },
    { year: '2028/29', price: '$325.00' },
  ],
  // Arithmetic only: $325.00 x 365 days. Never shown on the homepage.
  perMwYear: '$118,625',
};

export type Sector = 'Commercial' | 'Industrial';
export const eiaPrices = eia;
export const eiaStates = ['Virginia', 'Ohio', 'Texas', 'Arizona'] as const;

const released = new Date(`${eia.released}T12:00:00Z`);
export const eiaReleased = released.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export const pct = (n: number) => `${n > 0 ? '+' : n < 0 ? '−' : ''}${Math.abs(n).toFixed(1)}%`;
export const cents = (n: number) => `${n.toFixed(2)}¢`;
