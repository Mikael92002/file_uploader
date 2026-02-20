import multer from "multer";
import { Request, Response } from "express";

// remember to check if(req.user on each step!!!)

// To download to disk locally:
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "public/uploads");
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//       cb(null, file.fieldname + "-" + uniqueSuffix + ".png");
//     },
//   });

//   export const upload = multer({storage: storage}).single('file');

//   export const fileUploadSuccess = (req: Request, res: Response) =>{
//     res.json({success: true, message: "file upload successful"});
//   }

// use if (req.user) to verify user:

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
