import { NextFunction, Request, Response } from "express";

export const getCurrentUserFromCookie = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.user) {
    res.json({ user: req.user });
  } else {
    throw new Error("User not found from current cookie");
  }
};
