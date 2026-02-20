import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import config from "./cloudinaryConfig";
import path from "node:path";
import { Request } from "express";

function uploadMiddleware(folderName: string) {
  const storage = new CloudinaryStorage({
    cloudinary: config,
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
  });
}
