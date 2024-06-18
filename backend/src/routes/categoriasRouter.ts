import { Router } from "express";
 import {  listarCategorias } from "../controllers/categoriaController";
const categoriasRouter = Router();

categoriasRouter.get("/", listarCategorias); 

export default categoriasRouter;
