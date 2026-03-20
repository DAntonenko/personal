import { createBackup } from "../backup/createBackup";
import { restoreFromBackup } from "../backup/restoreFromBackup";

const command = process.argv[2];

if (command === "create") {
  createBackup();
}

if (command === "restore") {
  const file = process.argv[3];

  if (!file) {
    console.error("Specify backup file");
    process.exit(1);
  }

  restoreFromBackup(file);
}
