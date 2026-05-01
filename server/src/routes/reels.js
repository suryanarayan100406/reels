import express from 'express';
import db from '../config/db.js';
import { requireAuth } from '../middleware/auth.js';
import { fetchOEmbedData, extractThumbnail } from '../services/instagram.js';

const router = express.Router();

// GET /api/reels - Publicly accessible list of reels
router.get('/', (req, res) => {
  try {
    const reels = db.prepare('SELECT * FROM reels ORDER BY created_at DESC').all();
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
    // 1. Fetch oEmbed data
    const embed_html = await fetchOEmbedData(instagram_url);
    
    // 2. Fetch thumbnail
    const thumbnail_url = await extractThumbnail(instagram_url);

    // 3. Insert into DB
    const insert = db.prepare(`
      INSERT INTO reels (instagram_url, embed_html, thumbnail_url, personal_note)
      VALUES (?, ?, ?, ?)
    `);
    
    const info = insert.run(instagram_url, embed_html, thumbnail_url, personal_note || null);
    
    const newReel = db.prepare('SELECT * FROM reels WHERE id = ?').get(info.lastInsertRowid);
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

// PUT /api/reels/:id - Update an existing reel (Admin only)
router.put('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  const { instagram_url, personal_note } = req.body;

  try {
    const existingReel = db.prepare('SELECT * FROM reels WHERE id = ?').get(id);
    if (!existingReel) {
      return res.status(404).json({ error: 'Reel not found' });
    }

    let embed_html = existingReel.embed_html;
    let thumbnail_url = existingReel.thumbnail_url;

    // If URL changed, re-fetch data
    if (instagram_url && instagram_url !== existingReel.instagram_url) {
      embed_html = await fetchOEmbedData(instagram_url);
      thumbnail_url = await extractThumbnail(instagram_url);
    }

    const update = db.prepare(`
      UPDATE reels 
      SET instagram_url = ?, embed_html = ?, thumbnail_url = ?, personal_note = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    
    update.run(
      instagram_url || existingReel.instagram_url,
      embed_html,
      thumbnail_url,
      personal_note !== undefined ? personal_note : existingReel.personal_note,
      id
    );

    const updatedReel = db.prepare('SELECT * FROM reels WHERE id = ?').get(id);
    res.json(updatedReel);
  } catch (err) {
    console.error('Failed to update reel:', err);
    res.status(500).json({ error: 'Failed to update reel' });
  }
});

// DELETE /api/reels/:id - Delete a reel (Admin only)
router.delete('/:id', requireAuth, (req, res) => {
  const { id } = req.params;

  try {
    const deleteReel = db.prepare('DELETE FROM reels WHERE id = ?');
    const info = deleteReel.run(id);

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
