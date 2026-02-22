/*
  Warnings:

  - A unique constraint covering the columns `[fileName,folderId]` on the table `File` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "File_fileName_key";

-- CreateIndex
CREATE UNIQUE INDEX "File_fileName_folderId_key" ON "File"("fileName", "folderId");
