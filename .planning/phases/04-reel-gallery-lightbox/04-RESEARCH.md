# Phase 4: Reel Gallery & Lightbox - Technical Research

**Goal:** Display curated reels in a responsive card grid. Clicking a card opens a lightbox modal with embedded Instagram player and full personal note.

## Domain Analysis
This phase implements the core viewing experience: a grid of cards that open an embedded Instagram player.

### Technical Challenges & Patterns

#### 1. Instagram Embed Execution
- The Instagram oEmbed API returns an HTML block including a `<script async src="//www.instagram.com/embed.js"></script>`.
- When injected into a React component using `dangerouslySetInnerHTML`, the script tag is **not executed** by default.
- **Solution:** We must manually trigger Instagram's processing function. The script creates `window.instgrm.Embeds.process()`. We should load the script once in `index.html` or dynamically in `useEffect`, and then call `window.instgrm?.Embeds?.process()` every time a lightbox opens with a new embed.

#### 2. Lightbox / Modal Architecture
- A portal is ideal for a modal (`createPortal`), or a simple absolute/fixed positioned element at the root of the app.
- State management: `selectedReel` state in a parent component (e.g., `Gallery`) that is passed to the `Lightbox`. If `selectedReel` is null, the lightbox is hidden.
- Close on click outside: We can add an `onClick` to the backdrop overlay that sets `selectedReel` to null, while `stopPropagation()` on the modal content itself prevents it from closing when interacting with the post.
- Body scroll locking: When the lightbox is open, we should add `overflow: hidden` to the body to prevent background scrolling.

#### 3. Image Optimization & Layout
- Card thumbnails: The `thumbnail_url` from the backend should cover the top half of the card. Use `aspect-video` or `aspect-[4/5]` with `object-cover`.
- CSS Line Clamp: To truncate the text to 3 lines, we use Tailwind's `line-clamp-3`.

#### 4. Fetching Data
- Endpoint: `GET /api/reels` returns all reels.
- Since `REEL-12` requires ordering by most recently added first, we must ensure the backend or frontend sorts by `created_at DESC`. Let's check if the backend does this. If not, sort in the frontend: `data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))`.

## Implementation Path
1. **API Integration:** Create a `useFetchReels` hook or `useEffect` block in a `Gallery` component.
2. **Card Grid Component:** Implement responsive CSS grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`).
3. **Reel Card Component:** Render thumbnail, truncated note, and apply hover effects.
4. **Lightbox Component:** Fixed overlay, injects `embed_html`, calls `instgrm.Embeds.process()`, displays full note.
5. **Instagram Script Injection:** Add the Instagram embed script to `index.html` to ensure `window.instgrm` is available.
