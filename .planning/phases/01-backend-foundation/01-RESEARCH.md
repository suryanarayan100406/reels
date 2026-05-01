# Phase 1: Backend Foundation — Research

## Context

**Goal:** Set up Express server with SQLite database, admin authentication, and security hardening. This is the backbone everything else depends on.
**Requirements:** INFRA-01, INFRA-02, INFRA-04, INFRA-07, INFRA-08, ADMN-01, ADMN-02

## Technical Approach

### 1. Project Structure (Monorepo-style)
To keep the backend and frontend distinct but in the same repo, we'll establish a `server/` directory for the Express backend.

```text
server/
├── src/
│   ├── config/      # DB config, environment validation
│   ├── middleware/  # Auth checking, error handling
│   ├── routes/      # Express routers
│   ├── controllers/ # Route logic
│   └── index.js     # Entry point
├── .env.example
└── package.json
```

### 2. Database (SQLite)
We will use `better-sqlite3` because it is synchronous, extremely fast, zero-dependency, and perfect for <1000 rows.
*   **Initialization:** Provide a script or routine that creates the required tables (`reels`, `reactions`, `admin`, `site_content`) on startup if they don't exist.
*   **Admin seeding:** Provide a way to seed the initial admin password.

**Schema Definitions:**
```sql
CREATE TABLE IF NOT EXISTS admin (
    id INTEGER PRIMARY KEY,
    password_hash TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS site_content (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```
*(Note: `reels` and `reactions` schemas will be fully handled in Phase 2 & 5, but we can initialize empty tables now to prepare).*

### 3. Admin Authentication
Since there is only one admin (the curator), we can use a very simple session-based authentication strategy.
*   **Password Hashing:** `bcrypt` (salt rounds: 10).
*   **Sessions:** `express-session` with a file-based or SQLite-based store. Using `better-sqlite3-session-store` keeps everything in the same DB and prevents logouts on server restart.
*   **Endpoints:**
    *   `POST /api/auth/login` (checks password, sets session)
    *   `POST /api/auth/logout` (destroys session)
    *   `GET /api/auth/me` (checks if currently logged in)

### 4. Security & Configuration
*   **CORS:** Needs `cors` middleware configured to allow the Vite frontend (`http://localhost:5173`) to send credentials (cookies).
*   **Security Headers:** Use `helmet` for basic HTTP security headers.
*   **Environment Variables:** `dotenv` to load `.env`. Needs an `.env.example` defining `PORT`, `SESSION_SECRET`, and `DATABASE_URL` or `DATABASE_PATH`.

## Validation Architecture

To prove this phase is complete and meets all requirements, we must verify the following:

1.  **Server Startup:** The Express server starts without errors and binds to the configured port.
2.  **Database Creation:** The SQLite database file is created, and the `admin` and `site_content` tables exist.
3.  **Authentication Flow:**
    *   Logging in with correct credentials returns a success response and a `set-cookie` header.
    *   Logging in with incorrect credentials returns a 401 Unauthorized.
    *   Accessing a protected test route without a session cookie returns 401 Unauthorized.
4.  **Security Headers:** A GET request to the server returns `helmet` security headers (e.g., `x-powered-by` is hidden, `x-xss-protection` is set).
5.  **CORS Validation:** Cross-origin requests from the specified frontend origin succeed with credentials.

## Dependencies & Risks

*   **Risk:** `express-session` by default uses MemoryStore, which leaks memory and resets on restart.
    *   **Mitigation:** Must use `better-sqlite3-session-store` to persist sessions in the SQLite DB.
*   **Risk:** SQLite file persistence on deployment (Railway).
    *   **Mitigation:** Configure the DB path via environment variable (e.g., `DATABASE_PATH=./data/app.db`) so it can be mapped to a persistent volume in production. Ensure the `data` directory is `.gitignore`d.
