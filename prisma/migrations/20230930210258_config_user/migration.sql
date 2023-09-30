-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "endereco" TEXT,
    "cnpj" TEXT,
    "contato" TEXT NOT NULL,
    "historico" TEXT,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL
);
INSERT INTO "new_user" ("cnpj", "contato", "email", "endereco", "historico", "id", "nome", "senha") SELECT "cnpj", "contato", "email", "endereco", "historico", "id", "nome", "senha" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_cnpj_key" ON "user"("cnpj");
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
