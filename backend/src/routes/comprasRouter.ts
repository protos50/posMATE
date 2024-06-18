import { Router } from "express";
import {
  listarCompras,
  ultimoIdCompra,
  agregarCompra,
} from "../controllers/compraController";
const comprasRouter = Router();

comprasRouter.get("/", listarCompras);
comprasRouter.get("/ultimoid", ultimoIdCompra);

comprasRouter.post("/", agregarCompra);
export default comprasRouter;
