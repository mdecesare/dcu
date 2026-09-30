---
title: "Liquid cooling is no longer just a hyperscale issue"
status: published
published: 2026-09-30
cardTitle: "Liquid cooling is no longer just a hyperscale issue"
section: Cooling
sourcesChecked: 2026-09-30
dek: "What an enterprise facility must decide before the next GPU purchase."
lede: "What enterprise facilities must decide before the next GPU purchase."
description: "A new AI project can make liquid cooling a current planning decision for an enterprise data center. The five decisions to settle before the hardware is bought."
image: /images/briefs/liquid-cooling.webp
imageAlt: "AI-generated image: a coolant distribution unit with overhead piping at the end of a row of server racks"
---

For an enterprise-owned data center, a new AI project can turn liquid cooling from a future
consideration into a current planning decision. A university adding research computing or a
pharmaceutical company deploying AI may need infrastructure its existing server rooms were never
designed to support.

The decision is not simply whether to buy a liquid-cooled server. It is whether the facility can
support the proposed equipment's power and cooling requirements while protecting the workloads
already running there.

AI and high-performance computing can concentrate power and heat into a few racks. Having spare
cooling capacity somewhere in the building does not necessarily mean that capacity can reach the
equipment that needs it. The rack, distribution systems and heat-rejection equipment need to
work together.<sup><a href="#source-1" aria-label="Source 1">1</a></sup>

**Direct-to-chip cooling removes heat at the processor.** It brings a supporting system of
coolant distribution units (CDUs), manifolds, connections, controls and monitoring. The heat
still has to leave the building. Most arrangements connect to facility water; a liquid-to-air
CDU avoids that, but only works if the room's air cooling can absorb the heat it
rejects.<sup><a href="#source-1" aria-label="Source 1">1</a></sup>

**Rear-door heat exchangers capture heat from air leaving the rack.** Used alongside air cooling,
they can support rooms with mixed rack densities, but they cannot replace direct-to-chip cooling
when the selected hardware requires it.<sup><a href="#source-1" aria-label="Source 1">1</a></sup>
In Supermicro's 23 September 2026 announcement for NVIDIA Vera Rubin NVL72 racks, for example,
rear-door heat exchangers are optional equipment to capture residual heat alongside direct liquid
cooling.<sup><a href="#source-2" aria-label="Source 2">2</a></sup>

For some sites, a defined AI zone or contained pod may be a manageable starting point. Deploying
rack by rack lets air and liquid cooling coexist during the transition, and gives the team a way
to prove out installation, maintenance and operating procedures before committing to a wider
rollout.<sup><a href="#source-3" aria-label="Source 3">3</a></sup>

Before committing to the platform, bring IT and facilities together around five decisions:

- **Capacity:** can the rack, room and facility support the proposed electrical load and cooling demand?
- **Cooling architecture:** what does the hardware require, where will its heat go, and what still needs air cooling?
- **Installation:** are piping routes, floor loading, clearances and service access workable without unacceptable disruption?
- **Operations and resilience:** how will coolant quality, leaks, alarms, maintenance and cooling failures be managed, and who owns each responsibility?<sup><a href="#source-4" aria-label="Source 4">4</a></sup>
- **Cost and schedule:** what is the complete cost and timeline, including infrastructure, commissioning, ongoing support and provision for expansion?

<div class="bf-closing">

The objective is to provide the computing capacity the business needs while preserving uptime
and a sensible path for growth. A small, carefully engineered deployment may be enough to get
started. Where the building cannot support the proposed load economically, colocation or cloud
capacity may deserve a place in the same evaluation.

Bringing the hardware requirements and facility capabilities together early gives your team more
choices before the purchase becomes a commitment.

</div>

<div class="bf-related">

**Related on DataCenterUpdate:** [Procurement Pulse](/procurement), lead times by equipment
class, including cooling · [Need another 1–5 MW before the utility can
deliver?](/briefs/next-1-5-mw)

</div>

<section class="bf-sources" aria-labelledby="sources-heading">
<h2 id="sources-heading">Sources</h2>
<p>Checked 30 September 2026. All four are manufacturers' own publications.</p>
<ol>
<li id="source-1"><a class="cls c-v" href="/methodology#source-type-v" title="Vendor source — what this means"><span aria-hidden="true">V</span><span class="sr-only">Vendor source. </span></a> Vertiv · <a href="https://www.vertiv.com/en-ca/solutions/learn-about/liquid-cooling-options-for-data-centers/">Liquid and immersion cooling options for data centers</a></li>
<li id="source-2"><a class="cls c-v" href="/methodology#source-type-v" title="Vendor source — what this means"><span aria-hidden="true">V</span><span class="sr-only">Vendor source. </span></a> Supermicro · <a href="https://ir.supermicro.com/news/news-details/2026/Supermicro-Now-Shipping-NVIDIA-Vera-Rubin-NVL72-Racks/default.aspx">Now shipping NVIDIA Vera Rubin NVL72 racks</a>, 23 September 2026</li>
<li id="source-3"><a class="cls c-v" href="/methodology#source-type-v" title="Vendor source — what this means"><span aria-hidden="true">V</span><span class="sr-only">Vendor source. </span></a> Schneider Electric blog · <a href="https://blog.se.com/datacenter/2026/02/26/brownfield-data-center-modernization-ai/">Brownfield data center modernization for AI</a>, 26 February 2026</li>
<li id="source-4"><a class="cls c-v" href="/methodology#source-type-v" title="Vendor source — what this means"><span aria-hidden="true">V</span><span class="sr-only">Vendor source. </span></a> Schneider Electric · <a href="https://www.se.com/za/en/about-us/newsroom/news/press-releases/Managing-direct-liquid-cooling-deployment-risks-in-AI-data-centres-6a671e64bab15244eb0d0025/">Managing direct liquid cooling deployment risks in AI data centres</a>, 27 July 2026</li>
</ol>
</section>
