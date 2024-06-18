import { Router } from "express";
 import {  listarVentas } from "../controllers/ventaController";
const ventasRouter = Router();

ventasRouter.get("/", listarVentas); 

export default ventasRouter;
