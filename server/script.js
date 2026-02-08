"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("./src/lib/prisma");
async function main() {
    // Create a new user with a post
    const user = await prisma_1.prisma.user.create({
        data: {
            name: 'Alice',
            email: 'alice@prisma.io',
            posts: {
                create: {
                    title: 'Hello World',
                    content: 'This is my first post!',
                    published: true,
                },
            },
        },
        include: {
            posts: true,
        },
    });
    console.log('Created user:', user);
    // Fetch all users with their posts
    const allUsers = await prisma_1.prisma.user.findMany({
        include: {
            posts: true,
        },
    });
    console.log('All users:', JSON.stringify(allUsers, null, 2));
}
main()
    .then(async () => {
    await prisma_1.prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma_1.prisma.$disconnect();
    process.exit(1);
});
//# sourceMappingURL=script.js.map