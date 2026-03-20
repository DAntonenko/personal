import fs from "fs";
import path from "path";
import Database from "better-sqlite3";

const DB_PATH = path.resolve("blog.db");
const BACKUP_DIR = path.resolve("backups");

export async function restoreFromBackup(file: string) {
  const backupPath = path.join(BACKUP_DIR, file);

  if (!fs.existsSync(backupPath)) {
    throw new Error("Backup not found");
  }

  if (fs.existsSync(DB_PATH)) {
    const tempBackup = DB_PATH + ".before-restore";
    fs.copyFileSync(DB_PATH, tempBackup);
    console.log("Created temporary backup:", tempBackup);
  }

  const backupDb = new Database(backupPath);
  const db = new Database(DB_PATH);

  try {
    await backupDb.backup(DB_PATH);
  } finally {
    backupDb.close();
    db.close();
  }

  console.log("Database restored from:", backupPath);
}
