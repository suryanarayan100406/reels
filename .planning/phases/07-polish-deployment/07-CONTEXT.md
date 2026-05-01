# Phase 7: Polish & Deployment - Context & Decisions

## Design & Architecture
- **UX States:**
  - **Loading:** Implement a custom cat-themed loading animation (e.g., bouncing paw or simple CSS cat shape) for the Gallery component.
  - **Empty:** When no reels are fetched, display a friendly message: "Nothing here yet... 🐱" with a subtle illustration/icon.
  - **Error:** If `/api/reels` fails, display a cat-themed error message.
- **Animations:**
  - Leverage `framer-motion` (already in `package.json`) to implement scroll-based fade-up animations on `ReelCard` components using `whileInView`.
  - Add smooth scrolling to `html` tag via Tailwind's `scroll-smooth` or CSS.
- **Infrastructure:**
  - Create `server/.env.example` to document required env variables (`SESSION_SECRET`, `IG_APP_ID`, `IG_APP_SECRET`).
  - Create `README.md` at the project root with instructions for setting up the backend, frontend, and obtaining the Meta App Access Token for the oEmbed API.
