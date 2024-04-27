import { Router } from "express";
 import { agregarCliente, listarClientes, } from "../controllers/clientController";
const clientesRouter = Router();
clientesRouter.post("/clientes", agregarCliente);
clientesRouter.get("/clientes", listarClientes);

export default clientesRouter;
