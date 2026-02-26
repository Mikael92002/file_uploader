import { prisma } from "../lib/prisma";

async function insertIntoSecondSublevel() {
  const insertQuery = await prisma.folder.create({
    data: {
      folderName: "second sub folder",
      userId: 1,
      parentId: 12,
    },
    include: {
      files: true,
      children: true,
    },
  });
}

insertIntoSecondSublevel()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
