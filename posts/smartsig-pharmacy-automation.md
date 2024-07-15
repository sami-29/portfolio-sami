---
title: "How I Built SmartSIG: Saving a Pharmacy Hours Every Week"
subtitle: Automating prescription sig management with AI, permutations, and a multi-role review workflow
date: 2026-03-04
keywords:
  - pharmacy automation
  - pharmacy management software
  - SmartSIG
  - prescription sig management
  - AI clinical validation
  - pharmacy workflow software
tags:
  - projects
  - pharmacy
  - automation
---

Pharmacies deal with a deceptively complex problem: **sigs**. A sig is the dispensing instruction attached to every prescription. Things like "Take 1 tablet by mouth twice daily with food." They come in hundreds of variations, they need to be standardized, validated, and approved before they can be used reliably.

My client, a pharmacy owner, was doing all of that manually. Him and his team would spend hours every week going through sigs one by one, approving them, correcting them, and trying to maintain consistency. There was no system. Just spreadsheets, memory, and a lot of back-and-forth.

That's where SmartSIG came in.

---

## The Problem

Before writing a single line of code, I spent time understanding the actual workflow. A sig enters the system with raw, unstructured data: the instruction text, a count, days supply, reason for use, and field values like action, dose, route, and frequency. The core problem was threefold:

1. No standardization: the same instruction appeared in dozens of slightly different forms
2. No audit trail: nobody knew who approved what, or when
3. No safety net: nothing double-checked that an approved sig made clinical sense

The goal was to build a tool that solved all three, without getting in the pharmacists' way.

---

## Where Sigs Come From

A significant source of new sigs is incoming medication data from other healthcare facilities. These are full patient medication history exports from Epic EHR systems used at hospitals and clinics. They arrive as large CSV files with a column called `ENTERED_SIG`, a free-text field where clinicians type the sig however they see fit.

The problem is that this free-text is messy, inconsistent, and completely unstructured. A sig might say "0.1 mg by Per G Tube route every 6 hours if needed for high blood pressure" in one row, and "0.1 mg q6h PRN HTN" in another. They mean the same thing. The system cannot treat them the same without first parsing and normalizing them.

To solve this, I built a separate preprocessing tool, a Vite/React app that sits upstream of SmartSIG. It takes an Epic export, parses the `ENTERED_SIG` field against Epic's own clinical dictionaries (frequency codes, route codes, dose units), and tries to map each sig to structured fields. Every mapping gets a confidence score. Low-confidence or ambiguous mappings surface in a manual correction interface so staff can fix them before anything gets sent onward.

Once processed, sigs that haven't been seen before get pushed into SmartSIG's manual review queue, where the pharmacist team works through them. That's how the database grows over time. New facilities, new patterns, new sig variations.

---

## The Core: Manual Review

This is the beating heart of SmartSIG, and where I spent the most time getting things right.

When sigs enter the system, they land in the **Parsed** tab of the manual review queue. Pharmacists don't just get a list dumped on them. They claim a set of sigs to work through, which locks those sigs to them and prevents any other reviewer from touching them at the same time. Once they're done, they can release the set back if needed.

Each sig is presented as a card. The card shows the raw sig name at the top, and beneath it a structured form where the reviewer fills in or corrects each field: action, dose, dose unit, route, frequency, interval, time of day, site, device, duration, indication, and more. Every field maps to a curated list of valid options pulled from SNOMED-coded clinical mappings. The reviewer isn't typing freeform text; they're selecting from controlled, standardized vocabulary.

The form does real-time validation on every field change. If a required field is missing or a value doesn't pass validation rules, the sig is marked as invalid and cannot be approved in that state. The reviewer has to fix it first. Below the form, metadata is always visible: the sig's QA status, how many times it appears in the system, its percentage share, days supply, reason for use, and any unsupported values that couldn't be mapped.

Once a reviewer is satisfied, they either **approve** the sig (it moves to the Approved tab) or **skip** it (it moves to the Skipped tab for another reviewer or a later pass). They can also return a sig from approved or skipped back to parsed if something needs to be revisited. Every one of these actions is recorded.

The three tabs (Parsed, Approved, Skipped) each show live counts and support search by name or ID, filtering by validity, tag filtering, and sort order. Pages prefetch the next page in the background so navigation stays instant.

There's also an undo system. If a reviewer accidentally approves or skips something, they have a short window to undo the action through a drawer that tracks their recent decisions, fully reversing the state server-side.

The role system adds another layer of control:
- **Admin**: full access, user management, config
- **Normal**: full review capabilities
- **Junior**: review with oversight
- **Onboarding**: waiting for admin approval before accessing anything

New users land on a waiting page after signup and can read the guide in the meantime.

---

