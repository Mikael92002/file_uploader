// src/app.ts
import { prisma } from "./lib/prisma";

async function main(): Promise<void> {
  console.log("🚀 Starting app (CommonJS mode)");
  console.log("🔍 Checking Prisma connection...");

  await prisma.$connect();

  const result = await prisma.$queryRaw<
    { now: Date }[]
  >`SELECT NOW() AS now`;

  console.log("✅ Prisma connected");
  console.log("🕒 DB time:", result[0].now.toISOString());
}

main()
  .catch((err) => {
    console.error("❌ Startup error:");
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("🔌 Prisma disconnected");
  });
