import { Router } from "express";
import { getCurrentUserFromCookie } from "./controller/userController";
import { upload } from "./controller/fileController";

export const userRoute = Router();
export const fileRouter = Router();
export const formRouter = Router();

// userRoute:
userRoute.get("/", getCurrentUserFromCookie);

// fileRoute:
fileRouter.post("/upload", upload, (req, res) => {
  res.json({ message: "File upload successful" });
});
