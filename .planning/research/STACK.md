# Stack Research: If You Ever Wondered

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

As of November 2025, Meta **removed** `thumbnail_url`, `thumbnail_width`, `thumbnail_height`, `author_name`, and `author_url` from oEmbed responses. We must generate our own thumbnails by scraping the Instagram post's HTML metadata (Open Graph `og:image` tag) or storing a custom thumbnail URL when the admin adds a reel.

**Mitigation:** When admin pastes a reel URL, backend fetches the page's `og:image` meta tag as the thumbnail. Store it in SQLite alongside the reel data.
