import { createClient } from '@libsql/client';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Use Turso in production, local SQLite file in development
const tursoUrl = process.env.TURSO_DATABASE_URL;
const tursoToken = process.env.TURSO_AUTH_TOKEN;

const client = createClient(
  tursoUrl
    ? { url: tursoUrl, authToken: tursoToken }
    : { url: `file:${path.join(__dirname, '../../data/app.db')}` }
);

// Wrapper with a cleaner API (mirrors better-sqlite3 style but async)
const db = {
  /** Run a query and return the first row, or null */
  async get(sql, ...params) {
    const result = await client.execute({ sql, args: params });
    return result.rows[0] || null;
  },

  /** Run a query and return all rows */
  async all(sql, ...params) {
    const result = await client.execute({ sql, args: params });
    return result.rows;
  },

  /** Run an insert/update/delete and return { changes, lastInsertRowid } */
  async run(sql, ...params) {
    const result = await client.execute({ sql, args: params });
    return {
      changes: Number(result.rowsAffected),
      lastInsertRowid: Number(result.lastInsertRowid),
    };
  },

  /** Execute raw SQL (e.g. schema creation) */
  async exec(sql) {
    await client.executeMultiple(sql);
  },

  /** Direct client access for advanced use */
  client,
};

// Initialize schema
await db.exec(`
  CREATE TABLE IF NOT EXISTS admin (
    id INTEGER PRIMARY KEY,
    password_hash TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS site_content (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS reels (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    instagram_url TEXT NOT NULL UNIQUE,
    embed_html TEXT,
    thumbnail_url TEXT,
    personal_note TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS reactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    reel_id INTEGER NOT NULL REFERENCES reels(id) ON DELETE CASCADE,
    visitor_id TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(reel_id, visitor_id)
  );
`);

export default db;
