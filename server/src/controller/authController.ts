import { prisma } from "../lib/prisma";
import passport from "passport";
import { body, validationResult, matchedData } from "express-validator";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";

export const logInPost = passport.authenticate("local", {
  successRedirect: "/success",
  failureRedirect: "/failure",
});

const checkDatabaseHealth = async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    console.log("Database connection is healthy.");
    return true;
  } catch (e: any) {
    console.error("Database connection failed:", e.message);
    return false;
  }
};

const databaseHealthPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const health = await checkDatabaseHealth();
  if (!health) {
    return res
      .status(400)
      .json({
        errors: [{msg: "Database server is down, please try again later"}] },
      );
  }
  next();
};

const validateUser = [
  body("username")
    .matches(/^[^\s]{1,20}$/)
    .withMessage(
      "Username can only contain alphabets, numbers, or special symbols and must be less than 20 characters",
    )
    .custom(async (value) => {
      try {
        const user = await prisma.user.findUnique({
          where: {
            username: value,
          },
        });
        if (user) {
          throw new Error("Username is already taken"); // or next(new Error("message here"))
        }
      } catch (e) {
        throw new Error("Server is not responding, please try again later");
      }
    }),
  body("password"),
  body("confirmPassword")
    .isLength({ min: 8 })
    .withMessage("Password must contain 8 characters")
    .matches(/\d/)
    .withMessage("Password must contain at least 1 number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password must contain at least 1 special character")
    .matches(/[a-zA-Z]/)
    .withMessage("Password must contain at least 1 letter")
    .custom(async (confirmPassword, { req }) => {
      const password = req.body.password;

      if (password !== confirmPassword) {
        throw new Error("Passwords must match");
      }
    }),
];

export const signUpPost = [
  databaseHealthPost,
  validateUser,
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    try {
      const { username, password } = matchedData(req);
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          username: username,
          password: hashedPassword,
          folders: {
            create: {
              folderName: "root",
            },
          },
        },
        include: {
          folders: true,
        },
      });
      res.json({ errors: [] });
    } catch (e) {
      return next(e);
    }
  },
];

export const signOutGet = (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.end();
  });
};
