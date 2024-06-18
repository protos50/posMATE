import { Request, Response } from "express";
import { database } from "../config/database";

export const listarProveedores = async (req: Request, res: Response) => {
  try {
    const result = await database.query("SELECT * FROM PROVEEDOR");

    if (result.recordset.length > 0) {
      res.json(result.recordset);
    } else {
      res.status(401).json({ message: "No existen proveedores" });
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message || "Error desconocido" });
  }
};
