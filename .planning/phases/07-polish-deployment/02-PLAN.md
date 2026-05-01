---
nyquist_compliant: true
wave: 1
depends_on: []
files_modified:
  - client/src/components/gallery/ReelCard.jsx
  - client/index.html
autonomous: true
---

# Phase 7: Polish & Deployment - Plan 02 (Animations & Scroll)

## Task 1: Implement Scroll Fade-In
<read_first>
- client/src/components/gallery/ReelCard.jsx
</read_first>
<action>
1. Update `ReelCard.jsx`.
2. Change the outermost `div` wrapper to a `<motion.div>` from `framer-motion`.
3. Apply animation props: `initial={{ opacity: 0, y: 30 }}` and `whileInView={{ opacity: 1, y: 0 }}`.
4. Set `viewport={{ once: true, margin: "-50px" }}` to trigger when it scrolls into view.
5. Set `transition={{ duration: 0.6, ease: "easeOut" }}`.
</action>
<acceptance_criteria>
- Reel cards fade and slide up gracefully as the user scrolls down the page.
</acceptance_criteria>

## Task 2: Smooth Scrolling
<read_first>
- client/index.html
</read_first>
<action>
1. Update `client/index.html`.
2. Add the `scroll-smooth` class to the `<html>` tag to enable native smooth scrolling behavior across the app.
</action>
<acceptance_criteria>
- The HTML document supports smooth scrolling behavior.
</acceptance_criteria>
