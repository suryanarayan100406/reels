# Research Summary: If You Ever Wondered

## Stack Recommendation

**Frontend:** React 19 + Vite 6 + TailwindCSS 4 + Framer Motion 12
**Backend:** Node.js 22 LTS + Express 4 + better-sqlite3 + bcrypt
**Instagram:** oEmbed API with Meta App Access Token
**Deployment:** Vercel (frontend) + Railway with persistent volume (backend)

## Table Stakes Features

1. Hero/landing section with warm personal message
2. Reel card grid (responsive: 1-col mobile, 3-col desktop)
3. Lightbox modal with embedded Instagram player
4. Password-protected admin panel (add/edit/delete reels)
5. Personal note per reel (curator writes, viewer reads)
6. ❤️ reaction system (no auth required)
7. Mobile-first responsive design
8. Cat lover aesthetic throughout

## Key Technical Decisions

| Decision | Rationale |
|----------|-----------|
| SQLite over MongoDB/Postgres | <1000 rows expected. Zero external dependencies. ACID compliant. |
| oEmbed API over Graph API | Graph API can't access feed. oEmbed works for public content embedding. |
| Manual thumbnail extraction | Meta removed thumbnails from oEmbed response (Nov 2025). Must scrape og:image. |
| localStorage visitor ID for reactions | No viewer auth required. "Best effort" tracking is sufficient for a gift. |
| Lazy-load embeds in modal | Performance — don't load all Instagram iframes at page load. |

## Watch Out For

1. **oEmbed thumbnails are GONE** — Must extract `og:image` from Instagram page HTML when saving reels
2. **Instagram embed script in React** — Needs manual `window.instgrm.Embeds.process()` calls after re-renders
3. **SQLite on serverless** — Use Railway (not Vercel) for backend to get persistent disk
4. **Some reels aren't embeddable** — Validate at add-time, show fallback if embed fails
5. **Mobile embed sizing** — Instagram iframes need CSS overrides for responsive behavior

## Recommended Build Order

1. Backend foundation (Express + SQLite + schema)
2. Admin authentication (bcrypt + sessions)
3. Reel CRUD + oEmbed integration + thumbnail extraction
4. Frontend foundation (Vite + React + Tailwind + routing)
5. Hero section (cat theme, personal message)
6. Reel gallery (card grid + API)
7. Lightbox modal (Instagram embed player)
8. Reaction system (❤️ + API)
9. Admin panel UI (forms + reel management + reaction dashboard)
10. Polish (animations, loading/error/empty states, responsive tweaks)

---
*Research completed: 2026-05-02*
