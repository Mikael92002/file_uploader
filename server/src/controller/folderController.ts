import {
  createNewFolder,
  getAllFoldersFromUserId,
} from "../db/queries";
import { NextFunction, Request, Response } from "express";
import { CustomError } from "../Errors/CustomError";

export const postNewFolder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    next(new CustomError("Folder POST failed: no user found", 401));
  }

  const userId = req.user.id;
  console.log(req.body);
  const { folderName, parentId } = req.body;
  const query = await createNewFolder(userId, folderName, parentId);
  res.json(query);
};

export const getAllUserFolders = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    next(new CustomError("Folder GET failed: no user found", 401));
  }
  if (!req.params.userId) {
    next(new CustomError("Folder GET failed: no user specified", 400));
  }

  const prismaQuery = await getAllFoldersFromUserId(Number(req.params.userId));
  
  res.json(prismaQuery );
};
