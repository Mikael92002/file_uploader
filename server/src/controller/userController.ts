import { Request, Response } from "express";

export const getCurrentUserFromCookie = async (req: Request, res: Response) => {
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({});
  }
};
