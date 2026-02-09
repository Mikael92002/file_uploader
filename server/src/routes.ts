import { Router } from "express";
import { getCurrentUserFromCookie } from "./controller/userController";

const userRoute = Router();

userRoute.get("/", getCurrentUserFromCookie);