import { Router } from "express";
import { listarCompras } from "../controllers/compraController";
const comprasRouter = Router();

comprasRouter.get("/", listarCompras);

export default comprasRouter;
