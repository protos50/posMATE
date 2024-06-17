import { Request, Response } from "express";
import { database } from "../config/database";
import sql from "mssql";

export const listarPermisos = async (req: Request, res: Response) => {
  try {
    if (!req.query.idusuario)
      return res.status(400).json({ message: "idusuario es requerido" });

    var request = new sql.Request(database);

    request.input("IdUsuario", sql.Int(), req.query.idusuario);

    const result =
      await request.query(`select PERMISO.IdRol,PERMISO.NombreMenu from  PERMISO
                            inner join ROL r on r.IdRol = PERMISO.IdRol 
                            inner join USUARIO u on u.IdRol = r.IdRol 
                            WHERE u.IdUsuario = @IdUsuario`);

    if (result.recordset.length > 0) {
      res.json(
        result.recordset.map((permiso: any) => {
          return {
            oRol: { IdRol: permiso.IdRol },
            NombreMenu: permiso.NombreMenu,
          };
        })
      );
    } else {
      res.status(401).json({ message: "Usuario no encontrado" });
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message || "Error desconocido" });
  }
};
