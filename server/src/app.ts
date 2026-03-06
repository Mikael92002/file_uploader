import express, { Response, Request, NextFunction } from "express";
import path from "node:path";
import "dotenv/config";
import { PrismaClient } from "./generated/prisma/client"; // import prisma client
import { PrismaSessionStore } from "@quixo3/prisma-session-store"; // for prisma sessions
import { PrismaPg } from "@prisma/adapter-pg";
import expressSession from "express-session";
import "./middleware/auth";
import passport from "passport";
import { fileRouter, authRouter, userRoute, folderRouter } from "./routes";
import cors from "cors";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const app = express();

// 1. security:
const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true, // for passport.js
  }),
);
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

// 2. parsers:
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// 3. session:
app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
    },
    secret: process.env.SECRET!,
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(prisma as any, {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
    }),
  }),
);


// 4. passport:
app.use(passport.initialize());
app.use(passport.session());

// 5. routes:
app.use("/api/user", userRoute);
app.use("/api/file", fileRouter);
app.use("/api/auth", authRouter);
app.use("/api/folder", folderRouter);

// 6. error handler:
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  const statusCode = err.status || 500;

  res.status(statusCode).json({
    message: err.message || "Internal server error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

export default app;
