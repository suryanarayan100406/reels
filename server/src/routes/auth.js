import express from 'express';
import bcrypt from 'bcrypt';
import db from '../config/db.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: 'Password is required' });
  }

  const admin = db.prepare('SELECT * FROM admin LIMIT 1').get();

  if (!admin) {
    // If no admin exists yet, log error (normally would seed it or have an initial setup)
    return res.status(500).json({ error: 'Admin account not initialized' });
  }

  const match = await bcrypt.compare(password, admin.password_hash);

  if (match) {
    req.session.isAdmin = true;
    res.json({ status: 'ok' });
  } else {
    res.status(401).json({ error: 'Invalid password' });
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ status: 'ok' });
});

router.get('/verify', requireAuth, (req, res) => {
  res.json({ authenticated: true });
});

export default router;
