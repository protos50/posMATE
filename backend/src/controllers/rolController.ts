import { Request, Response } from "express";
import { database } from "../config/database";

export const listarRoles = async (req: Request, res: Response) => {
  try {
    const result = await database.query("SELECT * FROM ROL");
     
    if (result.recordset.length > 0) {
      //Formatear quitando la clave y agregando el rol
      res.json(
        result.recordset.map((rol: any) => {
          return {
            IdRol: rol.IdRol,
            Descripcion: rol.Descripcion 
          };
        })
      );
    } else {
      res.status(401).json({ message: "No existen roles" });
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message || "Error desconocido" });
  }
};
