/*
  Warnings:

  - You are about to drop the `animal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "user_email_key";

-- DropIndex
DROP INDEX "user_cnpj_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "animal";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "user";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tipo_usuario" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "endereco" TEXT,
    "cnpj" TEXT,
    "contato" TEXT NOT NULL,
    "historico" TEXT,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Animal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "especie" TEXT NOT NULL,
    "raca" TEXT NOT NULL,
    "idade" TEXT NOT NULL,
    "tamanho" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "personalidade" TEXT NOT NULL,
    "adotado" BOOLEAN NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "Animal_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Interesse" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "animal_id" TEXT NOT NULL,
    CONSTRAINT "Interesse_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Interesse_animal_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "Animal" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

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

-- CreateIndex
CREATE UNIQUE INDEX "User_cnpj_key" ON "User"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Interesse_id_key" ON "Interesse"("id");
