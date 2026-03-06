import { prisma } from "./lib/prisma";
import bcrypt from "bcryptjs";

async function seed() {
  const hashedPassword = await bcrypt.hash("123", 10);
  const user = await prisma.user.create({
    data: {
      username: "Mik",
      password: hashedPassword,
      folders: {
        create: {
          folderName: "root folder",
          files: {
            create: {
              fileName: "test file",
              fileURL: "test URL",
              size: 100,
              uploadTime: new Date(Date.now()),
            },
          },
        },
      },
    },
    include: {
      folders: true,
    },
  });
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });