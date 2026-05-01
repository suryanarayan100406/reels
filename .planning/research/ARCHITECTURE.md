# Architecture Research: If You Ever Wondered

## System Overview

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (React + Vite)               │
│                                                          │
│  ┌──────────┐  ┌──────────────┐  ┌───────────────────┐  │
│  │   Hero   │  │  Reel Gallery │  │   Admin Panel     │  │
│  │ Section  │  │  + Lightbox   │  │   (Protected)     │  │
│  └──────────┘  └──────┬───────┘  └────────┬──────────┘  │
│                        │                    │             │
│                   GET /api/reels      POST /api/reels    │
│                   POST /api/react     GET /api/reactions  │
│                                       POST /api/login    │
└────────────────────────┼────────────────────┼────────────┘
                         │                    │
                    ┌────▼────────────────────▼────┐
                    │     BACKEND (Express)         │
                    │                               │
                    │  ┌─────────────┐              │
                    │  │  Auth       │ bcrypt +     │
                    │  │  Middleware  │ sessions     │
                    │  └─────────────┘              │
                    │                               │
                    │  ┌─────────────┐  ┌────────┐  │
                    │  │  Reel       │  │ oEmbed │  │
                    │  │  Controller │──│ Service│  │
                    │  └──────┬──────┘  └────────┘  │
                    │         │                     │
                    │  ┌──────▼──────┐              │
                    │  │   SQLite    │              │
                    │  │   Database  │              │
                    │  └─────────────┘              │
                    └───────────────────────────────┘
                              │
                    ┌─────────▼──────────┐
                    │  Instagram oEmbed  │
                    │  API (Meta)        │
                    └────────────────────┘
```

## Component Boundaries

### Frontend Components

| Component | Responsibility | Dependencies |
|-----------|---------------|-------------|
| **Hero** | Title, personal message, branding | None — self-contained |
| **ReelGrid** | Fetches and displays reel cards in responsive grid | API service, ReelCard |
| **ReelCard** | Individual reel thumbnail + truncated note + ❤️ button | ReelModal (on click) |
| **ReelModal** | Lightbox overlay with embedded Instagram player + full note | Instagram embed script |
| **AdminLayout** | Protected route wrapper, navigation | Auth context |
| **AdminReelForm** | Add/edit reel form (URL input + note textarea) | API service |
| **AdminReelList** | Table of curated reels with edit/delete + reaction counts | API service |
| **AdminLogin** | Password input form | Auth context |
| **LoadingCat** | Animated cat loading indicator | None |
| **EmptyState** | Cute cat illustration + message | None |
| **ErrorState** | Cat-themed error message | None |

### Backend Components

| Component | Responsibility | Dependencies |
|-----------|---------------|-------------|
| **Auth middleware** | Validates admin session on protected routes | express-session, bcrypt |
| **Reel routes** | CRUD endpoints for reels | Reel controller |
| **Reel controller** | Business logic for reel operations | SQLite, oEmbed service |
| **oEmbed service** | Fetches embed HTML + extracts thumbnail from Instagram | Meta oEmbed API, HTML parser |
| **Reaction routes** | POST/GET reactions | SQLite |
| **Database** | SQLite schema + queries | better-sqlite3 |

## Data Flow

### Adding a Reel (Admin)
```
1. Admin pastes Instagram reel URL in form
2. Frontend POST /api/reels { url, note }
3. Backend validates URL format (instagram.com/reel/...)
4. Backend calls Instagram oEmbed API → gets embed HTML
5. Backend fetches reel page → extracts og:image for thumbnail
6. Backend stores { url, embed_html, thumbnail_url, note, created_at } in SQLite
7. Returns success → Admin sees new reel in list
```

### Viewing Reels (Public)
```
1. Page loads → GET /api/reels
2. Backend queries SQLite → returns array of reels (thumbnail, note, id)
3. Frontend renders card grid with thumbnails + truncated notes
4. User clicks card → modal opens
5. Modal injects embed HTML → Instagram embed.js processes it → video plays
```

### Reacting to a Reel (Public)
```
1. User taps ❤️ on reel card
2. Frontend POST /api/reactions { reel_id }
3. Backend stores reaction with fingerprint (localStorage ID) to prevent duplicates
4. Returns updated reaction status
5. Frontend toggles ❤️ to filled state
```

## Database Schema

```sql
-- Curated reels
CREATE TABLE reels (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    instagram_url TEXT NOT NULL UNIQUE,
    embed_html TEXT,
    thumbnail_url TEXT,
    personal_note TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Viewer reactions
CREATE TABLE reactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    reel_id INTEGER NOT NULL REFERENCES reels(id) ON DELETE CASCADE,
    visitor_id TEXT NOT NULL, -- localStorage-based fingerprint
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(reel_id, visitor_id)
);

-- Admin credentials (single user)
CREATE TABLE admin (
    id INTEGER PRIMARY KEY,
    password_hash TEXT NOT NULL
);

-- Site content (hero message, etc.)
CREATE TABLE site_content (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Suggested Build Order

1. **Backend foundation** — Express server, SQLite setup, database schema
2. **Admin auth** — Login route, session middleware, password hashing
3. **Reel CRUD API** — Add/edit/delete reels with oEmbed integration
4. **Frontend foundation** — Vite + React + TailwindCSS + routing
5. **Hero section** — Landing page with cat theme
6. **Reel gallery** — Card grid + API integration
7. **Lightbox modal** — Instagram embed player
8. **Reaction system** — ❤️ toggle + API
9. **Admin panel UI** — Forms, reel management, reaction dashboard
10. **Polish** — Animations, loading states, error states, responsive tweaks

## Deployment Architecture

```
Production:
├── Frontend (Vercel) → Static React build
│   └── API calls proxy to backend URL (env var)
└── Backend (Railway) → Express + SQLite
    └── SQLite file persisted on Railway volume
```
