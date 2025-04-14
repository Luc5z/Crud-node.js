import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const dbPromise = open({
  filename: './src/database/db.sqlite',
  driver: sqlite3.Database,
});
