---
nyquist_compliant: true
wave: 2
depends_on: ["01-PLAN.md"]
files_modified:
  - client/src/App.jsx
  - client/src/components/layout/AppLayout.jsx
  - client/src/components/hero/Hero.jsx
  - client/src/components/ui/PawBackground.jsx
autonomous: true
---

# Phase 3: Frontend Foundation & Hero - Plan 02 (Layout & Hero)

## Task 1: Create Layout Components
<read_first>
- client/src/App.jsx
</read_first>
<action>
1. Create `client/src/components/ui/PawBackground.jsx`:
   - Returns a fixed `div` covering the viewport `inset-0 fixed -z-10 opacity-5 pointer-events-none`.
   - Use an inline SVG of a paw print repeated via CSS pattern, or render multiple scattered SVG elements.
2. Create `client/src/components/layout/AppLayout.jsx`:
   - Receives `children`.
   - Renders `PawBackground`.
   - Renders a `<main>` container: `min-h-screen flex flex-col items-center px-4 md:px-8`.
   - Renders a `<footer>` at the bottom: `mt-auto py-8 text-center text-sm text-charcoal/60`. Content: "Made with 🐾 for Mrs Mansu".
</action>
<acceptance_criteria>
- `PawBackground.jsx` exists with an SVG pattern.
- `AppLayout.jsx` wraps children and includes the required footer text.
</acceptance_criteria>

## Task 2: Create Hero Section
<read_first>
- client/src/components/hero/Hero.jsx
</read_first>
<action>
1. Create `client/src/components/hero/Hero.jsx`:
   - Uses `framer-motion` for a smooth fade-in animation (`initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}}`).
   - Fetches the personal message from `/api/site_content/hero_message` using `useEffect` and `fetch`.
     - *Fallback:* If fetch fails or hasn't loaded, display: "A small collection of things that made me think of you."
   - Renders `<h1>`: "If You Ever Wondered" with `font-serif text-4xl md:text-5xl text-terracotta text-center mt-16 mb-6`.
   - Renders the personal message paragraph: `text-center max-w-lg text-lg mb-8`.
   - Renders branding text: "curated by Silent Admirer" `text-sm italic text-dusty-rose text-center mb-12`.
   - Renders a decorative paw print divider using `lucide-react` (e.g., `<PawPrint size={24} className="text-dusty-rose/40 mx-auto" />`).
</action>
<acceptance_criteria>
- `Hero.jsx` fetches from the API and has a graceful fallback.
- `Hero.jsx` uses the specified Tailwind text colors and fonts.
- Includes the decorative paw print divider.
</acceptance_criteria>

## Task 3: Assemble App
<read_first>
- client/src/App.jsx
- client/src/main.jsx
</read_first>
<action>
1. Update `client/src/App.jsx`:
   - Clear the Vite boilerplate.
   - Import `AppLayout` and `Hero`.
   - Render `<AppLayout><Hero /></AppLayout>`.
2. Update `client/src/main.jsx`:
   - Wrap `<App>` in `<BrowserRouter>` from `react-router-dom` (to prepare for future routing).
</action>
<acceptance_criteria>
- `client/src/App.jsx` no longer contains the default Vite counter.
- `client/src/main.jsx` uses `BrowserRouter`.
</acceptance_criteria>
