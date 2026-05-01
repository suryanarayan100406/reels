import express from 'express';
import db from '../config/db.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', (req, res) => {
  const rows = db.prepare('SELECT key, value FROM site_content').all();
  const content = rows.reduce((acc, row) => {
    acc[row.key] = row.value;
    return acc;
  }, {});

  res.json(content);
});

router.post('/', requireAuth, (req, res) => {
  const { hero_message } = req.body;
  
  if (hero_message === undefined) {
    return res.status(400).json({ error: 'hero_message is required' });
  }

  const stmt = db.prepare(`
    INSERT INTO site_content (key, value) 
    VALUES ('hero_message', ?) 
    ON CONFLICT(key) DO UPDATE SET value=excluded.value, updated_at=CURRENT_TIMESTAMP
  `);
  
  stmt.run(hero_message);
  
  res.json({ status: 'ok', hero_message });
});

export default router;
