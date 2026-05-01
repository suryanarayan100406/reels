# If You Ever Wondered

## What This Is

A hand-curated Instagram reel gallery built as a surprise gift for someone special ("Mrs Mansu"). The site is a cozy, cat-themed personal website where the creator ("Silent Admirer" / @exotic.suryaa_) can share Instagram reels he enjoys, each with a personal note attached. The viewer can browse beautifully presented reels, watch them inline via embedded Instagram player, and react with ❤️ — all without needing an Instagram account. Mobile-first, designed to be opened from a WhatsApp link.

## Core Value

She opens a link and immediately feels warmth — every reel she sees was personally chosen for her, with a note that says why. The experience must feel like a gift, not an app.

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->

(None yet — ship to validate)

### Active

<!-- Current scope. Building toward these. -->

- [ ] Hero section with "If You Ever Wondered" title, editable personal message, and "curated by Silent Admirer" branding
- [ ] Cat lover aesthetic — warm cream/dusty rose/terracotta palette, paw prints, cat silhouettes, whimsical decorative elements
- [ ] Password-protected admin panel for the curator
- [ ] Admin can paste Instagram reel URLs to add to the collection
- [ ] Admin can add a personal note/caption to each reel (e.g., "this reminded me of you")
- [ ] Admin can manage (edit/delete) curated reels
- [ ] Admin can see which reels she ❤️ reacted to
- [ ] Public gallery displays curated reels in a card grid (3-col desktop, 1-col mobile)
- [ ] Each card shows reel thumbnail and truncated personal note
- [ ] Clicking a card opens a lightbox modal with embedded Instagram player
- [ ] Full personal note visible in lightbox with line breaks preserved
- [ ] Viewer can tap ❤️ on reels she likes (reactions persisted)
- [ ] Mobile-first responsive design optimized for WhatsApp link opens
- [ ] Smooth fade-in animations on scroll
- [ ] Cat-ear favicon and "If You Ever Wondered" browser tab title
- [ ] Footer: "Made with 🐾 for Mrs Mansu"
- [ ] Empty state with cute cat illustration + friendly message
- [ ] Error state with cat-themed friendly error message
- [ ] Backend proxies all Instagram API calls (never exposes tokens to frontend)
- [ ] Instagram oEmbed API integration for fetching reel embed data/thumbnails
- [ ] Environment variable configuration for deployment (.env.example provided)

### Out of Scope

- Instagram home feed integration — API does not expose user's feed content
- Instagram saved posts integration — API does not expose saved collections
- Fetching content from specific Instagram accounts — not desired
- Engagement metrics (like/comment counts from Instagram) — she avoids social media, metrics would feel wrong
- Photo carousel support — reels/video only
- Category/tag filtering — single scrollable feed
- Background music/ambient audio — too much
- User authentication for viewer — no login required, publicly accessible
- Real-time notifications — one-way sharing experience
- Instagram Highlights — not applicable since content is curated, not from own profile

## Context

- **Recipient**: Mansi ("Mrs Mansu" on site) — Surya's girl best friend. Romantic from his side only.
- **Surprise**: She doesn't know about this. Will receive the link via WhatsApp.
- **Social media stance**: She actively avoids social media as distractive, has no social media presence. The UI must NOT feel like a social media app — more like a curated personal gallery or digital gift.
- **Tone**: Warm, thoughtful, subtle. "I made this just for you" energy without being heavy or overtly romantic. The cat theme carries the playfulness naturally.
- **Creator's Instagram**: @exotic.suryaa_ (will convert to Business/Creator account for Graph API access)
- **Content source**: Curator manually pastes Instagram reel URLs he finds and enjoys, adds personal notes. This is intentionally curated — every reel she sees was hand-picked.
- **Primary access**: Mobile browser via WhatsApp link. Must be optimized for this flow.

## Constraints

- **Tech Stack**: React + TailwindCSS (frontend), Node.js + Express (backend) — user specified
- **API Limitation**: Instagram Graph API does not expose home feed or saved posts. Content must be manually curated via admin panel.
- **Instagram Account**: @exotic.suryaa_ needs to be converted to Business/Creator account before Graph API access works
- **Deployment**: Must be deployment-ready for Vercel (frontend) or Railway (backend). Include .env.example.
- **No Login for Viewer**: Site is publicly accessible — no authentication for the person viewing it
- **Privacy**: Access token and admin credentials must never be exposed to the frontend

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Manual reel curation via admin panel instead of API feed | Instagram API doesn't expose home feed or saved posts. Manual curation is actually more meaningful — every reel is hand-picked. | — Pending |
| Instagram oEmbed API for reel embedding | Official, reliable, no token needed for public embeds. Plays video inline on the site. | — Pending |
| No viewer authentication | She should just open the link and see content. Zero friction. It's a gift, not a product. | — Pending |
| "Silent Admirer" / "Mrs Mansu" naming | Keeps identity subtle — romantic without being direct. She'll recognize "Mansu" as her nickname. | — Pending |
| Cat Lover aesthetic theme | Matches her personality — warm, playful, cozy. Not childish — "aesthetic Pinterest cat lover" energy. | — Pending |
| ❤️ reaction system (one-way feedback) | Lets her silently express what she liked. He can see from admin. Subtle two-way connection. | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-02 after initialization*
