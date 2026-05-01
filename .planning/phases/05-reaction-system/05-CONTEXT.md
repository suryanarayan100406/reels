# Phase 5: Reaction System - UI Context & Decisions

## Design System Application
- **Heart Button:**
  - Placed inside the `ReelCard` component. Best positioned in the top-right corner over the thumbnail image, or next to the "read more" text.
  - Let's place it overlaying the thumbnail top-right corner to save space and look elegant.
  - Background: A small circular frosted glass backdrop (`bg-white/50 backdrop-blur-md`).
  - Icon: `Heart` from `lucide-react`.
  - Inactive State: Outline only, `text-charcoal/70`.
  - Active State: Filled heart, `fill-terracotta text-terracotta` with a subtle scale-up animation on click (`active:scale-125`).
- **Interaction:**
  - Clicking the heart must *not* trigger the lightbox overlay. We must use `e.stopPropagation()` on the heart button `onClick`.

## Visitor Tracking
- Since there is no user login, we will track users via a persistent `visitor_id` stored in `localStorage`.
- We'll generate a random UUID on their first visit.
- This maintains the privacy and zero-friction requirement while fulfilling REACT-03 and REACT-04.
