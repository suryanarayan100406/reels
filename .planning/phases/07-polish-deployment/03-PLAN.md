---
nyquist_compliant: true
wave: 2
depends_on: ["01-PLAN.md", "02-PLAN.md"]
files_modified:
  - README.md
  - server/.env.example
autonomous: true
---

# Phase 7: Polish & Deployment - Plan 03 (Documentation)

## Task 1: Environment Example File
<read_first>
</read_first>
<action>
1. Create `server/.env.example`.
2. Include the following template variables with descriptive comments:
   - `PORT=3000`
   - `SESSION_SECRET=your_secure_random_string`
   - `IG_APP_ID=your_meta_app_id`
   - `IG_APP_SECRET=your_meta_app_secret`
</action>
<acceptance_criteria>
- `.env.example` provides a clear template for required backend configuration.
</acceptance_criteria>

## Task 2: Project README
<read_first>
</read_first>
<action>
1. Replace `README.md` at the project root.
2. Include a project description ("If You Ever Wondered").
3. Add a "Requirements" section (Node.js, Meta App).
4. Add a "Setup Guide" section covering:
   - Cloning the repo.
   - Setting up the backend (`cd server`, `npm install`, copying `.env.example` to `.env`).
   - Setting up the frontend (`cd client`, `npm install`).
5. Add an "Instagram API Setup" section explaining:
   - Create a Meta Developer App (Business/Consumer).
   - Add the "oEmbed Read" product.
   - Note the App ID and App Secret.
6. Add a "Running Locally" section (`npm run dev` in both folders).
7. Add a "Deployment" section with tips for Vercel/Railway.
</action>
<acceptance_criteria>
- The project is fully documented and ready to be handed off or deployed.
</acceptance_criteria>
