import { Router } from "express";
 import {  agregarDetalleCompra, listarDetalleCompra } from "../controllers/detalleCompraController";
const detalleComprasRouter = Router();

detalleComprasRouter.get("/", listarDetalleCompra); 
detalleComprasRouter.post("/", agregarDetalleCompra)
export default detalleComprasRouter;
