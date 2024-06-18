import { Router } from "express";
import {
  listarDetalleVenta,
  agregarDetalleVenta,
} from "../controllers/detalleVentaController";
const detalleVentasRouter = Router();

detalleVentasRouter.get("/", listarDetalleVenta);
detalleVentasRouter.post("/", agregarDetalleVenta);
export default detalleVentasRouter;
