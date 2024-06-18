import { Router } from "express";
import {
  listarProductos,
  obtenerProductoPorId,
  insertarProducto,
  editarProducto,
  actualizarStock,
  actualizarStockVenta,
  masVendidos
} from "../controllers/productoController";
const productosRouter = Router();

productosRouter.get("/", listarProductos);
productosRouter.get("/codigo/:codigoProducto", obtenerProductoPorId);
productosRouter.get('/masvendidos', masVendidos)
productosRouter.get('/:codigoProducto', obtenerProductoPorId)

productosRouter.post("/", insertarProducto);
productosRouter.put("/:id",editarProducto)
productosRouter.put('/:id/actualizarStock',actualizarStock)
productosRouter.put('/:id/actualizarStockVenta',actualizarStockVenta)

export default productosRouter;

