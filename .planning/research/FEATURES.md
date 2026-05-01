# Features Research: If You Ever Wondered

## Feature Categories

### Table Stakes (Must Have — Users Expect These)

#### Hero / Landing Experience
- **Warm welcome page** — Title, personal message, branding. First impression = everything.
- **Mobile-optimized layout** — She opens from WhatsApp. Must look perfect on phone.
- **Fast load time** — Under 3 seconds or she might close it.

#### Reel Gallery
- **Card grid display** — Thumbnail + personal note for each curated reel.
- **Responsive grid** — 1 column mobile, 2-3 columns desktop.
- **Lightbox/modal player** — Click to watch reel inline via Instagram embed.
- **Full caption in modal** — Personal note with line breaks preserved.
- **Smooth scroll** — No jarring page jumps.

#### Admin Panel
- **Password-protected access** — Only the curator can add content.
- **Add reel via URL** — Paste Instagram reel link → backend processes it.
- **Add personal note** — Free-text field for each reel.
- **Edit/delete reels** — Manage the collection.
- **View reactions** — See which reels she ❤️'d.

#### Reaction System
- **❤️ button on reels** — Simple, single-action. No account needed.
- **Reaction persistence** — Stored server-side, survives page refresh.

### Differentiators (Competitive Advantage / Delight)

- **Scroll fade-in animations** — Reels appear with gentle animation as you scroll.
- **Cat-themed loading state** — Animated cat while content loads.
- **Paw print decorative elements** — Background patterns, section dividers.
- **Hover effects on cards** — Subtle lift + warm glow on desktop.
- **Empty state illustration** — Cute cat + "Nothing here yet... 🐱" message.
- **Error state personality** — Cat meme–style message if something fails.
- **"Recently added" indicator** — Subtle badge on new reels (optional, nice touch).
- **Personal note reveal** — Note partially hidden on card, expands on hover/tap.

### Anti-Features (Do NOT Build)

| Feature | Why Not |
|---------|---------|
| Infinite scroll | She avoids social media. Don't replicate dopamine loops. |
| Like/comment counts from Instagram | Feels like social media metrics. Against the vibe. |
| User accounts / login for viewer | Zero friction. It's a gift, not a product. |
| Search/filter | Small curated collection doesn't need discovery tools. |
| Share buttons | This is private, between two people. |
| Push notifications | Intrusive. She opens when she wants. |
| Dark mode toggle | Single cohesive warm aesthetic. No choices needed. |

## Feature Dependencies

```
Admin Panel (add reels) → Reel Gallery (display reels)
Reel Gallery (display reels) → Lightbox Modal (play reels)
Reel Gallery (display reels) → Reaction System (❤️ on reels)
Admin Panel (view reactions) ← Reaction System (store reactions)
Hero Section → independent (no dependencies)
```

## Complexity Assessment

| Feature | Complexity | Notes |
|---------|-----------|-------|
| Hero section | Low | Static content, CSS styling |
| Admin auth | Medium | Password hashing, session management |
| Reel CRUD | Medium | URL validation, thumbnail extraction, SQLite |
| Instagram embed | Medium | oEmbed API + script injection in React |
| Reaction system | Low | Simple POST endpoint + SQLite toggle |
| Animations | Low | Framer Motion or CSS transitions |
| Cat-themed design | Medium | Custom SVGs, careful aesthetic work |
