import { Router } from "express";
 import { agregarUsuario, listarUsuarios, } from "../controllers/usuarioController";
const usuariosRouter = Router();

usuariosRouter.get("/", listarUsuarios);
usuariosRouter.post("/registrar", agregarUsuario);


export default usuariosRouter;
