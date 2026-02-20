import multer from "multer";
import { Request, Response } from "express";

// remember to check if(req.user on each step!!!)

// To download to disk locally:
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/uploads");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix + ".png");
    },
  });

  export const upload = multer({storage: storage}).single('file');

  export const fileUploadSuccess = (req: Request, res: Response) =>{
    res.json({success: true, message: "file upload successful"});
  }

  // use if (req.user) to verify user: