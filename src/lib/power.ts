// Figures for the Power section, shared by /power and the homepage card so the two never disagree.
//
// PJM figures are quoted from PJM's 2028/2029 Base Residual Auction Report (14 July 2026).
// Source record: dcu-intelligence docs/source-records/pjm-2028-2029-bra-report.md
//
// EIA figures come from src/data/eia-state-prices.json. It is generated, with every figure and each
// state's wording, by `python -m power_prices prepare` in dcu-intelligence from the archived EIA
// tables. On an approved update, replace the whole file; never edit numbers here or in the JSON.
import eia from '../data/eia-state-prices.json';

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
  // PJM Manual 18, sections 7.4-7.5 (pp. 169-170): peak load contributions vs scaled LSE obligations.
  // Record: dcu-intelligence docs/source-records/pjm-2028-2029-bra-report.md
  manualTitle: 'PJM Manual 18: PJM Capacity Market',
  manualRevision: 'Revision 62, effective 17 December 2025',
  manualUrl: 'https://www.pjm.com/-/media/DotCom/documents/manuals/m18.pdf',
};

export const eiaPrices = eia;
export type StatePrices = (typeof eia.states)[number];

const fullDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
export const eiaReleased = fullDate(eia.source.released);
export const eiaYtdLabel = `${eia.source.periods.ytd_span} ${eia.source.periods.current.slice(0, 4)}`;
// Readers get EIA's web tables; the proposal archives the spreadsheets behind them.
export const eiaTableUrls = {
  monthly: 'https://www.eia.gov/electricity/monthly/epm_table_grapher.php?t=epmt_5_6_a',
  ytd: 'https://www.eia.gov/electricity/monthly/epm_table_grapher.php?t=epmt_5_6_b',
};

export { pct, cents } from './format';
