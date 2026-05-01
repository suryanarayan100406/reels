# Phase 4: Reel Gallery & Lightbox - Validation Strategy

**Date:** 2026-05-02
**Phase Slug:** reel-gallery-lightbox

## 1. Goal Backward Verification
**Goal:** Display curated reels in a responsive card grid. Clicking a card opens a lightbox modal with embedded Instagram player and full personal note.

**Must-Haves for Goal to be True:**
1. Reels fetch from `/api/reels` and render without error.
2. The UI scales from 1 column on mobile to 3 on desktop.
3. Lightbox successfully plays Instagram video without console errors.
4. Clicking outside the lightbox or pressing "Close" restores the main view.

## 2. Requirements Coverage
| Requirement | Validation Approach |
|-------------|---------------------|
| **REEL-01** (Card grid) | Visually verify cards are in a grid container. |
| **REEL-02** (Responsive columns) | Check layout at 375px (1 col), 768px (2 cols), and 1024px (3 cols). |
| **REEL-03** (Thumbnail) | Check card `<img>` tags load the extracted thumbnail URLs. |
| **REEL-04** (Truncated note) | Ensure `line-clamp-3` is active and "read more" is visible if text is long. |
| **REEL-05** (Card styling) | Verify `rounded-2xl` and `shadow-sm` classes on cards. |
| **REEL-06** (Hover effect) | Hover over a card to verify `-translate-y-1` and shadow expansion. |
| **REEL-07** (Lightbox opens) | Clicking a card mounts the Lightbox component. |
| **REEL-08** (Inline player) | Lightbox injects `embed_html` and `instgrm.Embeds.process()` executes successfully. |
| **REEL-09** (Full note) | Verify Lightbox displays the note with `whitespace-pre-wrap` styling. |
| **REEL-10** (Dark overlay) | Inspect Lightbox backdrop for `bg-black/80` or similar. |
| **REEL-11** (Close mechanisms) | Click X and click backdrop to verify modal unmounts. |
| **REEL-12** (Chronological order) | Check that the first rendered card has the newest `created_at` timestamp. |

## 3. Test Infrastructure
- **Manual DOM Verification:** Add a few dummy reels via the backend (or direct SQLite insert) to test rendering.
- **Console Monitoring:** Watch for Instagram script execution errors (CORS, mixed content, blockings).

## 4. Edge Cases & Constraints
- **Empty State:** If `/api/reels` returns `[]`, handle it gracefully (placeholder for Phase 7 empty state).
- **Broken Thumbnails:** If `thumbnail_url` is broken, the `<img>` needs an `onError` fallback or a default background.
- **Scroll Lock:** When the modal is open, scrolling the background must be blocked.
