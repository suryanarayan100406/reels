# Phase 3: Frontend Foundation & Hero - UI Context & Decisions

## Design System
- **Primary Fonts:**
  - Headers: `Playfair Display` (serif, elegant)
  - Body: `DM Sans` (sans-serif, clean and legible)
- **Color Palette:**
  - Background: Warm Cream (`#F5EFE6`)
  - Accent/Primary: Terracotta (`#C17F5C`)
  - Secondary: Dusty Rose (`#C9A0A0`)
  - Text: Charcoal (`#2E2E2E`)
- **Aesthetic Identity:** "Cat Lover" theme. Subtle, warm, personal, and cozy. Not overly saturated or noisy.

## Layout & Components
- **Hero Section:**
  - Large, elegant title: "If You Ever Wondered"
  - Editable personal message (fetched from API, or static fallback)
  - Branding: "curated by Silent Admirer" (small, tasteful italic)
  - Background: Low opacity SVG paw print pattern or watermark.
- **Decorative Elements:**
  - Dividers: Paw print icons.
  - Favicon: Cat-ear silhouette.
- **Footer:** "Made with 🐾 for Mrs Mansu"

## Technical Decisions
- **Framework:** React + Vite
- **Styling:** TailwindCSS v4
- **Routing:** React Router v7 (for separating public gallery from admin routes later)
- **Animations:** Framer Motion (fade-ins, soft interactions)
