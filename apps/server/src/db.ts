import Database from "better-sqlite3";

export const db = new Database("blog.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    authorId TEXT NOT NULL,
    createdAt TEXT NOT NULL
  )
`);
