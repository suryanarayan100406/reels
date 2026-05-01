import bcrypt from 'bcryptjs';
import db from './src/config/db.js';

const password = process.argv[2] || 'admin123';
const hash = bcrypt.hashSync(password, 10);

await db.exec('DELETE FROM admin');
await db.run('INSERT INTO admin (password_hash) VALUES (?)', hash);

console.log(`Admin password set to: ${password}`);
console.log(`Database type: ${process.env.POSTGRES_URL ? 'Vercel Postgres' : 'Local SQLite'}`);
process.exit(0);
