-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_foto" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "arquivo" TEXT NOT NULL,
    "animal_id" TEXT NOT NULL,
    CONSTRAINT "foto_animal_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "Animal" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_foto" ("animal_id", "arquivo", "id") SELECT "animal_id", "arquivo", "id" FROM "foto";
DROP TABLE "foto";
ALTER TABLE "new_foto" RENAME TO "foto";
CREATE UNIQUE INDEX "foto_id_key" ON "foto"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
