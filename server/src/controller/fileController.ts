import multer from "multer";
import { NextFunction, Request, Response } from "express";
import { createNewFile } from "../db/queries";
import { CustomError } from "../Errors/CustomError";

export const fileUploadSuccess = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    return res
      .status(401)
      .json({error: "No user found from cookie" });
  }

  // should not happen if front end validated with "required":
  if (!req.file) {
    return res.status(400).json({error: "No file uploaded" });
  }
  const maxSize = 5 * 1024 * 1024;
  const fileSize = req.file.size;
  if (fileSize > maxSize) {
    return next(new CustomError("File too large", 413));
  }

  const fileURL = req.file.path;
  const folderId = Number(req.body.folderId);
  const fileName = req.body.fileName;
  // upload file to db:
  const newFile = await createNewFile(fileName, fileURL, fileSize, folderId);
  console.log(newFile);
  res.status(200).json({newFile});
};

