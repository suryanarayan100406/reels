---
phase: 1
status: planned
plans: 3
tasks: 7
requirements: 7
nyquist_compliant: true
wave_count: 3
created: 2026-05-02
---

# Phase 1: Backend Foundation

## Goal
Set up Express server with SQLite database, admin authentication, and security hardening. This is the backbone everything else depends on.

## Plan Summary

- **01-PLAN.md (Wave 0):** Test Infra (2 tasks) — Initialize project, vitest, stub tests.
- **02-PLAN.md (Wave 1):** DB & Express setup (2 tasks) — SQLite config, Express server, Helmet, CORS.
- **03-PLAN.md (Wave 2):** Authentication (2 tasks) — Session store, bcrypt login, protected routes.

## Requirements Covered
- **INFRA-01:** Express backend proxies all Instagram API calls
- **INFRA-02:** SQLite database stores reels, reactions, admin credentials
- **INFRA-04:** Admin password stored as bcrypt hash
- **INFRA-07:** CORS configured
- **INFRA-08:** Helmet security headers
- **ADMN-01:** Curator can log in with password
- **ADMN-02:** Admin routes are protected

## Execution Sequence
```
Wave 0: 01-PLAN.md
Wave 1: 02-PLAN.md
Wave 2: 03-PLAN.md
```
