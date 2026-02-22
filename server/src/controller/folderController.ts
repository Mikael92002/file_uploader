import { createNewFolder, getRootFolderFromUser } from "../db/queries";
import { NextFunction, Request, Response } from "express";
import { CustomError } from "../Errors/CustomError";

export const postNewFolder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    next(new CustomError("Folder post failed: no user found", 401));
  }

  const userId = req.user.id;
  console.log(req.body);
  const { folderName, parentId } = req.body;
  const query = await createNewFolder(userId, folderName, parentId);
  res.json(query);
};

export const getRootFolder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    next(new CustomError("Root Folder get failed: no user found", 401));
  }
  const query = await getRootFolderFromUser(req.user.id);
  res.json(query);
};
