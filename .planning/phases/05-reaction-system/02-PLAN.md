---
nyquist_compliant: true
wave: 2
depends_on: ["01-PLAN.md"]
files_modified:
  - client/src/utils/visitor.js
  - client/src/components/gallery/Gallery.jsx
  - client/src/components/gallery/ReelCard.jsx
autonomous: true
---

# Phase 5: Reaction System - Plan 02 (Frontend Hearts)

## Task 1: Visitor ID Utility
<read_first>
</read_first>
<action>
1. Create `client/src/utils/visitor.js`.
2. Implement and export `getVisitorId()`.
   - Checks `localStorage.getItem('visitor_id')`.
   - If missing, generates a UUID using `crypto.randomUUID()`, saves it to localStorage, and returns it.
</action>
<acceptance_criteria>
- Utility generates and persists UUID reliably.
</acceptance_criteria>

## Task 2: Pass Visitor ID to Gallery Fetch
<read_first>
- client/src/components/gallery/Gallery.jsx
</read_first>
<action>
1. Import `getVisitorId` in `Gallery.jsx`.
2. Update the `fetch` call in `useEffect`:
   ```javascript
   const vid = getVisitorId();
   fetch(`/api/reels?visitor_id=${vid}`)
   ```
3. Remove the frontend sorting logic since the backend `GET /api/reels` now returns them sorted by `created_at DESC` (from Wave 1). Just use `setReels(data)`.
</action>
<acceptance_criteria>
- Gallery passes `visitor_id` to API.
- Sorting logic relies on the backend.
</acceptance_criteria>

## Task 3: Implement Heart Button in ReelCard
<read_first>
- client/src/components/gallery/ReelCard.jsx
</read_first>
<action>
1. Import `getVisitorId` and `Heart` from `lucide-react`.
2. Update `ReelCard.jsx` to manage its own optimistic state for reactions:
   ```javascript
   const [reacted, setReacted] = useState(reel.has_reacted);
   ```
3. Create `handleReact(e)` function:
   - Call `e.stopPropagation()` to prevent opening the lightbox.
   - Optimistically toggle `setReacted(!reacted)`.
   - Call `fetch('/api/reels/' + reel.id + '/react', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ visitor_id: getVisitorId() }) })`.
   - If fetch fails, revert state.
4. Render the button inside the root `div` (with `absolute top-3 right-3 z-10` positioning):
   - Button class: `p-2 rounded-full backdrop-blur-md transition-all duration-300 ${reacted ? 'bg-white shadow-sm scale-110' : 'bg-white/50 hover:bg-white/80'}`
   - Heart class: `${reacted ? 'fill-terracotta text-terracotta' : 'text-charcoal/70'}`
</action>
<acceptance_criteria>
- Heart button is rendered overlaying the top right of the thumbnail.
- Clicking the heart triggers the API and updates state optimistically.
- `stopPropagation` prevents lightbox from opening.
</acceptance_criteria>
