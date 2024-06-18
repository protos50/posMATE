import { Request, Response } from "express";

import { SP_OBTENERCOMPRAS } from "../procedures";

export const listarCompras = async (req: Request, res: Response) => {
  try {
    if (!req.query.idusuario)
      return res.status(400).json({ message: "idusuario es requerido" });

    const result = await SP_OBTENERCOMPRAS({
      IdUsuario: parseInt(req?.query?.idusuario.toString()),
    });

    if (result.recordset.length > 0) {
      res.json(
        result.recordset.map((compra: any) => {
          return {
            IdCompra: compra.IdCompra,
            oUsuario: { Nombre: compra.NombreUsuario },
            oProveedor: { Nombre: compra.NombreProveedor },
            MontoTotal: compra.MontoTotal,
            FechaRegistro: compra.FechaRegistro,
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
