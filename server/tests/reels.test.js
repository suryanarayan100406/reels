import { describe, it, expect, beforeAll, vi } from 'vitest';
import request from 'supertest';
import app from '../src/index.js';
import db from '../src/config/db.js';

// Mock the instagram service
vi.mock('../src/services/instagram.js', () => ({
  fetchOEmbedData: vi.fn(async (url) => {
    if (!url.includes('instagram.com/reel/')) {
      throw new Error('Invalid Instagram Reel URL');
    }
    return '<blockquote>Mock Embed</blockquote>';
  }),
  extractThumbnail: vi.fn(async (url) => {
    return 'https://example.com/mock-thumb.jpg';
  })
}));

describe('Reels API', () => {
  let adminCookie;

  beforeAll(async () => {
    db.prepare('DELETE FROM reels').run();
    db.prepare('DELETE FROM admin').run();
    db.prepare('DELETE FROM sessions').run();

    // Create an admin user for authentication
    const bcrypt = await import('bcrypt');
    const hash = await bcrypt.hash('testpassword', 10);
    db.prepare('INSERT INTO admin (id, password_hash) VALUES (?, ?)').run(1, hash);

    // Login to get session cookie
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ password: 'testpassword' });
    
    adminCookie = loginRes.headers['set-cookie'];
  });

  describe('GET /api/reels', () => {
    it('should return empty array initially', async () => {
      const res = await request(app).get('/api/reels');
      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });
  });

  describe('POST /api/reels', () => {
    it('should require authentication', async () => {
      const res = await request(app)
        .post('/api/reels')
        .send({ instagram_url: 'https://www.instagram.com/reel/XYZ123/' });
      expect(res.status).toBe(401);
    });

    it('should add a new reel when authenticated', async () => {
      const res = await request(app)
        .post('/api/reels')
        .set('Cookie', adminCookie)
        .send({ 
          instagram_url: 'https://www.instagram.com/reel/XYZ123/',
          personal_note: 'A test note'
        });
      
      expect(res.status).toBe(201);
      expect(res.body.id).toBeDefined();
      expect(res.body.instagram_url).toBe('https://www.instagram.com/reel/XYZ123/');
      expect(res.body.embed_html).toBe('<blockquote>Mock Embed</blockquote>');
      expect(res.body.thumbnail_url).toBe('https://example.com/mock-thumb.jpg');
      expect(res.body.personal_note).toBe('A test note');
    });

    it('should reject duplicate URLs', async () => {
      const res = await request(app)
        .post('/api/reels')
        .set('Cookie', adminCookie)
        .send({ instagram_url: 'https://www.instagram.com/reel/XYZ123/' });
      
      expect(res.status).toBe(409);
      expect(res.body.error).toMatch(/already been added/);
    });

    it('should reject invalid URLs', async () => {
      const res = await request(app)
        .post('/api/reels')
        .set('Cookie', adminCookie)
        .send({ instagram_url: 'https://youtube.com/watch?v=123' });
      
      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/Invalid Instagram Reel URL/);
    });
  });

  describe('PUT /api/reels/:id', () => {
    let reelId;

    beforeAll(() => {
      const reel = db.prepare('SELECT id FROM reels LIMIT 1').get();
      reelId = reel.id;
    });

    it('should require authentication', async () => {
      const res = await request(app)
        .put(`/api/reels/${reelId}`)
        .send({ personal_note: 'Updated note' });
      expect(res.status).toBe(401);
    });

    it('should update personal note without changing URL', async () => {
      const res = await request(app)
        .put(`/api/reels/${reelId}`)
        .set('Cookie', adminCookie)
        .send({ personal_note: 'Updated note' });
      
      expect(res.status).toBe(200);
      expect(res.body.personal_note).toBe('Updated note');
      expect(res.body.instagram_url).toBe('https://www.instagram.com/reel/XYZ123/');
    });

    it('should re-fetch embed data if URL changes', async () => {
      const res = await request(app)
        .put(`/api/reels/${reelId}`)
        .set('Cookie', adminCookie)
        .send({ instagram_url: 'https://www.instagram.com/reel/NEW456/' });
      
      expect(res.status).toBe(200);
      expect(res.body.instagram_url).toBe('https://www.instagram.com/reel/NEW456/');
      // Note hasn't changed
      expect(res.body.personal_note).toBe('Updated note');
    });
  });

  describe('DELETE /api/reels/:id', () => {
    let reelId;

    beforeAll(() => {
      const reel = db.prepare('SELECT id FROM reels LIMIT 1').get();
      reelId = reel.id;
    });

    it('should require authentication', async () => {
      const res = await request(app).delete(`/api/reels/${reelId}`);
      expect(res.status).toBe(401);
    });

    it('should delete reel when authenticated', async () => {
      const res = await request(app)
        .delete(`/api/reels/${reelId}`)
        .set('Cookie', adminCookie);
      
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      // Verify it's gone
      const getRes = await request(app).get('/api/reels');
      expect(getRes.body).toHaveLength(0);
    });
  });

  describe('Reactions', () => {
    let reelId;
    const visitorId = 'test-visitor-123';

    beforeAll(async () => {
      // Create a test reel
      const res = await request(app)
        .post('/api/reels')
        .set('Cookie', adminCookie)
        .send({ instagram_url: 'https://www.instagram.com/reel/REACT123/' });
      reelId = res.body.id;
    });

    it('should add a reaction', async () => {
      const res = await request(app)
        .post(`/api/reels/${reelId}/react`)
        .send({ visitor_id: visitorId });
      
      expect(res.status).toBe(200);
      expect(res.body.action).toBe('added');
    });

    it('should show reaction in GET /api/reels', async () => {
      const res = await request(app).get(`/api/reels?visitor_id=${visitorId}`);
      expect(res.status).toBe(200);
      const reel = res.body.find(r => r.id === reelId);
      expect(reel.reaction_count).toBe(1);
      expect(reel.has_reacted).toBe(true);
    });

    it('should remove a reaction on second toggle', async () => {
      const res = await request(app)
        .post(`/api/reels/${reelId}/react`)
        .send({ visitor_id: visitorId });
      
      expect(res.status).toBe(200);
      expect(res.body.action).toBe('removed');
    });

    it('should reflect removed reaction in GET /api/reels', async () => {
      const res = await request(app).get(`/api/reels?visitor_id=${visitorId}`);
      expect(res.status).toBe(200);
      const reel = res.body.find(r => r.id === reelId);
      expect(reel.reaction_count).toBe(0);
      expect(reel.has_reacted).toBe(false);
    });

    it('should require authentication for admin stats', async () => {
      const res = await request(app).get('/api/reels/stats/reactions');
      expect(res.status).toBe(401);
    });

    it('should return stats for admin', async () => {
      // Re-add a reaction for stats
      await request(app)
        .post(`/api/reels/${reelId}/react`)
        .send({ visitor_id: visitorId });

      const res = await request(app)
        .get('/api/reels/stats/reactions')
        .set('Cookie', adminCookie);
      
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      const stat = res.body.find(r => r.id === reelId);
      expect(stat.reaction_count).toBe(1);
    });
  });
});
