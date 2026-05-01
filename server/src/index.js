import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import session from 'express-session';
import authRoutes from './routes/auth.js';
import reelsRoutes from './routes/reels.js';
import siteRoutes from './routes/site.js';

dotenv.config();

const app = express();

app.use(helmet());
const allowedOrigins = process.env.CORS_ORIGIN || 'http://localhost:5173';
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'dev_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    },
  })
);

app.use('/api/auth', authRoutes);
app.use('/api/reels', reelsRoutes);
app.use('/api/site_content', siteRoutes);

app.get('/api/ping', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server if not imported as a module
if (process.argv[1] && process.argv[1].endsWith('index.js')) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

export default app;
