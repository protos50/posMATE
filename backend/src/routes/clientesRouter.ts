import { Router } from "express";
 import { agregarCliente, listarClientes, } from "../controllers/clientController";
const clientesRouter = Router();
clientesRouter.post("/", agregarCliente);
clientesRouter.get("/", listarClientes);

export default clientesRouter;
