/*
  Warnings:

  - You are about to drop the column `fileId` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `folderId` on the `Folder` table. All the data in the column will be lost.
  - Added the required column `folderId` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Folder` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_fileId_fkey";

-- DropForeignKey
ALTER TABLE "Folder" DROP CONSTRAINT "Folder_folderId_fkey";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "fileId",
ADD COLUMN     "folderId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Folder" DROP COLUMN "folderId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
