import { Router } from "express";
import { login, logout } from "../controllers/authController";
 
const authRouter = Router();
authRouter.get("/login", login);
authRouter.get("/logout", logout);

export default authRouter;
