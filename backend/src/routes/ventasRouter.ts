import { Router } from "express";
import {
  listarVentas,
  ultimoIdVenta,
  agregarVenta,
} from "../controllers/ventaController";
const ventasRouter = Router();

ventasRouter.get("/", listarVentas);
ventasRouter.get("/ultimoid", ultimoIdVenta);

ventasRouter.post("/", agregarVenta);
export default ventasRouter;
