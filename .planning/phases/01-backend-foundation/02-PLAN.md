---
nyquist_compliant: true
wave: 1
depends_on: ["01-PLAN.md"]
files_modified:
  - server/.env.example
  - server/src/config/db.js
  - server/tests/db.test.js
  - server/src/index.js
  - server/tests/app.test.js
  - server/tests/security.test.js
autonomous: true
---

# Phase 1: Backend Foundation - Plan 02 (Wave 1 DB & Express setup)

## Task 1: Initialize `.env.example` and DB Config
<read_first>
- server/.env.example
- server/src/config/db.js
- server/tests/db.test.js
</read_first>
<action>
1. Create `server/.env.example` containing:
```
PORT=5000
DATABASE_PATH=./data/app.db
SESSION_SECRET=your_super_secret_session_key_change_me
```
2. Create `server/src/config/db.js`:
   - Import `Database` from `better-sqlite3`.
   - Initialize connection using `process.env.DATABASE_PATH || './data/app.db'`.
   - Enable WAL mode: `db.pragma('journal_mode = WAL');`
   - Run initial schema creation statements (if not exists) for tables:
     - `admin`: `id INTEGER PRIMARY KEY, password_hash TEXT NOT NULL`
     - `site_content`: `key TEXT PRIMARY KEY, value TEXT NOT NULL, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP`
     - `reels`: `id INTEGER PRIMARY KEY AUTOINCREMENT, instagram_url TEXT NOT NULL UNIQUE, embed_html TEXT, thumbnail_url TEXT, personal_note TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP`
     - `reactions`: `id INTEGER PRIMARY KEY AUTOINCREMENT, reel_id INTEGER NOT NULL REFERENCES reels(id) ON DELETE CASCADE, visitor_id TEXT NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, UNIQUE(reel_id, visitor_id)`
   - Export the DB instance.
3. Update `server/tests/db.test.js` to import `db.js` and verify tables exist using `db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all()`.
</action>
<acceptance_criteria>
- `server/.env.example` contains `DATABASE_PATH=`
- `server/src/config/db.js` contains `better-sqlite3` and `CREATE TABLE IF NOT EXISTS admin`
- `npm run test --prefix server -- server/tests/db.test.js` passes
</acceptance_criteria>

## Task 2: Setup Express server with Security Headers and CORS
<read_first>
- server/src/index.js
- server/tests/app.test.js
- server/tests/security.test.js
</read_first>
<action>
1. Create `server/src/index.js`:
   - Import `express`, `cors`, `helmet`, `dotenv`.
   - Call `dotenv.config()`.
   - Initialize `app = express()`.
   - Add middleware:
     - `app.use(helmet());`
     - `app.use(cors({ origin: 'http://localhost:5173', credentials: true }));`
     - `app.use(express.json());`
   - Add a ping endpoint: `app.get('/api/ping', (req, res) => res.json({ status: 'ok' }));`
   - Start server on `process.env.PORT || 5000` (only if not imported as module). Export `app`.
2. Update `server/tests/app.test.js` to use `supertest` and verify `/api/ping` returns 200 `{ status: 'ok' }`.
3. Update `server/tests/security.test.js` using `supertest` to verify a GET to `/api/ping` returns `access-control-allow-origin` and `x-dns-prefetch-control` headers.
</action>
<acceptance_criteria>
- `server/src/index.js` contains `app.use(helmet())`
- `server/src/index.js` contains `credentials: true`
- `npm run test --prefix server -- server/tests/app.test.js` passes
- `npm run test --prefix server -- server/tests/security.test.js` passes
</acceptance_criteria>
