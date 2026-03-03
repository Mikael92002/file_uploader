/*
  Warnings:

  - You are about to alter the column `fileName` on the `File` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(25)`.
  - You are about to alter the column `folderName` on the `Folder` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(25)`.

*/
-- AlterTable
ALTER TABLE "File" ALTER COLUMN "fileName" SET DATA TYPE VARCHAR(25);

-- AlterTable
ALTER TABLE "Folder" ALTER COLUMN "folderName" SET DATA TYPE VARCHAR(25);
