import { NextFunction, Request, Response } from "express";
import { CustomError } from "../Errors/CustomError";

export const getCurrentUserFromCookie = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.user) {
    res.json({ success: true, user: req.user });
  } else {
    next(new CustomError("User not found from current cookie", 401));
  }
};

// use if(req.user) to do other functions

// in addition to above, send 401 to signal
// front end to clear "user" state!!!