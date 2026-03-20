import { Router } from "express";
import { db } from "../db";
import { requireAuth } from "../middleware/requireAuth";
import crypto from "node:crypto";
import { createBackup } from "../backup/createBackup";

export const postsRouter = Router();

postsRouter.post("/", requireAuth, (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Invalid payload" });
  }

  const id = crypto.randomUUID();

  db.prepare(`
    INSERT INTO posts (id, title, content, authorId, createdAt)
    VALUES (?, ?, ?, ?, ?)
  `).run(
    id,
    title,
    content,
    req.user!.id,               // !
    new Date().toISOString()
  );

  try {
    createBackup();
  } catch (err) {
    console.error("Backup failed:", err);
  }

  res.status(201).json({
    id,
  });
});

postsRouter.get("/", (req, res) => {
  const rows = db
    .prepare(
      `
      SELECT id, title, content, authorId, createdAt
      FROM posts
      ORDER BY createdAt DESC
      `
    )
    .all();

  res.json(rows);
});

// get one post
postsRouter.get("/:id", requireAuth, (req, res) => {
  const post = db
    .prepare(
      `SELECT id, title, content, authorId, createdAt
       FROM posts
       WHERE id = ?`
    )
    .get(req.params.id);

  if (!post) {
    return res.status(404).json({ error: "Not found" });
  }

  res.json(post);
});

postsRouter.put("/:id", requireAuth, (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Invalid payload" });
  }

  const post = db
    .prepare(`SELECT authorId FROM posts WHERE id = ?`)
    .get(id) as { authorId: string } | undefined;

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  // only author or admin
  if (
    post.authorId !== req.user!.id &&
    req.user!.role !== "admin"
  ) {
    return res.status(403).json({ error: "Forbidden" });
  }

  db.prepare(`
    UPDATE posts
    SET title = ?, content = ?
    WHERE id = ?
  `).run(title, content, id);

  try {
    createBackup();
  } catch (err) {
    console.error("Backup failed:", err);
  }

  res.json({ ok: true });
});

postsRouter.delete("/:id", requireAuth, (req, res) => {
  const { id } = req.params;

  const post = db
    .prepare(`SELECT authorId FROM posts WHERE id = ?`)
    .get(id) as { authorId: string } | undefined;

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  if (!id) {
    return res.status(400).json({ error: "Invalid id" });
  }

  // only author or admin
  if (
    post.authorId !== req.user!.id &&
    req.user!.role !== "admin"
  ) {
    return res.status(403).json({ error: "Forbidden" });
  }

  db.prepare(`DELETE FROM posts WHERE id = ?`).run(id);

  res.json({ ok: true });
});
