---
title: "Million-dollar outages make resilience a business decision"
status: draft
cardTitle: "Million-dollar outages make resilience a business decision"
section: Resilience
sourcesChecked: 2026-09-30
dek: "What enterprise owners should check beyond backup capacity."
lede: "What enterprise owners should check beyond backup capacity."
description: "One in five respondents to Uptime Institute's survey say their most recent impactful outage cost more than $1 million. The five decisions an enterprise owner should settle beyond backup capacity."
image: /images/briefs/resilience-business-decision.webp
imageAlt: "AI-generated image: a technician with a tablet reviewing a line of electrical cabinets in a data center"
imagePosition: "center 22%"
---

For an enterprise-owned data center, an outage can interrupt the work the business depends on.
Customer transactions may stop, clinical systems may become unavailable, or a research team may
lose essential computing. Recovery costs and lost productivity can continue after the power
comes back.<sup><a href="#source-4" aria-label="Source 4">4</a></sup>

Uptime Institute's 2026 outage analysis reports that 57% of respondents to its 2025 annual
survey said their most recent major outage cost more than $100,000. For the second year in a
row, one in five said their most recent impactful outage cost more than $1 million. Uptime also
reports that outage frequency per site has declined for the fifth consecutive
year.<sup><a href="#source-1" aria-label="Source 1">1</a></sup>

For an owner, the useful takeaway is the scale of potential business exposure. Understanding
which services would stop, and what recovery would involve, helps make resilience spending a
business decision.<sup><a href="#source-4" aria-label="Source 4">4</a></sup>

Power remains the leading cause of impactful outages in Uptime's findings, with failures
involving UPS systems, transfer switches and generators dominant. Grid constraints and
high-density workloads add new pressure points.<sup><a href="#source-1" aria-label="Source 1">1</a></sup>

**A facility can have redundancy on paper and still leave a critical load exposed.** Equipment
served through a single UPS or rack power distribution unit can be a single point of
failure.<sup><a href="#source-2" aria-label="Source 2">2</a></sup> A UPS operating on bypass may
keep equipment running while leaving it without the protection the owner
expects.<sup><a href="#source-3" aria-label="Source 3">3</a></sup>

This makes the actual operating arrangement important: which loads are protected, what changes
during maintenance, and whether alarms and procedures reveal a loss of protection before another
failure occurs.<sup><a href="#source-2" aria-label="Source 2">2</a>, <a href="#source-3" aria-label="Source 3">3</a></sup>

Before the next upgrade or budget review, bring facilities, IT and business owners together
around five decisions:

- **Business exposure:** which essential services would stop, what downtime can the organization tolerate, and what would recovery cost?
- **Power-path dependencies:** where do critical loads share components or depend on a single feed, and what happens when equipment is isolated for maintenance?
- **Equipment readiness:** do generator capacity and fuel arrangements, UPS batteries, transfer equipment, monitoring and service support match the current load?
- **Cooling and controls:** which supporting systems must remain available through an electrical event, and how will they recover? Revisit these assumptions when adding AI or other concentrated loads.
- **Testing and recovery:** have operating sequences, maintenance procedures and recovery plans been checked against the current configuration, and does the team know its responsibilities?<sup><a href="#source-3" aria-label="Source 3">3</a>, <a href="#source-4" aria-label="Source 4">4</a></sup>

<div class="bf-closing">

For enterprise owners, a resilience review should produce clear priorities: which failure
conditions could interrupt essential services, how long recovery could take, and where
improvements would reduce that exposure.<sup><a href="#source-4" aria-label="Source 4">4</a></sup>

That gives facilities and finance something concrete to work on together. The goal is a plan the
business can fund and the operations team can carry out when it matters.

</div>

<div class="bf-related">

**Related on DataCenterUpdate:** [Need another 1–5 MW before the utility can
deliver?](/briefs/next-1-5-mw) · [Liquid cooling is no longer just a hyperscale
issue](/briefs/liquid-cooling)

</div>

<section class="bf-sources" aria-labelledby="sources-heading">
<h2 id="sources-heading">Sources</h2>
<p>Checked 30 September 2026.</p>
<ol>
<li id="source-1"><a class="cls c-r" href="/methodology#source-type-r" title="Research source — what this means"><span aria-hidden="true">R</span><span class="sr-only">Research source. </span></a> Uptime Institute · <a href="https://intelligence.uptimeinstitute.com/resource/annual-outage-analysis-2026">Annual outage analysis 2026</a>, 11 May 2026 (public key findings; the full report is for subscribers)</li>
<li id="source-2"><a class="cls c-v" href="/methodology#source-type-v" title="Vendor source — what this means"><span aria-hidden="true">V</span><span class="sr-only">Vendor source. </span></a> Eaton · <a href="https://www.eaton.com/us/en-us/products/backup-power-ups-surge-it-power-distribution/backup-power-ups/maintenance-bypass-for-ups-redundancy.html">UPS maintenance bypass installation best practices</a> (written for network closets)</li>
<li id="source-3"><a class="cls c-v" href="/methodology#source-type-v" title="Vendor source — what this means"><span aria-hidden="true">V</span><span class="sr-only">Vendor source. </span></a> Eaton · <a href="https://www.eaton.com/content/dam/eaton/markets/data-center/Data-center-downtime-risk-and-cost-avoidance.pdf">Data center downtime: risk and cost avoidance through service</a> (white paper, PDF)</li>
<li id="source-4"><a class="cls c-g" href="/methodology#source-type-g" title="Government source — what this means"><span aria-hidden="true">G</span><span class="sr-only">Government source. </span></a> NIST · <a href="https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final">SP 800-34 Rev. 1, Contingency planning guide for federal information systems</a>, May 2010, updated November 2010 (sections 3.2–3.6)</li>
</ol>
</section>
