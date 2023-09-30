/*
  Warnings:

  - You are about to drop the `Adotante` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Instituicao` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Adotante";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Instituicao";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "contato" TEXT NOT NULL,
    "historico" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "animal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "especie" TEXT NOT NULL,
    "raca" TEXT NOT NULL,
    "idade" TEXT NOT NULL,
    "tamanho" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "personalidade" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_cnpj_key" ON "user"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
