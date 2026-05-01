---
phase: 2
status: planned
plans: 2
tasks: 5
requirements: 7
nyquist_compliant: true
wave_count: 2
created: 2026-05-02
---

# Phase 2: Reel CRUD & oEmbed Integration

## Goal
Build the reel management API — admin can add reels via Instagram URL, backend fetches embed data and thumbnail, supports edit/delete operations.

## Plan Summary

- **01-PLAN.md (Wave 1):** Instagram Service (3 tasks) — Cheerio setup, oEmbed fetching, thumbnail scraping, unit tests.
- **02-PLAN.md (Wave 2):** Routes (2 tasks) — CRUD endpoints for `/api/reels`, integration tests using Supertest.

## Requirements Covered
- **ADMN-03**: Curator can add a reel by pasting an Instagram reel URL
- **ADMN-04**: Backend validates the Instagram URL and fetches embed data via oEmbed API
- **ADMN-05**: Backend extracts thumbnail from Instagram page og:image meta tag
- **ADMN-06**: Curator can write a personal note for each reel (free-text)
- **ADMN-07**: Curator can edit the personal note or URL of an existing reel
- **ADMN-08**: Curator can delete a reel from the collection
- **INFRA-03**: Instagram oEmbed API integration with Meta App Access Token

## Execution Sequence
```
Wave 1: 01-PLAN.md
Wave 2: 02-PLAN.md
```
