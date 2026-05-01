import express from 'express';
import db from '../config/db.js';
import { requireAuth } from '../middleware/auth.js';
import { generateEmbedHtml, extractThumbnail } from '../services/instagram.js';

const router = express.Router();

// GET /api/reels/stats/reactions - Admin dashboard stats
router.get('/stats/reactions', requireAuth, async (req, res) => {
  try {
    const stats = await db.all(`
      SELECT r.id, r.instagram_url, r.personal_note, COUNT(rx.id) as reaction_count
      FROM reels r
      LEFT JOIN reactions rx ON r.id = rx.reel_id
      GROUP BY r.id
      ORDER BY reaction_count DESC
    `);
    res.json(stats);
  } catch (err) {
    console.error('Failed to fetch reaction stats:', err);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// GET /api/reels - Publicly accessible list of reels
router.get('/', async (req, res) => {
  const { visitor_id } = req.query;
  
  try {
    const reels = await db.all(`
      SELECT r.*, 
             COUNT(rx.id) as reaction_count,
             EXISTS(SELECT 1 FROM reactions WHERE reel_id = r.id AND visitor_id = ?) as has_reacted
      FROM reels r
      LEFT JOIN reactions rx ON r.id = rx.reel_id
      GROUP BY r.id
      ORDER BY r.created_at DESC
    `, visitor_id || '');
    
    // Convert SQLite integer boolean (0/1) to true boolean
    reels.forEach(r => r.has_reacted = !!r.has_reacted);
    
    res.json(reels);
  } catch (err) {
    console.error('Failed to fetch reels:', err);
    res.status(500).json({ error: 'Failed to fetch reels' });
  }
});

// POST /api/reels - Add a new reel (Admin only)
router.post('/', requireAuth, async (req, res) => {
  const { instagram_url, personal_note } = req.body;

  if (!instagram_url) {
    return res.status(400).json({ error: 'Instagram URL is required' });
  }

  try {
    // 1. Generate embed HTML (no API keys needed)
    const embed_html = generateEmbedHtml(instagram_url);
    
    // 2. Fetch thumbnail
    const thumbnail_url = await extractThumbnail(instagram_url);

    // 3. Insert into DB
    const info = await db.run(
      'INSERT INTO reels (instagram_url, embed_html, thumbnail_url, personal_note) VALUES (?, ?, ?, ?)',
      instagram_url, embed_html, thumbnail_url, personal_note || null
    );
    
    const newReel = await db.get('SELECT * FROM reels WHERE id = ?', info.lastInsertRowid);
    res.status(201).json(newReel);
  } catch (err) {
    console.error('Failed to add reel:', err);
    if (err.message && err.message.includes('UNIQUE constraint failed')) {
      return res.status(409).json({ error: 'This reel has already been added.' });
    }
    if (err.message && err.message.includes('Invalid Instagram Reel URL')) {
        return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'Failed to add reel: ' + err.message });
  }
});

// POST /api/reels/:id/react - Toggle a reaction (Public)
router.post('/:id/react', async (req, res) => {
  const { id } = req.params;
  const { visitor_id } = req.body;

  if (!visitor_id) {
    return res.status(400).json({ error: 'visitor_id is required' });
  }

  try {
    // Check if reel exists
    const reel = await db.get('SELECT id FROM reels WHERE id = ?', id);
    if (!reel) {
      return res.status(404).json({ error: 'Reel not found' });
    }

    const existing = await db.get('SELECT id FROM reactions WHERE reel_id = ? AND visitor_id = ?', id, visitor_id);
    let action;
    
    if (existing) {
      await db.run('DELETE FROM reactions WHERE id = ?', existing.id);
      action = 'removed';
    } else {
      await db.run('INSERT INTO reactions (reel_id, visitor_id) VALUES (?, ?)', id, visitor_id);
      action = 'added';
    }
    
    res.json({ status: 'ok', action });
  } catch (err) {
    console.error('Failed to toggle reaction:', err);
    res.status(500).json({ error: 'Failed to toggle reaction' });
  }
});

// PUT /api/reels/:id - Update an existing reel (Admin only)
router.put('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  const { instagram_url, personal_note } = req.body;

  try {
    const existingReel = await db.get('SELECT * FROM reels WHERE id = ?', id);
    if (!existingReel) {
      return res.status(404).json({ error: 'Reel not found' });
    }

    let embed_html = existingReel.embed_html;
    let thumbnail_url = existingReel.thumbnail_url;

    // If URL changed, re-fetch data
    if (instagram_url && instagram_url !== existingReel.instagram_url) {
      embed_html = generateEmbedHtml(instagram_url);
      thumbnail_url = await extractThumbnail(instagram_url);
    }

    await db.run(
      'UPDATE reels SET instagram_url = ?, embed_html = ?, thumbnail_url = ?, personal_note = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      instagram_url || existingReel.instagram_url,
      embed_html,
      thumbnail_url,
      personal_note !== undefined ? personal_note : existingReel.personal_note,
      id
    );

    const updatedReel = await db.get('SELECT * FROM reels WHERE id = ?', id);
    res.json(updatedReel);
  } catch (err) {
    console.error('Failed to update reel:', err);
    res.status(500).json({ error: 'Failed to update reel' });
  }
});

// DELETE /api/reels/:id - Delete a reel (Admin only)
router.delete('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;

  try {
    const info = await db.run('DELETE FROM reels WHERE id = ?', id);

    if (info.changes === 0) {
      return res.status(404).json({ error: 'Reel not found' });
    }

    res.json({ success: true, message: 'Reel deleted' });
  } catch (err) {
    console.error('Failed to delete reel:', err);
    res.status(500).json({ error: 'Failed to delete reel' });
  }
});

export default router;
