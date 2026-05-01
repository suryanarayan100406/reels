# Phase 3: Frontend Foundation & Hero - Technical Research

**Goal:** Scaffold React + Vite + TailwindCSS frontend with the cat lover design system and build the hero/landing section.

## Domain Analysis
This phase sets up the frontend infrastructure and implements the core aesthetic identity of the project.

### Technical Challenges & Patterns

#### 1. Project Scaffolding
- We will initialize the frontend in a `client/` directory alongside the `server/` directory.
- **Stack:** Vite + React.
- **Command:** `npx create-vite@latest client --template react` (or similar)
- **Dependencies:** 
  - `tailwindcss` v4 (with Vite plugin)
  - `react-router` (or `react-router-dom`)
  - `framer-motion`
  - `lucide-react` (for paw print and heart icons)

#### 2. TailwindCSS Configuration
- The user specified the new Tailwind v4. We need to follow Vite + Tailwind v4 setup.
- Since Tailwind v4 handles configuration primarily in CSS rather than `tailwind.config.js`, we will set up `@theme` blocks in the main CSS file for the custom color palette:
```css
@import "tailwindcss";

@theme {
  --color-warm-cream: #F5EFE6;
  --color-terracotta: #C17F5C;
  --color-dusty-rose: #C9A0A0;
  --color-charcoal: #2E2E2E;
  --font-serif: "Playfair Display", serif;
  --font-sans: "DM Sans", sans-serif;
}
```

#### 3. Font Integration
- We will import `Playfair Display` and `DM Sans` from Google Fonts in `index.html`.

#### 4. SVG Background & Favicon
- We need an SVG paw print background (low opacity) that covers the entire site. We can achieve this with a repeating `background-image` or a fixed `div` with pointer-events disabled.
- The favicon needs to be updated to a cat-ear icon.

#### 5. API Integration (Hero Message)
- The editable hero message requires a backend call to fetch `site_content` table data, specifically the key `hero_message`.
- We need to create a simple proxy in Vite to route `/api` to `http://localhost:3000`.
- If the API fails or hasn't returned yet, we should show a skeleton loader or a fallback message.

## Implementation Path
1. **Initialize App:** Scaffold Vite React app in `client/`.
2. **Install Deps:** `tailwindcss`, `@tailwindcss/vite`, `react-router-dom`, `framer-motion`, `lucide-react`.
3. **Configure Vite & Tailwind:** Update `vite.config.js` for Tailwind v4 plugin and API proxy. Update `index.css` with theme variables.
4. **Layout Component:** Create an `AppLayout` wrapper that includes the background pattern and footer.
5. **Hero Component:** Create the Hero section with elegant typography, the fetched message, and the branding text.
6. **Favicon:** Add a cat-themed SVG favicon to `public/`.
