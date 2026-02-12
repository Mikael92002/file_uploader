import { Router } from "express";
import { getCurrentUserFromCookie } from "./controller/userController";
import { upload } from "./controller/fileController";
import { logInPost } from "./controller/formController";

export const userRoute = Router();
export const fileRouter = Router();
export const formRouter = Router();

// userRoute:
userRoute.get("/", getCurrentUserFromCookie);
// implement /:userID route, used to fetch user uploads

// fileRoute:
fileRouter.post("/upload", upload, (req, res) => {
  res.json({ message: "File upload successful" });
});

// formRoute:
formRouter.post("/login", logInPost);