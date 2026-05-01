---
nyquist_compliant: true
wave: 1
depends_on: []
files_modified:
  - client/src/components/gallery/ReelCard.jsx
  - client/src/components/gallery/Gallery.jsx
  - client/src/App.jsx
autonomous: true
---

# Phase 4: Reel Gallery & Lightbox - Plan 01 (Grid & Cards)

## Task 1: Create Reel Card Component
<read_first>
</read_first>
<action>
1. Create `client/src/components/gallery/ReelCard.jsx`.
2. Component receives `reel` and `onClick` as props.
3. Root element: `<div onClick={onClick} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-[0_8px_30px_rgb(193,127,92,0.15)] hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full border border-warm-cream/50">`
4. Image section: Render an `<img>` with `src={reel.thumbnail_url}`. If missing, render a fallback colored box. ClassName: `w-full aspect-[4/5] object-cover bg-warm-cream/50`.
5. Content section:
   - Container: `<div className="p-5 flex flex-col flex-grow">`
   - Note text: `<p className="text-charcoal/80 text-sm leading-relaxed line-clamp-3 mb-2 flex-grow whitespace-pre-wrap">{reel.personal_note}</p>`
   - Read more: `<span className="text-dusty-rose text-xs italic font-medium">read more</span>`
</action>
<acceptance_criteria>
- `ReelCard` component correctly renders the thumbnail and truncated note.
- CSS classes match the rounded corners, soft shadows, and hover effects from the requirements.
</acceptance_criteria>

## Task 2: Create Gallery Grid Component
<read_first>
- client/src/components/gallery/Gallery.jsx
</read_first>
<action>
1. Create `client/src/components/gallery/Gallery.jsx`.
2. Use `useState` for `reels` and `loading`.
3. Use `useEffect` to fetch from `/api/reels`. Sort the received data by `created_at` descending (`new Date(b.created_at) - new Date(a.created_at)`). Set state.
4. Render:
   - Container: `<section className="w-full max-w-6xl mx-auto pb-24 px-4">`
   - If loading, render `<p className="text-center text-charcoal/50">Loading...</p>`.
   - Grid: `<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">`
   - Map over `reels` and render `<ReelCard key={reel.id} reel={reel} onClick={() => {}} />`.
</action>
<acceptance_criteria>
- Fetches from backend API and sorts chronologically descending.
- Grid is responsive (1, 2, 3 columns).
- Maps over the reels correctly.
</acceptance_criteria>

## Task 3: Integrate Gallery into App
<read_first>
- client/src/App.jsx
</read_first>
<action>
1. Update `client/src/App.jsx`:
   - Import `Gallery` from `./components/gallery/Gallery`.
   - Render `<Gallery />` below the `<Hero />` inside the `<AppLayout>`.
</action>
<acceptance_criteria>
- Gallery is mounted in the main App layout below the Hero section.
</acceptance_criteria>
