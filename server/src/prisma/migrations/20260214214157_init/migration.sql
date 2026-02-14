-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_fileId_fkey";

-- DropForeignKey
ALTER TABLE "Folder" DROP CONSTRAINT "Folder_parentId_fkey";

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "Folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
