import { Router } from "express";
import { getCurrentUserFromCookie } from "./controller/userController";
import { fileUploadSuccess } from "./controller/fileController";
import { upload } from "./middleware/uploadMiddleWare";
import { logInPost, signOutGet, signUpPost } from "./controller/authController";
import { getRootFolder, postNewFolder } from "./controller/folderController";

export const userRoute = Router();
export const fileRouter = Router();
export const authRouter = Router();
export const folderRouter = Router();

// userRoute:
userRoute.get("/", getCurrentUserFromCookie);
// implement /:userID route, used to fetch user uploads:

// fileRoute:
// must be uploaded to a userID:
fileRouter.post("/upload/{:userID}", upload, fileUploadSuccess);
// fileRouter.get("/user/:userID?", /*fetch user folders*/)

// formRoute:
authRouter.post("/login", logInPost);
authRouter.post("/signup", ...signUpPost);
authRouter.get("/signout", signOutGet);

//folderRoute:
folderRouter.post("/", postNewFolder)
folderRouter.get("/", getRootFolder);