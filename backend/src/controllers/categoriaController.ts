import { Request, Response } from "express";
import { database } from "../config/database";
import { SP_OBTENERCATEGORIAS } from "../procedures";

export const listarCategorias = async (req: Request, res: Response) => {
  try {
    const result = await SP_OBTENERCATEGORIAS();

    if (result.recordset.length > 0) {
      res.json(result.recordset);
    } else {
      res.status(401).json({ message: "No existen categorias" });
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message || "Error desconocido" });
  }
};
