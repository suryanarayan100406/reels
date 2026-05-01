# Phase 7: Polish & Deployment - Validation Strategy

**Date:** 2026-05-02
**Phase Slug:** polish-deployment

## 1. Goal Backward Verification
**Goal:** Add animations, loading/error/empty states, final responsive tweaks, and deployment configuration.

**Must-Haves for Goal to be True:**
1. When scrolling down the gallery, cards fade in smoothly.
2. The initial load shows a cat-themed loading state instead of a blank screen or generic spinner.
3. If the DB is empty, the gallery shows the cute empty state message.
4. If the server is offline, the gallery shows the cat error state.
5. `README.md` exists and contains setup steps.
6. `server/.env.example` exists.

## 2. Requirements Coverage
| Requirement | Validation Approach |
|-------------|---------------------|
| **UX-01** (Mobile-first) | Verify UI elements (cards, headers) look correct at 375px width. |
| **UX-02** (Fade-in scroll) | Scroll quickly through a populated gallery and observe entry animations. |
| **UX-03** (Loading cat) | Throttle network to 3G in DevTools and verify loading state animation. |
| **UX-04** (Empty cat) | Delete all reels via Admin panel and verify the empty state appears. |
| **UX-05** (Error cat) | Block the `/api/reels` request in DevTools and verify the error state appears. |
| **UX-06** (Fast load) | Run Lighthouse in DevTools (Mobile) and aim for 90+ performance. |
| **UX-07** (Smooth scroll) | Verify `scroll-behavior: smooth` is applied globally. |
| **INFRA-05** (.env.example) | Verify `server/.env.example` contains all expected keys. |
| **INFRA-06** (README.md) | Verify `README.md` contains clear Meta API setup instructions. |

## 3. Test Infrastructure
- Visual inspection via browser DevTools.
- Network throttling simulation.
