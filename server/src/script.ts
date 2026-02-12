import { prisma } from "./lib/prisma";
import bcrypt from "bcryptjs";

// async function main() {
//   // Create a new user with a post
// //   const user = await prisma.user.create({
// //     data: {
// //       name: "Alice",
// //       email: "alice@prisma.io",
// //       posts: {
// //         create: {
// //           title: "Hello World",
// //           content: "This is my first post!",
// //           published: true,
// //         },
// //       },
// //     },
// //     include: {
// //       posts: true,
// //     },
// //   });

//   const anotherUser = await prisma.user.create({
//     data: {
//       name: "marcoPolo",
//       email: "marco@gmail.com",
//     },
//   });
// //   console.log("Created user:", user);

//   // Fetch all users with their posts
//   const allUsers = await prisma.user.findMany({
//     include: {
//       posts: true,
//     },
//   });
//   console.log("All users:", JSON.stringify(allUsers, null, 2));
// }

async function seed() {
  const hashedPassword = await bcrypt.hash("123", 10);
  const user = await prisma.user.create({
    data: {
      username: "Mik",
      password: hashedPassword,
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
