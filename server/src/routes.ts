import { Router } from "express";
import { getCurrentUserFromCookie } from "./controller/userController";
import { fileUploadSuccess, upload } from "./controller/fileController";
import { logInPost, signUpPost } from "./controller/formController";

export const userRoute = Router();
export const fileRouter = Router();
export const formRouter = Router();

// userRoute:
userRoute.get("/", getCurrentUserFromCookie);
// implement /:userID route, used to fetch user uploads

// fileRoute:
fileRouter.post("/upload", upload, fileUploadSuccess);

// formRoute:
formRouter.post("/login", logInPost);
formRouter.post("/signup", ...signUpPost);