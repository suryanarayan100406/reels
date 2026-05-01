---
nyquist_compliant: true
wave: 0
depends_on: []
files_modified:
  - server/package.json
  - server/vitest.config.ts
  - server/tests/app.test.js
  - server/tests/db.test.js
  - server/tests/auth.test.js
  - server/tests/security.test.js
autonomous: true
---

# Phase 1: Backend Foundation - Plan 01 (Wave 0 Test Infra)

## Task 1: Initialize server project and install dependencies
<read_first>
- server/package.json (if exists)
</read_first>
<action>
1. Create `server/` directory.
2. Initialize `package.json` in `server/` with `"type": "module"`.
3. Install production dependencies: `express`, `better-sqlite3`, `bcrypt`, `express-session`, `better-sqlite3-session-store`, `cors`, `dotenv`, `helmet`.
4. Install dev dependencies: `vitest`, `supertest`.
5. Add test script to `package.json`: `"test": "vitest --run"`
</action>
<acceptance_criteria>
- `server/package.json` contains `"express":`
- `server/package.json` contains `"vitest":`
- `server/package.json` contains `"test": "vitest --run"`
</acceptance_criteria>

## Task 2: Create Vitest config
<read_first>
- server/vitest.config.ts (if exists)
</read_first>
<action>
Create `server/vitest.config.ts` with the following configuration:
```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
  },
});
```
</action>
<acceptance_criteria>
- `server/vitest.config.ts` exists.
- `cat server/vitest.config.ts` contains `environment: 'node'`
</acceptance_criteria>

## Task 3: Create stub tests for Wave 0
<read_first>
- server/tests/app.test.js
- server/tests/db.test.js
- server/tests/auth.test.js
- server/tests/security.test.js
</read_first>
<action>
1. Create `server/tests/app.test.js` with a passing stub: `test('app', () => { expect(true).toBe(true); });`
2. Create `server/tests/db.test.js` with a passing stub: `test('db', () => { expect(true).toBe(true); });`
3. Create `server/tests/auth.test.js` with a passing stub: `test('auth', () => { expect(true).toBe(true); });`
4. Create `server/tests/security.test.js` with a passing stub: `test('security', () => { expect(true).toBe(true); });`
</action>
<acceptance_criteria>
- `server/tests/app.test.js` contains `test('app'`
- `server/tests/db.test.js` contains `test('db'`
- `npm run test --prefix server` exits 0
</acceptance_criteria>
