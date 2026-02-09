import { prisma } from "../lib/prisma";
import passport from "passport";
import { body, validationResult, matchedData } from "express-validator";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";

export const logInPost = passport.authenticate("local", {
  successRedirect: "/success",
  failureRedirect: "/failure",
});

const validateUser = [
  body("username")
    .matches(/^[^\s]{1,20}$/)
    .withMessage(
      "Username can only contain alphabets, numbers, or special symbols and must be less than 20 characters",
    )
    .custom(async (value) => {
      const user = await prisma.user.findUnique({
        where: {
          username: value,
        },
      });
      if (user) {
        throw new Error("Username is already taken");
      }
    }),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must contain 8 letters")
    .matches(/\d/)
    .withMessage("Password must contain at least number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password must contain at least one special character")
    .matches(/[a-zA-Z]/)
    .withMessage("Password must contain at least one letter"),
];

export const signUpPost = [
  validateUser,
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    try {
      const { username, password } = matchedData(req);
      const hashedPassword = await bcrypt.hash(password, 10);
      const addUserQuery = prisma.user.create({
        data: {
          username: username,
          password: hashedPassword,
        },
      });
      res.json({ success: true, errors: [] });
    } catch (e) {
      return next(e);
    }
  },
];
