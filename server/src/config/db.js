import { createClient } from '@libsql/client';
import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const postgresUrl = process.env.POSTGRES_URL;
const isPostgres = !!postgresUrl;

let pgPool;
let sqliteClient;

if (isPostgres) {
  pgPool = new pg.Pool({
    connectionString: postgresUrl,
    ssl: { rejectUnauthorized: false }
  });
} else {
  sqliteClient = createClient({
    url: `file:${path.join(__dirname, '../../data/app.db')}`
  });
}

// Convert SQLite ? parameter binding to Postgres $1, $2, etc.
function convertToPostgres(sql) {
  let count = 1;
  return sql.replace(/\?/g, () => `$${count++}`);
}

const db = {
  async get(sql, ...params) {
    if (isPostgres) {
      const res = await pgPool.query(convertToPostgres(sql), params);
      return res.rows[0] || null;
    } else {
      const result = await sqliteClient.execute({ sql, args: params });
      return result.rows[0] || null;
    }
  },

  async all(sql, ...params) {
    if (isPostgres) {
      const res = await pgPool.query(convertToPostgres(sql), params);
      return res.rows;
    } else {
      const result = await sqliteClient.execute({ sql, args: params });
      return result.rows;
    }
  },

  async run(sql, ...params) {
    if (isPostgres) {
      // Postgres RETURNING id to match SQLite's lastInsertRowid
      const needsReturning = sql.trim().toUpperCase().startsWith('INSERT');
      const pgSql = convertToPostgres(sql) + (needsReturning ? ' RETURNING id' : '');
      const res = await pgPool.query(pgSql, params);
      return {
        changes: res.rowCount,
        lastInsertRowid: res.rows[0]?.id || null,
      };
    } else {
      const result = await sqliteClient.execute({ sql, args: params });
      return {
        changes: Number(result.rowsAffected),
        lastInsertRowid: Number(result.lastInsertRowid),
      };
    }
  },

  async exec(sql) {
    if (isPostgres) {
      await pgPool.query(sql);
    } else {
      await sqliteClient.executeMultiple(sql);
    }
  }
};

// Initialize schema (dialect agnostic where possible, fallback to SERIAL/AUTOINCREMENT)
const idType = isPostgres ? 'SERIAL' : 'INTEGER PRIMARY KEY AUTOINCREMENT';
const boolType = isPostgres ? 'BOOLEAN' : 'INTEGER';

await db.exec(`
  CREATE TABLE IF NOT EXISTS admin (
    id ${isPostgres ? 'SERIAL PRIMARY KEY' : 'INTEGER PRIMARY KEY'},
    password_hash TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS site_content (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS reels (
    id ${idType},
    instagram_url TEXT NOT NULL UNIQUE,
    embed_html TEXT,
    thumbnail_url TEXT,
    personal_note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS reactions (
    id ${idType},
    reel_id INTEGER NOT NULL REFERENCES reels(id) ON DELETE CASCADE,
    visitor_id TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(reel_id, visitor_id)
  );
`);

export default db;
