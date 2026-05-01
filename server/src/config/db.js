import { createClient } from '@libsql/client';
import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const postgresUrl = 
  process.env.POSTGRES_URL || 
  process.env.DATABASE_URL || 
  process.env.DATABASE_URL_UNPOOLED || 
  process.env.POSTGRES_PRISMA_URL ||
  process.env.POSTGRES_URL_NON_POOLING;

const isPostgres = !!postgresUrl;

let pgPool = null;
let sqliteClient = null;

// Convert SQLite ? parameter binding to Postgres $1, $2, etc.
function convertToPostgres(sql) {
  let count = 1;
  return sql.replace(/\?/g, () => `$${count++}`);
}

// Lazy initialization of clients and schema
let isInitialized = false;
async function ensureConnected() {
  if (isInitialized) return;
  
  try {
    if (isPostgres) {
      if (!pgPool) {
        pgPool = new pg.Pool({
          connectionString: postgresUrl,
          ssl: { rejectUnauthorized: false },
          connectionTimeoutMillis: 5000, // 5 seconds timeout
        });
      }
    } else {
      if (!sqliteClient) {
        sqliteClient = createClient({
          url: `file:${path.join(__dirname, '../../data/app.db')}`
        });
      }
    }

    const idType = isPostgres ? 'SERIAL' : 'INTEGER PRIMARY KEY AUTOINCREMENT';
    
    const schema = `
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
    `;

    if (isPostgres) {
      await pgPool.query(schema);
    } else {
      await sqliteClient.executeMultiple(schema);
    }
    
    isInitialized = true;
  } catch (err) {
    console.error('Database connection/init failed:', err);
    // Don't throw here, let the actual query fail with a better error
  }
}

const db = {
  async get(sql, ...params) {
    await ensureConnected();
    if (isPostgres) {
      if (!pgPool) throw new Error('Postgres not connected');
      const res = await pgPool.query(convertToPostgres(sql), params);
      return res.rows[0] || null;
    } else {
      if (!sqliteClient) throw new Error('SQLite not connected');
      const result = await sqliteClient.execute({ sql, args: params });
      return result.rows[0] || null;
    }
  },

  async all(sql, ...params) {
    await ensureConnected();
    if (isPostgres) {
      if (!pgPool) throw new Error('Postgres not connected');
      const res = await pgPool.query(convertToPostgres(sql), params);
      return res.rows;
    } else {
      if (!sqliteClient) throw new Error('SQLite not connected');
      const result = await sqliteClient.execute({ sql, args: params });
      return result.rows;
    }
  },

  async run(sql, ...params) {
    await ensureConnected();
    if (isPostgres) {
      if (!pgPool) throw new Error('Postgres not connected');
      const needsReturning = sql.trim().toUpperCase().startsWith('INSERT');
      const pgSql = convertToPostgres(sql) + (needsReturning ? ' RETURNING id' : '');
      const res = await pgPool.query(pgSql, params);
      return {
        changes: res.rowCount,
        lastInsertRowid: res.rows[0]?.id || null,
      };
    } else {
      if (!sqliteClient) throw new Error('SQLite not connected');
      const result = await sqliteClient.execute({ sql, args: params });
      return {
        changes: Number(result.rowsAffected),
        lastInsertRowid: Number(result.lastInsertRowid),
      };
    }
  },

  async exec(sql) {
    await ensureConnected();
    if (isPostgres) {
      if (!pgPool) throw new Error('Postgres not connected');
      await pgPool.query(sql);
    } else {
      if (!sqliteClient) throw new Error('SQLite not connected');
      await sqliteClient.executeMultiple(sql);
    }
  }
};

export default db;
