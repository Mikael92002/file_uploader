import express, { Response, Request } from "express";
import path from "node:path";
import "dotenv/config"
import { PrismaClient } from "./generated/prisma/client"; // import prisma client
import { PrismaSessionStore } from "@quixo3/prisma-session-store"; // for prisma sessions
import { PrismaPg } from "@prisma/adapter-pg";
import expressSession from "express-session";
import "./middleware/auth";
import passport from "passport";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    secret: "a santa at nasa",
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(prisma as any, {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
    }),
  }),
);

app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/members-only/dist")));
  app.get("/{*splat}", (req: Request, res: Response) => {
    res.sendFile(
      path.join(__dirname, "../client/members-only/dist", "index.html"),
    );
  });
}



export default app;
