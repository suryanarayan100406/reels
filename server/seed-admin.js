import Database from 'better-sqlite3';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const defaultDbPath = path.join(__dirname, 'data/app.db');
const dbPath = process.env.DATABASE_PATH || defaultDbPath;

const db = new Database(dbPath);

db.exec('CREATE TABLE IF NOT EXISTS admin (id INTEGER PRIMARY KEY, password_hash TEXT NOT NULL)');

const password = process.argv[2] || 'admin123';
const hash = bcrypt.hashSync(password, 10);

db.prepare('DELETE FROM admin').run();
db.prepare('INSERT INTO admin (password_hash) VALUES (?)').run(hash);

console.log(`Admin password set to: ${password}`);
console.log(`Database used: ${dbPath}`);
