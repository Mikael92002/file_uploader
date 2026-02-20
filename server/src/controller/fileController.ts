import multer from "multer";
import { Request, Response } from "express";

export const fileUploadSuccess = (req: Request, res: Response) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ success: false, error: "No user found from cookie" });
  }
  if (!req.params.userID) {
    return res
      .status(400)
      .json({ success: false, error: "Missing userID in request" });
  }
  // should not happen if front end validated with "required":
  if (!req.file) {
    return res.status(400).json({ success: false, error: "No file uploaded" });
  }

  const fileURL = req.file.path;

  res.status(200).json({ success: true, fileURL: fileURL });
};
