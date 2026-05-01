---
phase: 1
slug: backend-foundation
status: draft
nyquist_compliant: true
wave_0_complete: false
created: 2026-05-02
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest (configured for backend testing) |
| **Config file** | `server/vitest.config.ts` |
| **Quick run command** | `npm run test -- --run` |
| **Full suite command** | `npm run test -- --run` |
| **Estimated runtime** | ~2 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run test -- --run`
- **After every plan wave:** Run `npm run test -- --run`
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 1-01-01 | 01 | 1 | INFRA-01 | — | N/A | unit | `npm run test -- --run server/tests/app.test.js` | ❌ W0 | ⬜ pending |
| 1-01-02 | 01 | 1 | INFRA-02 | — | N/A | unit | `npm run test -- --run server/tests/db.test.js` | ❌ W0 | ⬜ pending |
| 1-01-03 | 01 | 2 | INFRA-04 | — | Password securely hashed | unit | `npm run test -- --run server/tests/auth.test.js` | ❌ W0 | ⬜ pending |
| 1-01-04 | 01 | 2 | INFRA-07 | — | CORS headers present | integration| `npm run test -- --run server/tests/security.test.js` | ❌ W0 | ⬜ pending |
| 1-01-05 | 01 | 2 | INFRA-08 | — | Helmet headers present | integration| `npm run test -- --run server/tests/security.test.js` | ❌ W0 | ⬜ pending |
| 1-01-06 | 01 | 3 | ADMN-01 | — | Session cookie set | integration| `npm run test -- --run server/tests/auth.test.js` | ❌ W0 | ⬜ pending |
| 1-01-07 | 01 | 3 | ADMN-02 | — | 401 on protected routes | integration| `npm run test -- --run server/tests/auth.test.js` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `server/tests/app.test.js` — Express server boot and basic ping tests
- [ ] `server/tests/db.test.js` — SQLite database initialization tests
- [ ] `server/tests/auth.test.js` — Auth endpoints and session persistence tests
- [ ] `server/tests/security.test.js` — Helmet and CORS headers tests
- [ ] `server/package.json` — vitest and supertest dependencies

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Test Login | ADMN-01 | Needs manual end-to-end check | Send POST to /api/auth/login via Postman/curl and verify session is persistent across restarts |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references
- [x] No watch-mode flags
- [x] Feedback latency < 5s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
