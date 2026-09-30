---
title: "More computing doesn't have to mean more water"
status: published
published: 2026-09-30
cardTitle: "More computing doesn't have to mean more water"
section: Water
sourcesChecked: 2026-09-30
dek: "What warmer coolant can mean for water use, operating cost and reliability."
lede: "What warmer coolant can mean for enterprise water use, operating cost and reliability."
description: "Circulating coolant through servers and consuming water to reject heat are different things. How cooling architecture, coolant temperature and climate shape an enterprise site's water use."
image: /images/briefs/cooling-water-use.webp
imageAlt: "AI-generated image: rows of fan-topped dry coolers with piping beside a data center building at sunset"
---

For an enterprise-owned data center, water use can affect operating cost and expansion
decisions. A campus adding AI capacity may need to support denser computing while working within
existing cooling infrastructure and local water constraints.

Liquid cooling can sound like a commitment to consume more water. **But circulating coolant
through servers and consuming water to reject heat are different things.** A closed coolant loop
carries heat away from the equipment. The outdoor cooling system determines whether removing that
heat requires evaporation, dry cooling, or a combination.<sup><a href="#source-1" aria-label="Source 1">1</a>, <a href="#source-2" aria-label="Source 2">2</a></sup>

Warmer coolant can make dry heat rejection practical for more hours of the year, depending on
outdoor conditions and equipment performance. That can reduce reliance on water-assisted cooling.
Avoiding mechanical chilling can also save energy, but the water and energy results depend on the
complete design.<sup><a href="#source-1" aria-label="Source 1">1</a>, <a href="#source-3" aria-label="Source 3">3</a></sup>

Schneider Electric's white paper of 21 September 2026 illustrates that potential. In modeled
100 MW designs using adiabatic heat rejection, an optimized liquid-cooled AI architecture reduced
annual on-site cooling-water use by 48% in Dallas (from about 382,000 to 197,000 cubic meters) and
by 53% in Paris (from about 108,000 to 51,000), compared with an air-cooled AI design. **These are
vendor-modeled results, not measurements from operating enterprise facilities or savings
forecasts for your site.**<sup><a href="#source-4" aria-label="Source 4">4</a></sup>

The lesson is that cooling architecture, operating temperature and climate need to be evaluated
together.

**A warmer technology-cooling loop is not simply a higher setpoint for an existing chilled-water
system.** The technology loop supplies coolant to the IT equipment; a coolant distribution unit
(CDU) may transfer its heat into a separate facility-water loop. Each side has its own
temperature, flow and equipment requirements. ASHRAE recognizes a W45 liquid-cooling class with
an upper temperature limit of 45°C (113°F), but the selected hardware's approved conditions still
govern the design.<sup><a href="#source-2" aria-label="Source 2">2</a>, <a href="#source-5" aria-label="Source 5">5</a></sup>

Before choosing an architecture, bring IT and facilities together around five decisions:

- **Equipment requirements:** what coolant temperatures, flow rates, fluid quality and warranty conditions does the selected platform require?
- **Heat rejection:** can the existing plant support the load, including remaining air-cooled equipment, or will dry, adiabatic or evaporative equipment need to be added?
- **Local conditions:** how do summer design temperatures, seasonal weather, water availability and utility charges affect the options?
- **Reliability and operations:** what happens during a cooling failure or maintenance event, and how will controls, leaks, coolant quality and recovery be managed?
- **Whole-project economics:** what are the capital cost, annual water and energy use, maintenance needs and expansion implications of each workable design?<sup><a href="#source-2" aria-label="Source 2">2</a>, <a href="#source-3" aria-label="Source 3">3</a></sup>

For an existing facility, a dedicated AI zone may provide a practical way to introduce a different
cooling architecture while retaining air cooling elsewhere. Its water benefit will depend on how
heat leaves the site.<sup><a href="#source-2" aria-label="Source 2">2</a></sup>

<div class="bf-closing">

A liquid-cooled expansion can offer a chance to improve water performance while meeting the
business's computing needs. Evaluating the hardware, temperature range and heat-rejection options
together gives your team a clearer view of the costs, savings and reliability it can reasonably
expect.

</div>

<div class="bf-related">

**Related on DataCenterUpdate:** [Liquid cooling is no longer just a hyperscale
issue](/briefs/liquid-cooling), whether the facility can accept liquid-cooled equipment at all

</div>

<section class="bf-sources" aria-labelledby="sources-heading">
<h2 id="sources-heading">Sources</h2>
<p>Checked 30 September 2026. Water figures are on-site cooling water only; they do not include water used to generate the site's electricity.</p>
<ol>
<li id="source-1"><a class="cls c-v" href="/methodology#source-type-v" title="Vendor source — what this means"><span aria-hidden="true">V</span><span class="sr-only">Vendor source. </span></a> Schneider Electric · <a href="https://www.se.com/ww/en/download/document/SPD_WP220_EN/">White Paper 220, Water usage at AI scale: insights from a 100 MW comparative analysis</a>, 21 September 2026 (summary page)</li>
<li id="source-2"><a class="cls c-v" href="/methodology#source-type-v" title="Vendor source — what this means"><span aria-hidden="true">V</span><span class="sr-only">Vendor source. </span></a> Vertiv · <a href="https://www.vertiv.com/en-ca/solutions/learn-about/liquid-cooling-options-for-data-centers/">Liquid and immersion cooling options for data centers</a></li>
<li id="source-3"><a class="cls c-r" href="/methodology#source-type-r" title="Research source — what this means"><span aria-hidden="true">R</span><span class="sr-only">Research source. </span></a> ASHRAE · <a href="https://www.ashrae.org/technical-resources/ai-data-center-framework/energy-and-thermal-efficiency">AI data center framework: energy and thermal efficiency</a></li>
<li id="source-4"><a class="cls c-v" href="/methodology#source-type-v" title="Vendor source — what this means"><span aria-hidden="true">V</span><span class="sr-only">Vendor source. </span></a> Schneider Electric · <a href="https://www.se.com/us/en/about-us/newsroom/news/press-releases/Schneider-Electric-advances-energy-and-industrial-intelligence-for-a-more-resilient-future-at-Climate-Week-NYC-2026-6aa040fadfc4095b7b0f36c9/">Climate Week NYC 2026 press release</a>, section "Supporting responsible AI infrastructure growth"</li>
<li id="source-5"><a class="cls c-r" href="/methodology#source-type-r" title="Research source — what this means"><span aria-hidden="true">R</span><span class="sr-only">Research source. </span></a> ASHRAE · <a href="https://www.ashrae.org/technical-resources/ai-data-center-framework/introduction-and-purpose">AI data center framework: introduction and purpose</a> (liquid-cooling classes W17 to W+)</li>
</ol>
</section>
