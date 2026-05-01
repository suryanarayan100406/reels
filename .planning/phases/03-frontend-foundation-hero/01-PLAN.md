---
nyquist_compliant: true
wave: 1
depends_on: []
files_modified:
  - client/package.json
  - client/vite.config.js
  - client/src/index.css
  - client/index.html
  - client/public/favicon.svg
autonomous: true
---

# Phase 3: Frontend Foundation & Hero - Plan 01 (Scaffolding & Config)

## Task 1: Scaffold Vite App and Install Dependencies
<read_first>
</read_first>
<action>
1. Run `npx -y create-vite@latest client --template react` in the root directory. Wait, it is better to just run `npm create vite@latest client -- --template react` to avoid prompt. Since the orchestrator is running this from the root, it creates the `client` directory.
2. Change into `client` directory and install dependencies: `npm install`.
3. Install TailwindCSS v4 and others: `npm install tailwindcss @tailwindcss/vite react-router-dom framer-motion lucide-react`.
</action>
<acceptance_criteria>
- `client/package.json` exists and contains `tailwindcss`, `@tailwindcss/vite`, `react-router-dom`, `framer-motion`, `lucide-react`.
</acceptance_criteria>

## Task 2: Configure Vite and TailwindCSS v4
<read_first>
- client/vite.config.js
- client/src/index.css
</read_first>
<action>
1. Update `client/vite.config.js`:
   - Import `tailwindcss` from `@tailwindcss/vite`.
   - Add `tailwindcss()` to the `plugins` array.
   - Add a `server: { proxy: { '/api': 'http://localhost:3000' } }` config to route API calls to the backend.
2. Overwrite `client/src/index.css`:
   - Import tailwind: `@import "tailwindcss";`
   - Define custom theme using `@theme`:
     - `--color-warm-cream: #F5EFE6;`
     - `--color-terracotta: #C17F5C;`
     - `--color-dusty-rose: #C9A0A0;`
     - `--color-charcoal: #2E2E2E;`
     - `--font-serif: "Playfair Display", serif;`
     - `--font-sans: "DM Sans", sans-serif;`
   - Apply base styles to `body`: `background-color: var(--color-warm-cream); color: var(--color-charcoal); font-family: var(--font-sans);`
</action>
<acceptance_criteria>
- `client/vite.config.js` includes the Tailwind plugin and proxy.
- `client/src/index.css` defines the custom `@theme` variables and basic body styles.
</acceptance_criteria>

## Task 3: Setup Fonts and Favicon
<read_first>
- client/index.html
</read_first>
<action>
1. Update `client/index.html`:
   - Add Google Fonts links for `Playfair Display` and `DM Sans` in the `<head>`.
   - Change `<title>` to "If You Ever Wondered".
   - Change favicon link to point to `/favicon.svg`.
2. Create `client/public/favicon.svg`:
   - Create a simple inline SVG of a cat silhouette or paw print using the terracotta color (`#C17F5C`).
</action>
<acceptance_criteria>
- `client/index.html` has Google Fonts loaded.
- `client/index.html` title is "If You Ever Wondered".
- `client/public/favicon.svg` exists with valid SVG content.
</acceptance_criteria>
