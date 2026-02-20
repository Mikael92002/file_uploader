import { Router } from "express";
import { getCurrentUserFromCookie } from "./controller/userController";
import { fileUploadSuccess, upload } from "./controller/fileController";
import { logInPost, signOutGet, signUpPost } from "./controller/authController";

export const userRoute = Router();
export const fileRouter = Router();
export const authRouter = Router();

// userRoute:
userRoute.get("/", getCurrentUserFromCookie);
// implement /:userID route, used to fetch user uploads:

// fileRoute:
fileRouter.post("/upload", upload, fileUploadSuccess);
// fileRouter.get("/user/:userID", /*fetch user folders*/)

// formRoute:
authRouter.post("/login", logInPost);
authRouter.post("/signup", ...signUpPost);
authRouter.get("/signout", signOutGet);
