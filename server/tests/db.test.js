import { test, expect } from 'vitest';
import db from '../src/config/db.js';

test('db initializes schema', () => {
  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
  const tableNames = tables.map(t => t.name);
  
  expect(tableNames).toContain('admin');
  expect(tableNames).toContain('site_content');
  expect(tableNames).toContain('reels');
  expect(tableNames).toContain('reactions');
});
