import { prisma } from "../lib/prisma";

async function createNewFile(
  fileName: string,
  fileUrl: string,
  size: number,
  folderId: number,
) {
  const newFile = prisma.file.create({
    data: {
      folderId: folderId,
      fileName: fileName,
      fileURL: fileUrl,
      size: size,
      uploadTime: new Date(),
    },
  });
}
