# Phase 7: Polish & Deployment - Technical Research

**Goal:** Add animations, loading/error/empty states, final responsive tweaks, and deployment configuration.

## Domain Analysis

### 1. Framer Motion Scroll Animations
- To trigger animations when an element enters the viewport, `framer-motion` provides the `whileInView` prop on `<motion.div>`.
- Example: `<motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5 }}>`
- This is highly performant and requires no manual IntersectionObserver setup.

### 2. Loading & Empty States
- The `Gallery.jsx` component currently has basic placeholder states. We need to replace them with visually appealing components (`LoadingCat`, `EmptyCat`, `ErrorCat`).
- Lucide React has a `Cat` icon we can animate for the loading state (e.g., pulsing or spinning).

### 3. Smooth Scrolling
- Appending `scroll-smooth` to the `html` or `body` tag ensures internal anchor links scroll smoothly. We can add this to `index.html` or `AppLayout.jsx`.

### 4. Deployment Assets
- We need a `README.md` that explains:
  1. Frontend setup (`cd client && npm install && npm run dev`)
  2. Backend setup (`cd server && npm install && npm start`)
  3. Environment variables.
  4. How to set up an Instagram App in Meta Developers to get the oEmbed token.
- We need a `.env.example` in `server/`.
