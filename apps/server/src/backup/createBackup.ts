import fs from "fs";
import path from "path";
import Database from "better-sqlite3";

const DB_PATH = path.resolve("blog.db");
const BACKUP_DIR = path.resolve("backups");
const LOCK_FILE = path.join(BACKUP_DIR, "backup.lock");

export async function createBackup() {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });

  try {
    // atomic creation of lock file
    fs.writeFileSync(LOCK_FILE, "", { flag: "wx" });
  } catch {
    console.log("Backup skipped: another backup is running");
    return;
  }
  try {
    const timestamp = new Date()
      .toISOString()
      .replace(/[:.]/g, "-");

    const backupPath = path.join(
      BACKUP_DIR,
      `blog-${timestamp}.db`
    );

    const db = new Database(DB_PATH);

    try {
      await db.backup(backupPath);

      // check backup integrity
      const backupDb = new Database(backupPath);
      const result = backupDb.prepare("PRAGMA integrity_check").get() as { integrity_check: string };

      backupDb.close();

      if (result.integrity_check !== "ok") {
        throw new Error("Backup integrity check failed");
      }
    } finally {
      db.close();
    }

    cleanupOldBackups();

    console.log("Backup created:", backupPath);
  } finally {
    fs.unlinkSync(LOCK_FILE);
  }
}

function cleanupOldBackups() {
  console.log("Cleaning old backups");
  const files = fs
    .readdirSync(BACKUP_DIR)
    .filter(f => f.endsWith(".db"))
    .sort()
    .reverse();

  const MAX_BACKUPS = 10;

  files.slice(MAX_BACKUPS).forEach(file => {
    fs.unlinkSync(path.join(BACKUP_DIR, file));
  });
}
  