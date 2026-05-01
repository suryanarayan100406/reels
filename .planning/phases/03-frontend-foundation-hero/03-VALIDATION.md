# Phase 3: Frontend Foundation & Hero - Validation Strategy

**Date:** 2026-05-02
**Phase Slug:** frontend-foundation-hero

## 1. Goal Backward Verification
**Goal:** Scaffold React + Vite + TailwindCSS frontend with the cat lover design system and build the hero/landing section.

**Must-Haves for Goal to be True:**
1. A running Vite+React application in the `client/` directory.
2. TailwindCSS installed and applying custom colors and typography properly.
3. The hero section renders properly with the required text elements.
4. The site has the defined visual aesthetic (colors, fonts, paw prints).
5. The layout is fully responsive, particularly optimized for mobile (375px width).

## 2. Requirements Coverage
| Requirement | Validation Approach |
|-------------|---------------------|
| **HERO-01** (Title typography) | Visual inspection of `h1` element styling and "Playfair Display" font. |
| **HERO-02** (Personal message) | Check that component attempts to fetch `/api/site_content/hero_message` and displays it. |
| **HERO-03** (Curator branding) | Verify the presence of "curated by Silent Admirer". |
| **HERO-04** (Color palette) | Inspect computed CSS for background, text, and accent colors matching the hex codes. |
| **HERO-05** (Paw print background) | Verify an SVG background exists and has low opacity. |
| **HERO-06** (Favicon) | Check `public/favicon.svg` exists and `index.html` references it. |
| **HERO-07** (Footer text) | Check `footer` element for "Made with 🐾 for Mrs Mansu". |
| **HERO-08** (Decorative dividers) | Look for paw print icon components used as separators below the hero. |

## 3. Test Infrastructure
- **Manual Visual QA:** The frontend aesthetics are heavily visual. We will rely on manual confirmation and DOM checking.
- **Vite Build Check:** Running `npm run build` in the `client/` directory must succeed without errors.

## 4. Edge Cases & Constraints
1. **API Offline:** If the backend isn't running, the hero message should fallback gracefully (e.g. "To the one who makes me smile...") instead of crashing.
2. **Mobile Layout:** Typography must scale down gracefully on screens smaller than 400px.
3. **Missing Fonts:** Fallback to generic `serif` and `sans-serif` must be defined.
