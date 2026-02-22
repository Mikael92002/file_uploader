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
  });
  return newFolder;
}

export async function getRootFolderFromUser(userId: number) {
  // children should contain all folders:
  const rootFolder = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      folders: {
        include: {
          children: true,
          files: true,
        },
      },
    },
  });
  console.log(rootFolder?.folders[0]);
  return rootFolder?.folders[0];
}
