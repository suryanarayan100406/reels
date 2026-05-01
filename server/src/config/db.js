import { put, list, del } from '@vercel/blob';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOCAL_DB_PATH = path.join(__dirname, '../../data/db_backup.json');

// Memory cache to avoid excessive Blob reads
let cache = {
  admin: [],
  reels: [],
  reactions: [],
  site_content: []
};
let isLoaded = false;

async function loadData() {
  if (isLoaded) return;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      // Find the latest DB file in Vercel Blob
      const { blobs } = await list({ prefix: 'db_v1.json' });
      if (blobs.length > 0) {
        const response = await fetch(blobs[0].url);
        cache = await response.json();
      }
    } catch (err) {
      console.error('Failed to load from Vercel Blob, using empty state:', err);
    }
  } else if (fs.existsSync(LOCAL_DB_PATH)) {
    try {
      cache = JSON.parse(fs.readFileSync(LOCAL_DB_PATH, 'utf8'));
    } catch (err) {
      console.error('Failed to load local DB:', err);
    }
  }
  
  // Ensure all collections exist
  cache.admin = cache.admin || [];
  cache.reels = cache.reels || [];
  cache.reactions = cache.reactions || [];
  cache.site_content = cache.site_content || [];
  
  isLoaded = true;
}

async function saveData() {
  const dataString = JSON.stringify(cache, null, 2);
  
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      // We overwrite by using the same name. Vercel Blob adds a unique suffix to the URL,
      // but 'put' with the same pathname is the standard way to "update".
      await put('db_v1.json', dataString, {
        access: 'public',
        addRandomSuffix: false // Keeping it simple
      });
    } catch (err) {
      console.error('Failed to save to Vercel Blob:', err);
    }
  } else {
    // Local development
    const dir = path.dirname(LOCAL_DB_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(LOCAL_DB_PATH, dataString);
  }
}

const db = {
  /** Mimics db.get(sql, params) */
  async get(sql, ...params) {
    await loadData();
    const sqlLower = sql.toLowerCase();

    if (sqlLower.includes('from admin')) {
      return cache.admin[0] || null;
    }

    if (sqlLower.includes('from reels') && sqlLower.includes('where id = ?')) {
      return cache.reels.find(r => r.id === params[0]) || null;
    }

    if (sqlLower.includes('from site_content') && sqlLower.includes('where key = ?')) {
      const item = cache.site_content.find(c => c.key === params[0]);
      return item || null;
    }

    if (sqlLower.includes('from reactions') && sqlLower.includes('where reel_id = ? AND visitor_id = ?')) {
        return cache.reactions.find(r => r.reel_id == params[0] && r.visitor_id == params[1]) || null;
    }

    return null;
  },

  /** Mimics db.all(sql, params) */
  async all(sql, ...params) {
    await loadData();
    const sqlLower = sql.toLowerCase();

    if (sqlLower.includes('from reels')) {
      // Handle the complex gallery query with reaction counts and visitor status
      const visitor_id = params[0];
      return cache.reels.map(reel => {
        const reactions = cache.reactions.filter(rx => rx.reel_id === reel.id);
        return {
          ...reel,
          reaction_count: reactions.length,
          has_reacted: reactions.some(rx => rx.visitor_id === visitor_id)
        };
      }).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    return [];
  },

  /** Mimics db.run(sql, params) */
  async run(sql, ...params) {
    await loadData();
    const sqlLower = sql.toLowerCase();

    if (sqlLower.startsWith('insert into admin')) {
      cache.admin = [{ id: 1, password_hash: params[0] }];
      await saveData();
      return { changes: 1, lastInsertRowid: 1 };
    }

    if (sqlLower.startsWith('insert into reels')) {
      const newReel = {
        id: Date.now(), // Use timestamp as simple ID
        instagram_url: params[0],
        embed_html: params[1],
        thumbnail_url: params[2],
        personal_note: params[3],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      cache.reels.push(newReel);
      await saveData();
      return { changes: 1, lastInsertRowid: newReel.id };
    }

    if (sqlLower.startsWith('insert into reactions')) {
      cache.reactions.push({
        id: Date.now(),
        reel_id: Number(params[0]),
        visitor_id: params[1],
        created_at: new Date().toISOString()
      });
      await saveData();
      return { changes: 1 };
    }

    if (sqlLower.startsWith('delete from reactions')) {
        // Simple mock for toggle
        if (sqlLower.includes('where id = ?')) {
            cache.reactions = cache.reactions.filter(r => r.id !== params[0]);
        } else {
            // Probably the toggle case in reactions route
            // This is handled by the higher level logic usually, but let's be safe
        }
        await saveData();
        return { changes: 1 };
    }

    if (sqlLower.startsWith('update reels')) {
        const id = Number(params[4]);
        const reel = cache.reels.find(r => r.id === id);
        if (reel) {
            reel.instagram_url = params[0];
            reel.embed_html = params[1];
            reel.thumbnail_url = params[2];
            reel.personal_note = params[3];
            reel.updated_at = new Date().toISOString();
        }
        await saveData();
        return { changes: reel ? 1 : 0 };
    }

    if (sqlLower.startsWith('delete from reels')) {
        const id = Number(params[0]);
        const initialCount = cache.reels.length;
        cache.reels = cache.reels.filter(r => r.id !== id);
        cache.reactions = cache.reactions.filter(rx => rx.reel_id !== id);
        await saveData();
        return { changes: initialCount - cache.reels.length };
    }

    if (sqlLower.startsWith('update site_content')) {
        const key = params[1];
        const value = params[0];
        const existing = cache.site_content.find(c => c.key === key);
        if (existing) {
            existing.value = value;
            existing.updated_at = new Date().toISOString();
        } else {
            cache.site_content.push({ key, value, updated_at: new Date().toISOString() });
        }
        await saveData();
        return { changes: 1 };
    }

    if (sqlLower.startsWith('delete from admin')) {
        cache.admin = [];
        await saveData();
        return { changes: 1 };
    }

    return { changes: 0 };
  },

  /** Mimics db.exec(sql) */
  async exec(sql) {
    // No-op for schema creation as we are using JSON
    console.log('JSON DB: Schema check ignored');
  }
};

export default db;
