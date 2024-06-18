import { Router } from "express";
 import { agregarUsuario, editarUsuario, listarUsuarios,obtenerUsuarioPorNombre } from "../controllers/usuarioController";
const usuariosRouter = Router();

usuariosRouter.get("/", listarUsuarios);
usuariosRouter.get("/obtener-por-nombre", obtenerUsuarioPorNombre);
usuariosRouter.post("/registrar", agregarUsuario);
usuariosRouter.put("/editar", editarUsuario);

export default usuariosRouter;
