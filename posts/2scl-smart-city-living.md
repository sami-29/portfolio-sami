---
title: 2SCL - Building a Smart City Platform That Never Launched
subtitle: What it was like to build a city SaaS around the UN SDGs, and watch it get shelved before it shipped
date: 2026-03-04
keywords:
  - smart city platform
  - city platform
  - city SDG platform
  - 2SCL
  - smart city living
  - UN SDG tracking
  - city management software
  - sustainable development goals platform
tags:
  - projects
  - smart-city
  - sdg
---

Some projects teach you the most precisely because they never make it to the finish line. 2SCL is one of those projects.

2SCL stood for **Smart City Living**. The vision was a **smart city platform**—a city platform for cities and municipalities. A centralized tool where city administrations could sign up, track their progress toward the UN's 17 Sustainable Development Goals, compare how they're doing against other cities, manage resources and budgets, set and chase objectives, and get guided along the way. It had a clear purpose, a real audience, and a genuine expert behind it. And then it ran out of money.

---

## The Person Behind It

The client was an expert in urbanism. This wasn't a casual side project or a tech person with a vague idea. He had real experience in this field, understood how city administrations work, and had a concrete vision for what the platform needed to do. The plan wasn't just to build a tool and hope cities found it. He and people he would eventually hire were going to work directly with cities, guide them through the platform, help them understand their SDG data, and assist them in forming strategies to actually improve their scores.

That context matters a lot for understanding what 2SCL was trying to be. It wasn't a self-serve SaaS in the usual startup sense. It was closer to a platform that a consulting practice would sit behind, with the software doing the heavy lifting on data and visualization while real human experts drove adoption and guidance.

---

## What the Smart City Platform Did

Each account on the smart city platform represented a city. The city's administrators could log in, fill in data across any of the 17 UN Sustainable Development Goals, and the platform would calculate their scores, show their progress over time, and give them a clear picture of where they were falling short.

There are over 200 SDG indicators across the 17 goals. Each one measures something specific. SDG 2 is about zero hunger and covers things like undernourishment rates, food insecurity, and agricultural productivity. SDG 11 is about sustainable cities and communities. SDG 13 is about climate action. Every indicator has its own shape, its own units, and its own formula. Filling all of that in across an entire city and getting meaningful numbers out of it is a lot of work, but it's very manageable once the system is set up correctly.

One of the key pieces I built for this was a **calculation API**, deployed and hosted on Cloudflare Workers. When a city entered data for an indicator, the platform would call this API to process the raw values and return the computed result. Cloudflare Workers has a very generous free tier, which made it a practical choice for keeping costs down while the product was still in early stages. The calculation logic lived separately from the main app, cleanly isolated, easy to update independently.

Cities could then compare their progress. Two cities could look at the same SDG and see how they stacked up against each other on any given indicator, over any time range. That comparative view was core to the product's value, especially for smaller municipalities that might not have an internal research team.

---

## Features Across the Platform

Beyond the SDG tracking, the platform covered quite a bit of ground.

**Objectives** let cities create concrete goals tied to specific SDGs. If a city was underperforming on SDG 3 (good health and well-being), they could set an objective with a due date, a priority level, and a team member responsible for it. Progress on those objectives was visible on the dashboard.

**Alerts** gave city teams a way to flag issues that needed attention. Alerts had types (warning, error, info), priority levels, and statuses that could be updated as situations evolved. Admins could manage them; members could see them.

**Resources** tracked the physical and human assets a city was working with. Equipment, personnel, facilities, organized by type and location.

**History and rollback** meant that any change to a city's data was automatically archived before it happened. If someone made a mistake or wanted to compare current data against a state from six months ago, they could pull up a timeline, diff two snapshots side by side, or roll the whole thing back.

**Member management** let city admins invite their team, assign roles (owner, admin, member, guest), and control who could do what. Two-factor authentication was available for accounts that needed it.

The platform supported **English and French** out of the box, which made sense given the target market often included French-speaking municipalities.

---

## Budget Management: A Feature That Got Argued Out

One thing I started building was a budget management module. The idea was that cities could track their spending across categories relevant to their SDG goals.

It got argued out of the scope eventually, and honestly, it was the right call. Budget management sounds straightforward until you start building it seriously. The moment you try to model a real municipal budget you run into a rabbit hole: hierarchical categories, multi-year spending cycles, fund allocation versus actual expenditure, approval workflows. It becomes a product of its own very quickly.

Starting to build it taught me why dedicated budget and finance software exists as a separate category. I got far enough in to understand the complexity, and then we cut it. Some lessons come from building things that don't ship.

---

## Why It Didn't Launch

The project was well underway. The SDG tracking core was functional, the calculation API was live, the history and archiving system worked, auth and multi-tenancy were solid, and most of the management features were in place.

The owner tried multiple times to secure the funding needed to take it further. It didn't come through. Running a platform aimed at city governments is a long, expensive sales cycle, and without the funding to sustain that process, the project stalled and eventually got shelved.

It's one of the harder parts of this kind of work. You can build something with real thought and real quality behind it, and it still goes nowhere because of circumstances that have nothing to do with what was built.

---

## What I Took From It

The **calculation API on Cloudflare Workers** pattern is something I'd reach for again on any project that needs isolated, cheap, scalable compute for specific logic.

The **archive-before-mutate** approach to data history is something I now think about early in any project where data integrity matters. It's simple to implement and extremely valuable when something goes wrong.

And **scoping a product tightly** is something I have more appreciation for. The budget module being argued out was the right move. A focused tool that does its core job well is worth more than a sprawling one that does many things poorly. The platform was at its strongest when it stayed focused on what it was actually about: helping cities understand and improve their SDG standing.
