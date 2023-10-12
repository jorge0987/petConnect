/*
  Warnings:

  - You are about to alter the column `arquivo` on the `foto` table. The data in that column could be lost. The data in that column will be cast from `String` to `Binary`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_foto" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "arquivo" BLOB NOT NULL,
    "animal_id" TEXT NOT NULL,
    CONSTRAINT "foto_animal_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "Animal" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_foto" ("animal_id", "arquivo", "id") SELECT "animal_id", "arquivo", "id" FROM "foto";
DROP TABLE "foto";
ALTER TABLE "new_foto" RENAME TO "foto";
CREATE UNIQUE INDEX "foto_id_key" ON "foto"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
