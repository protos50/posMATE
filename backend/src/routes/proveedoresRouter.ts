import { Router } from "express";
 import {  listarProveedores } from "../controllers/proveedorController";
const proveedoresRouter = Router();

proveedoresRouter.get("/", listarProveedores); 

export default proveedoresRouter;