## Multi-Step Sigs: The Hard Problem

Some sigs are not a single instruction. They're sequences. A patient might be told to take one dose for 7 days, then a different dose for the next 14 days, then taper off. Or the pattern doesn't follow any formula at all. Just freeform clinical instructions that span multiple stages.

These are called multi-step sigs, and they're genuinely hard. The sig card form supports adding multiple steps to a single sig. Each step has its own independent set of field values, and the reviewer navigates between steps using a step control in the card header. Adding a step clones the current step as a starting point so the reviewer isn't starting from scratch each time. Removing a step is also supported, and the system won't let you remove the last one.

When the reviewer approves a multi-step sig, the field values from all steps are merged into a pipe-delimited structure: each field stores its values across steps joined by `|`. So a sig with two different frequencies becomes `frequency: "Once Daily|Twice Daily"` internally, preserving the full instruction sequence in a single record.

For multi-step sigs specifically, before final approval the reviewer also gets a dialog asking them to confirm which fields were **inferred** vs explicitly stated. This matters because inferred values carry less clinical certainty and should be flagged as such.

This feature is still being refined. Some edge cases, especially instructions that don't follow any predictable phase pattern, aren't fully solved yet. But the architecture is in place, and the team can already work through many complex sigs that would have been completely unworkable before.

---

## The Permutations Engine

One of the most impactful features is the permutations system.

The same logical sig instruction would exist in the database under dozens of slightly different names, formatted differently by different pharmacists or different data sources. There was no way to see that 47 sigs were all essentially the same thing.

The solution is a canonical signature hash. When a sig is processed, a normalized hash is computed based on its field values, not its name. Sigs that share the same hash get grouped into a **Permutation**, which acts as the canonical version of that instruction.

```typescript
// Sig model stores the canonical hash
canonicalSigHash  String?  @db.VarChar(64)
permutationId     String?

// Permutation is the normalized, deduplicated form
model Permutation {
  id          String   @id @default(cuid())
  name        String   @unique
  fieldValues Json
  sigs        Sig[]
}
```

The permutations page gives a full view of every canonical instruction, how many sigs map to it, and what those individual sigs look like. This turned "how many ways are we writing this instruction?" from an unanswerable question into a searchable dashboard.

---

## AI Validation

After sigs are approved, the work isn't over. There's still the question of whether they're actually correct. That's where the AI validation layer comes in, built using [BAML](https://www.boundaryml.com/) (Boundary AI Markup Language).

BAML lets you define typed AI function signatures, which means the AI output is structured and predictable rather than freeform text. Three main AI capabilities power SmartSIG:

**ValidateSigBatch** runs over approved sigs in batches, checking each one for clinical accuracy, safety issues flagged as critical/warning/info, confidence level, and whether it requires pharmacist review.

**AnalyzeUnapprovedSig** gives a deep analysis of a specific sig before it's approved, surfacing potential issues early.

**AskValidationQuestion / AskAnalysisQuestion** are conversational interfaces that let pharmacists ask follow-up questions about validation results, with streaming responses in real time.

---

## Audit Trail and History

Every action in SmartSIG is logged. When a pharmacist changes a field, approves a sig, or skips one, an `Action` record is created with a full diff of what changed and who made the change.

This data surfaces in two places: inline on the manual review page as a history dropdown on each sig, and on a dedicated history page with sorting. Nothing gets lost, and nothing happens without accountability.

---

## Admin Dashboard

The admin side handles the operational layer: spreadsheet import with normalization and deduplication on upload, a fields configuration panel where admins manage valid options and SNOMED codes, user management with role assignment and approval, and a key-value config system for app-wide settings.

---

## Tech Stack

- **Next.js** (App Router): server actions, streaming, file-based routing
- **tRPC**: end-to-end type-safe API
- **Prisma + PostgreSQL**: strongly typed ORM with a well-indexed schema
- **BAML**: typed AI function definitions for structured LLM output
- **NextAuth + OTP**: email-based passwordless authentication
- **Vite + React**: preprocessing tool for Epic EHR data
- **Sentry**: error monitoring
- **GitHub Actions**: automated daily database backups
- **Playwright**: end-to-end testing for the sig review workflow

---

## The Impact

The owner went from spending several hours every week manually reviewing and approving sigs, to having his team work through a structured queue. With AI validation as a safety net and a permutations engine ensuring consistency across the board.

The preprocessing tool means that every time a new healthcare facility's data comes in, new sig patterns get discovered, parsed, and fed into the review queue automatically instead of requiring manual data entry.

SmartSIG is still in active development, with AI autocomplete during review, advanced filtering, and export features on the roadmap. But even in its current state, it turned a time-consuming manual process into something manageable, trackable, and significantly more reliable.
