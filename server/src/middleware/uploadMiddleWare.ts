import multer from "multer";
import {CloudinaryStorage} from "multer-storage-cloudinary";
import cloudinary from "./cloudinaryConfig";
import path from "node:path";
import { Request } from "express";
import { CustomError } from "../Errors/CustomError";


export const upload = (folderName: string) => {
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req: Request, file: Express.Multer.File) => {
      const folderPath = `${folderName.trim()}`;
      const fileExtension = path.extname(file.originalname).substring(1);
      const publicId = `${file.fieldname}-${Date.now()}`;

      return {
        folder: folderPath,
        public_id: publicId,
        format: fileExtension,
      };
    },
  });
  return multer({
    storage: storage,
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
    fileFilter: function (req: Request, file, cb) {
      checkFileType(file, cb);
    },
  });
};

function checkFileType(
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    return cb(new CustomError(`File upload failed: ${path.extname(file.originalname)} not supported`, 415));
  }
}
