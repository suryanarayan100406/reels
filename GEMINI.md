<!-- GSD:project-start source:PROJECT.md -->
## Project

**If You Ever Wondered**

A hand-curated Instagram reel gallery built as a surprise gift for someone special ("Mrs Mansu"). The site is a cozy, cat-themed personal website where the creator ("Silent Admirer" / @exotic.suryaa_) can share Instagram reels he enjoys, each with a personal note attached. The viewer can browse beautifully presented reels, watch them inline via embedded Instagram player, and react with ❤️ — all without needing an Instagram account. Mobile-first, designed to be opened from a WhatsApp link.

**Core Value:** She opens a link and immediately feels warmth — every reel she sees was personally chosen for her, with a note that says why. The experience must feel like a gift, not an app.

### Constraints

- **Tech Stack**: React + TailwindCSS (frontend), Node.js + Express (backend) — user specified
- **API Limitation**: Instagram Graph API does not expose home feed or saved posts. Content must be manually curated via admin panel.
- **Instagram Account**: @exotic.suryaa_ needs to be converted to Business/Creator account before Graph API access works
- **Deployment**: Must be deployment-ready for Vercel (frontend) or Railway (backend). Include .env.example.
- **No Login for Viewer**: Site is publicly accessible — no authentication for the person viewing it
- **Privacy**: Access token and admin credentials must never be exposed to the frontend
<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->
## Technology Stack

## Recommended Stack (2026)
### Frontend
| Technology | Version | Rationale | Confidence |
|-----------|---------|-----------|------------|
| **React** | 19.x | User-specified. Mature ecosystem, great for component-based gallery UI | High |
| **Vite** | 6.x | Fast dev server, HMR, production builds. Standard React bundler in 2026 | High |
| **TailwindCSS** | 4.x | User-specified. Utility-first CSS, excellent for rapid responsive design | High |
| **Framer Motion** | 12.x | Smooth fade-in animations on scroll, lightbox transitions. Industry standard for React animations | High |
| **React Router** | 7.x | Client-side routing for public gallery vs admin panel | High |
### Backend
| Technology | Version | Rationale | Confidence |
|-----------|---------|-----------|------------|
| **Node.js** | 22.x LTS | User-specified. Stable, mature runtime | High |
| **Express** | 4.x | User-specified. Simple, battle-tested HTTP server | High |
| **better-sqlite3** | 11.x | Lightweight, zero-config, ACID-compliant. Perfect for small CRUD apps (reels, reactions). No external DB needed | High |
| **bcrypt** | 5.x | Password hashing for admin panel authentication | High |
| **express-session** | 1.x | Session management for admin auth. Simple, well-documented | High |
| **cors** | 2.x | Cross-origin requests between Vite dev server and Express | High |
| **dotenv** | 16.x | Environment variable management (.env files) | High |
| **helmet** | 8.x | Security headers for Express | High |
### Instagram Integration
| Technology | Rationale | Confidence |
|-----------|-----------|------------|
| **Instagram oEmbed API** | Official Meta API for embedding public Instagram content. Returns HTML embed code for reels. No Instagram account type requirement for public embeds | High |
| **Meta App Access Token** | Required for oEmbed API calls. App-level token, not user-level | High |
### What NOT to Use
| Technology | Why Not |
|-----------|---------|
| Instagram Basic Display API | Deprecated December 2024. Fully retired. |
| Instagram Graph API (for feed) | Does NOT expose home feed or saved posts. Only own content. |
| MongoDB/PostgreSQL | Overkill for ~100 reels and reactions. SQLite is perfect here. |
| NextJS | Overkill. Simple Vite + Express is cleaner for this scope. |
| Firebase | Adds external dependency. SQLite keeps everything self-contained. |
| lowdb | Less reliable than SQLite for concurrent writes (admin + viewer reactions). |
## Key Insight: oEmbed Thumbnail Removal (Nov 2025)
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.agent/skills/`, `.agents/skills/`, `.cursor/skills/`, or `.github/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
