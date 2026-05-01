import { test, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import bcrypt from 'bcrypt';
import app from '../src/index.js';
import db from '../src/config/db.js';

beforeAll(async () => {
  db.prepare('DELETE FROM admin').run();
  const hash = await bcrypt.hash('testpass', 10);
  db.prepare('INSERT INTO admin (password_hash) VALUES (?)').run(hash);
});

afterAll(() => {
  db.prepare('DELETE FROM admin').run();
});

test('POST /api/auth/login with valid password sets cookie', async () => {
  const res = await request(app)
    .post('/api/auth/login')
    .send({ password: 'testpass' });
    
  expect(res.status).toBe(200);
  expect(res.body).toEqual({ status: 'ok' });
  expect(res.headers['set-cookie']).toBeDefined();
});

test('POST /api/auth/login with invalid password returns 401', async () => {
  const res = await request(app)
    .post('/api/auth/login')
    .send({ password: 'wrongpassword' });
    
  expect(res.status).toBe(401);
});

test('GET /api/auth/me without cookie returns 401', async () => {
  const res = await request(app).get('/api/auth/me');
  expect(res.status).toBe(401);
});

test('GET /api/auth/me with valid cookie returns 200', async () => {
  const loginRes = await request(app)
    .post('/api/auth/login')
    .send({ password: 'testpass' });
    
  const cookie = loginRes.headers['set-cookie'];
  
  const res = await request(app)
    .get('/api/auth/me')
    .set('Cookie', cookie);
    
  expect(res.status).toBe(200);
  expect(res.body).toEqual({ admin: true });
});
