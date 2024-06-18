import { Router } from "express";
 import {  listarDetalleVenta } from "../controllers/detalleVentaController";
const detalleVentasRouter = Router();

detalleVentasRouter.get("/", listarDetalleVenta); 

export default detalleVentasRouter;
