import { test, expect } from 'vitest';
import request from 'supertest';
import app from '../src/index.js';

test('Express app sets security and CORS headers', async () => {
  const res = await request(app).get('/api/ping');
  
  expect(res.headers).toHaveProperty('access-control-allow-origin');
  expect(res.headers).toHaveProperty('x-dns-prefetch-control');
});
