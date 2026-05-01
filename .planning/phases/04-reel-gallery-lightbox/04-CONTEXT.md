# Phase 4: Reel Gallery & Lightbox - UI Context & Decisions

## Design System Application
- **Grid Layout:** 
  - Mobile: 1 column (`grid-cols-1`)
  - Tablet: 2 columns (`md:grid-cols-2`)
  - Desktop: 3 columns (`lg:grid-cols-3`)
  - Gap: Generous spacing (`gap-6` or `gap-8`) to maintain the airy, cozy feel.
- **Card Aesthetics:**
  - Background: White or very light version of cream (`bg-white` with low opacity or solid white).
  - Borders: None.
  - Shadow: Soft, diffused shadow (`shadow-sm`).
  - Corners: Fully rounded (`rounded-2xl`).
  - Hover Effect: Slight lift (`-translate-y-1`) and a soft warm glow (`shadow-[0_8px_30px_rgb(193,127,92,0.15)]` matching the terracotta color).
- **Typography in Cards:**
  - Note: `text-charcoal/80`, truncated to ~3 lines using `line-clamp-3`.
  - "Read more": Italicized, smaller, `text-dusty-rose`.
- **Lightbox Aesthetics:**
  - Overlay: Dark with slight transparency (`bg-black/80`).
  - Container: Centered, max-width appropriate for phone aspect ratio video.
  - Close Button: Prominent ✕ in the top right, floating above the overlay.
  - Full Note: Displayed below the video with `whitespace-pre-wrap` to preserve line breaks, `text-white/90` or `text-warm-cream`.

## Component Strategy
- **`ReelGrid`**: Container fetching the reels and handling the mapping.
- **`ReelCard`**: Individual item. Needs to emit click events to open the lightbox.
- **`Lightbox`**: A React Portal or fixed overlay managing the selected reel.
- **Instagram Embed**: Safely inject the `embed_html` saved in the database. Wait for the Instagram script to process it.
