import { Router } from "express";
 import { agregarUsuario, editarUsuario, listarUsuarios, } from "../controllers/usuarioController";
const usuariosRouter = Router();

usuariosRouter.get("/", listarUsuarios);
usuariosRouter.post("/registrar", agregarUsuario);
usuariosRouter.put("/editar", editarUsuario);

export default usuariosRouter;
