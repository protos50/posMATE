import { Router } from "express";
import { listarPermisos } from "../controllers/permisoController";
const permisosRouter = Router();

permisosRouter.get("/", listarPermisos);

export default permisosRouter;
