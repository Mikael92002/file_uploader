import multer from "multer";
import { NextFunction, Request, Response } from "express";
import { createNewFile, deleteFile } from "../db/queries";
import { CustomError } from "../Errors/CustomError";
import { deleteFileFromCloudinary } from "../middleware/deleteMiddleware";

export const fileUploadSuccess = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    return res.status(401).json({ error: "No user found from cookie" });
  }

  // should not happen if front end validated with "required":
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
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
  res.status(200).json({ newFile });
};

export const deleteFileFromCloudinaryAndDb = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    next(new CustomError("File delete failed: user not found", 401));
  }
  const deletedFile = await deleteFile(Number(req.params.fileId));
  if (deletedFile) {
    deleteFileFromCloudinary(urlExtractor(deletedFile.fileURL)!);
  }
  res.json(deletedFile);
};

function urlExtractor(url: string) {
  if (!url) {
    console.log("URL is undefined/null");
    return null;
  }
  const splitURL = url.split("/");
  let extractedURL: string = "";
  for (let i = 0; i < splitURL.length; i++) {
    if (splitURL[i] === "fileFolder") {
      for (let j = i; j < splitURL.length; j++) {
        extractedURL.concat(splitURL[j]! + "/");
      }
      return extractedURL;
    }
  }
  return null;
}

export const deleteManyFiles = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    next(new CustomError("Delete many files failed: no user found", 401));
  }
  const arrayOfFileURLS: [{ URL: string }] = JSON.parse(req.body);
  for (let i = 0; i < arrayOfFileURLS.length; i++) {
    const extractedURL = urlExtractor(arrayOfFileURLS[i]?.URL!);
    if (extractedURL) {
      deleteFileFromCloudinary(extractedURL);
    }
  }
  res.json(arrayOfFileURLS);
};
