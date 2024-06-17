import { Router } from "express";
 import {  listarRoles } from "../controllers/rolController";
const rolesRouter = Router();

rolesRouter.get("/", listarRoles); 

export default rolesRouter;
