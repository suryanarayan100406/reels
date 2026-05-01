import { createClient } from '@libsql/client';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const tursoUrl = process.env.TURSO_DATABASE_URL;
const tursoToken = process.env.TURSO_AUTH_TOKEN;

const client = createClient(
  tursoUrl
    ? { url: tursoUrl, authToken: tursoToken }
    : { url: `file:${path.join(__dirname, 'data/app.db')}` }
);

const password = process.argv[2] || 'admin123';
const hash = bcrypt.hashSync(password, 10);

await client.executeMultiple(`
  CREATE TABLE IF NOT EXISTS admin (id INTEGER PRIMARY KEY, password_hash TEXT NOT NULL);
`);
await client.execute({ sql: 'DELETE FROM admin', args: [] });
await client.execute({ sql: 'INSERT INTO admin (password_hash) VALUES (?)', args: [hash] });

console.log(`Admin password set to: ${password}`);
console.log(`Database: ${tursoUrl || 'local file'}`);
