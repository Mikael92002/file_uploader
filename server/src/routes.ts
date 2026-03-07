import { Router } from "express";
import { getCurrentUserFromCookie } from "./controller/userController";
import {
  deleteFileFromCloudinaryAndDb,
  deleteManyFiles,
  fileUploadSuccess,
} from "./controller/fileController";
import { upload } from "./middleware/uploadMiddleWare";
import { logInPost, signOutGet, signUpPost } from "./controller/authController";
import {
  folderDelete,
  getAllUserFolders,
  postNewFolder,
} from "./controller/folderController";
import { getHealth } from "./controller/healthController";

export const userRoute = Router();
export const fileRouter = Router();
export const authRouter = Router();
export const folderRouter = Router();
export const healthRouter = Router();

// userRoute:
userRoute.get("/", getCurrentUserFromCookie);
// implement /:userID route, used to fetch user uploads:

// fileRoute:
// must be uploaded to a userID:
fileRouter.post(
  "/upload",
  upload("fileFolder").single("file"),
  ...fileUploadSuccess,
);
fileRouter.delete("/delete", deleteManyFiles);
fileRouter.delete("/:fileId", deleteFileFromCloudinaryAndDb);

// formRoute:
authRouter.post("/login", logInPost);
authRouter.post("/signup", ...signUpPost);
authRouter.get("/signout", signOutGet);

//folderRoute:
folderRouter.post("/", postNewFolder);
folderRouter.get("/:userId", getAllUserFolders);
folderRouter.delete("/:folderId", folderDelete);

//healthRoute (to ping render):
healthRouter.get("/", getHealth);
