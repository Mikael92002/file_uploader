import { prisma } from "../lib/prisma";

export async function createNewFile(
  fileName: string,
  fileUrl: string,
  size: number,
  folderId: number,
) {
  const newFile = await prisma.file.create({
    data: {
      folderId: folderId,
      fileName: fileName,
      fileURL: fileUrl,
      size: size,
      uploadTime: new Date(),
    },
  });
  return newFile;
}

export async function createNewFolder(
  userId: number,
  folderName: string,
  parentId: number,
) {
  const newFolder = await prisma.folder.create({
    data: {
      folderName: folderName,
      userId: userId,
      parentId: parentId || null,
    },
    include: {
      files: true,
      children: true,
    },
  });
  return newFolder;
}

export async function getAllFoldersFromUserId(id: number) {
  const folders = await prisma.folder.findMany({
    where: {
      userId: id,
    },
    include: {
      files: true,
    },
  });
  return folders;
}

export async function deleteFolder(id: number) {
  const deletedFolder = await prisma.folder.delete({
    where: {
      id: id,
    },
  });
  return deletedFolder;
}

export async function deleteFile(id: number) {
  const deletedFile = await prisma.file.delete({
    where: {
      id: id,
    },
  });
  return deletedFile;
}
