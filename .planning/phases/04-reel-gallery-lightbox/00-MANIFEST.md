---
phase: 4
status: planned
plans: 2
tasks: 6
requirements: 12
nyquist_compliant: true
wave_count: 2
created: 2026-05-02
---

# Phase 4: Reel Gallery & Lightbox

## Goal
Display curated reels in a responsive card grid. Clicking a card opens a lightbox modal with embedded Instagram player and full personal note.

## Plan Summary

- **01-PLAN.md (Wave 1):** Grid & Cards (3 tasks) — ReelCard component, Gallery grid fetching data, and App integration.
- **02-PLAN.md (Wave 2):** Lightbox & Player (3 tasks) — Instagram script injection, Lightbox portal/overlay, and modal state connection.

## Requirements Covered
- **REEL-01**: Visitor sees curated reels displayed in a card grid layout
- **REEL-02**: Grid is responsive — 1 column on mobile, 2 columns on tablet, 3 columns on desktop
- **REEL-03**: Each card shows the reel thumbnail image
- **REEL-04**: Each card shows a truncated personal note with "read more" indication
- **REEL-05**: Cards have rounded corners (2xl), soft shadows, no harsh borders
- **REEL-06**: Cards have hover effect — slight lift + soft warm glow (desktop)
- **REEL-07**: Clicking a card opens a lightbox/modal overlay
- **REEL-08**: Lightbox displays the reel via embedded Instagram player (plays inline)
- **REEL-09**: Lightbox shows the full personal note below the video with line breaks preserved
- **REEL-10**: Lightbox has dark overlay background with centered content
- **REEL-11**: Lightbox can be closed with ✕ button or clicking outside
- **REEL-12**: Reels are ordered by most recently added first

## Execution Sequence
```
Wave 1: 01-PLAN.md
Wave 2: 02-PLAN.md
```
