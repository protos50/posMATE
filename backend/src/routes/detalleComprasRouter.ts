import { Router } from "express";
 import {  listarDetalleCompra } from "../controllers/detalleCompraController";
const detalleComprasRouter = Router();

detalleComprasRouter.get("/", listarDetalleCompra); 

export default detalleComprasRouter;
