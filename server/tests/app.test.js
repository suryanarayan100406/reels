import { test, expect } from 'vitest';
import request from 'supertest';
import app from '../src/index.js';

test('GET /api/ping returns 200 ok', async () => {
  const res = await request(app).get('/api/ping');
  expect(res.status).toBe(200);
  expect(res.body).toEqual({ status: 'ok' });
});
