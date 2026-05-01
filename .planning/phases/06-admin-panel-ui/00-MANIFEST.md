---
phase: 6
status: planned
plans: 4
tasks: 11
requirements: 8
nyquist_compliant: true
wave_count: 2
created: 2026-05-02
---

# Phase 6: Admin Panel UI

## Goal
Build the complete admin interface — login page, reel management (add/edit/delete with forms), hero message editor, and reaction dashboard.

## Plan Summary

- **01-PLAN.md (Wave 1):** Auth & Routing (4 tasks) — Login page, protected route wrapper, frontend routing.
- **02-PLAN.md (Wave 1):** Site Content API (2 tasks) — Backend endpoints for `site_content` and HeroEditor UI.
- **03-PLAN.md (Wave 2):** Dashboard Layout (2 tasks) — Admin navigation shell and Reels table with reaction stats.
- **04-PLAN.md (Wave 2):** Reel CRUD UI (3 tasks) — Add/Edit modal, connecting forms to table, and Delete flow.

## Requirements Covered
- **ADMN-01**: Curator can log in with password to access the admin panel
- **ADMN-02**: Admin routes are protected — unauthenticated users are redirected to login
- **ADMN-03**: Curator can add a reel by pasting an Instagram reel URL
- **ADMN-06**: Curator can write a personal note for each reel (free-text, supports line breaks)
- **ADMN-07**: Curator can edit the personal note or URL of an existing reel
- **ADMN-08**: Curator can delete a reel from the collection
- **ADMN-09**: Curator can view which reels have been ❤️ reacted to (reaction dashboard)
- **ADMN-10**: Curator can edit the hero personal message from the admin panel

## Execution Sequence
```
Wave 1: 01-PLAN.md, 02-PLAN.md
Wave 2: 03-PLAN.md, 04-PLAN.md
```
