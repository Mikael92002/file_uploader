import { NextFunction, Request, Response } from "express";
import { CustomError } from "../Errors/CustomError";

export const getCurrentUserFromCookie = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.user) {
    res.json({
      user: { id: req.user.id, username: req.user.username },
    });
  } else {
    res.json({ user: null });
  }
};

// use if(req.user) to do other functions

// in addition to above, send 401 to signal
// front end to clear "user" state!!!
