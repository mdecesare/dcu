---
title: "Spare capacity is not the same as AI readiness"
date: 2026-05-07
topic: "power"
type: "Explainer"
readtime: 6
featured: true
summary: "Most enterprise data centers have spare capacity on paper. Very few have the right kind of capacity in the right place to support GPU workloads. Understanding the difference is the first real question."
---

## The number on paper and the number that matters

When someone asks a data center manager whether they have capacity for AI infrastructure, the honest answer is almost always "it depends on what you mean by capacity." Spare power on paper — headroom in the utility feed, untapped breakers, empty cabinet space — is a starting point, not an answer.

GPU workloads are fundamentally different from the server infrastructure most enterprise data centers were designed around. A standard server rack might draw 5 to 10 kilowatts. A rack of modern AI accelerators can draw 40, 60, or more than 100 kilowatts. The physical space is the same. Everything else is different.

## What "usable" actually means

Usable capacity is the intersection of three things: available power at the rack level, cooling capacity at the density required, and structural and infrastructure support — floor loading, cable pathways, PDU configurations. A data center can have headroom in all three categories individually and still have zero usable capacity for high-density AI workloads if they don't align spatially.

This is the conversation that gets skipped when executives are told "we have room." Room for what, at what density, with what cooling approach, supported by which power circuits — these are the questions that matter, and they rarely get asked before vendor conversations begin.

## Why this matters before any vendor conversation

The sequence most organizations follow is backwards. A vendor proposes a GPU cluster. IT leadership gets excited. Facilities gets pulled in to figure out if it fits. That last step is where reality arrives, usually uncomfortably.

The better sequence is to establish your actual infrastructure baseline first — not as a procurement exercise, but as a planning input. What can this facility actually support today, at what density, in which zones? That answer changes every subsequent conversation, including what you buy, how much of it you buy, and whether you buy it at all or look at colocation instead.

## The practical starting point

If you don't have a current infrastructure assessment, that is the first step — not an AI readiness evaluation, not a vendor RFP. Understanding what you have is the prerequisite for understanding what you can do with it.
