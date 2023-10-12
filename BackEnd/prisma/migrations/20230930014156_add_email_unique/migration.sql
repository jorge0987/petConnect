/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Adotante` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Adotante_email_key" ON "Adotante"("email");
