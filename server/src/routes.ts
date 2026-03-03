import { Router } from "express";
import { getCurrentUserFromCookie } from "./controller/userController";
import { fileUploadSuccess } from "./controller/fileController";
import { upload as uploadMiddleWare } from "./middleware/uploadMiddleWare";
import { logInPost, signOutGet, signUpPost } from "./controller/authController";
import {
  folderDelete,
  getAllUserFolders,
  postNewFolder,
} from "./controller/folderController";
import { deleteFolder } from "./db/queries";

export const userRoute = Router();
export const fileRouter = Router();
export const authRouter = Router();
export const folderRouter = Router();

// userRoute:
userRoute.get("/", getCurrentUserFromCookie);
// implement /:userID route, used to fetch user uploads:

// fileRoute:
// must be uploaded to a userID:
const upload = uploadMiddleWare("fileFolder");
fileRouter.post("/upload", upload.single("file"), fileUploadSuccess);

// formRoute:
authRouter.post("/login", logInPost);
authRouter.post("/signup", ...signUpPost);
authRouter.get("/signout", signOutGet);

//folderRoute:
folderRouter.post("/", postNewFolder);
folderRouter.get("/:userId", getAllUserFolders);
folderRouter.delete("/:folderId", folderDelete);
