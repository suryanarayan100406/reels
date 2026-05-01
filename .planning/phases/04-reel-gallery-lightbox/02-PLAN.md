---
nyquist_compliant: true
wave: 2
depends_on: ["01-PLAN.md"]
files_modified:
  - client/index.html
  - client/src/components/gallery/Lightbox.jsx
  - client/src/components/gallery/Gallery.jsx
autonomous: true
---

# Phase 4: Reel Gallery & Lightbox - Plan 02 (Lightbox & Player)

## Task 1: Add Instagram Script
<read_first>
- client/index.html
</read_first>
<action>
1. Add the Instagram embed script to the `<head>` of `client/index.html` to ensure `window.instgrm` is available globally.
   - `<script async src="//www.instagram.com/embed.js"></script>`
</action>
<acceptance_criteria>
- `index.html` includes the Instagram embed script.
</acceptance_criteria>

## Task 2: Create Lightbox Component
<read_first>
- client/src/components/gallery/Lightbox.jsx
</read_first>
<action>
1. Create `client/src/components/gallery/Lightbox.jsx`.
2. Props: `reel`, `onClose`.
3. Use `useEffect` to handle body scroll locking (`document.body.style.overflow = 'hidden'`, cleanup to `''`).
4. Use `useEffect` to trigger Instagram script: `if (window.instgrm) { window.instgrm.Embeds.process(); }` whenever `reel.embed_html` changes.
5. Render:
   - Overlay: `<div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm" onClick={onClose}>`
   - Close Button: `<button className="absolute top-4 right-4 md:top-6 md:right-6 text-white/70 hover:text-white transition-colors" onClick={onClose}><X size={32} /></button>` (import `X` from `lucide-react`).
   - Modal Container: `<div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>`
   - Embed Container: `<div className="w-full flex justify-center bg-gray-50 pt-4" dangerouslySetInnerHTML={{ __html: reel.embed_html }} />`
   - Note Container: `<div className="p-6 md:p-8 bg-warm-cream/30">`
     - `<p className="text-charcoal whitespace-pre-wrap leading-relaxed">{reel.personal_note}</p>`
</action>
<acceptance_criteria>
- Lightbox locks body scrolling.
- Automatically processes Instagram embeds upon mounting.
- Displays full note with line breaks.
- Modal closes on backdrop click or X button.
</acceptance_criteria>

## Task 3: Connect Lightbox to Gallery
<read_first>
- client/src/components/gallery/Gallery.jsx
</read_first>
<action>
1. Update `client/src/components/gallery/Gallery.jsx`:
   - Import `Lightbox`.
   - Add state `const [selectedReel, setSelectedReel] = useState(null)`.
   - In the `ReelCard` map, pass `onClick={() => setSelectedReel(reel)}`.
   - Below the grid container, render `{selectedReel && <Lightbox reel={selectedReel} onClose={() => setSelectedReel(null)} />}`.
</action>
<acceptance_criteria>
- Clicking a card correctly opens the Lightbox with the selected reel.
- Modal state is managed correctly inside the Gallery component.
</acceptance_criteria>
