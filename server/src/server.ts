import app from "./app";
import { prisma } from "./lib/prisma";

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Listening on ${port}`);
  server.on("error", (err: NodeJS.ErrnoException) => {
    console.error(err);
  });
});

async function testDbConnection() {
  try {
    await prisma.$connect();
    console.log("connected to neon db");
  } catch (err) {
    console.error("neon db connection failed");
    process.exit(1);
  }
}

testDbConnection();