-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Animal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "especie" TEXT NOT NULL,
    "raca" TEXT NOT NULL,
    "idade" TEXT NOT NULL,
    "tamanho" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "personalidade" TEXT NOT NULL,
    "adotado" BOOLEAN NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "Animal_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Animal" ("adotado", "descricao", "especie", "id", "idade", "personalidade", "raca", "sexo", "tamanho", "user_id") SELECT "adotado", "descricao", "especie", "id", "idade", "personalidade", "raca", "sexo", "tamanho", "user_id" FROM "Animal";
DROP TABLE "Animal";
ALTER TABLE "new_Animal" RENAME TO "Animal";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
