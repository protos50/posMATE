import { Request, Response } from "express";

import { SP_AGREGARCOMPRA, SP_OBTENERCOMPRAS, SP_OBTENERULTIMOIDCOMPRA } from "../procedures";

export const listarCompras = async (req: Request, res: Response) => {
  try {
    //if (!req.query.idusuario)
    //  return res.status(400).json({ message: "idusuario es requerido" });

    
    const result = await SP_OBTENERCOMPRAS({
      IdUsuario: (req?.query?.idusuario ? parseInt(req.query.idusuario.toString()) : undefined),
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

export const ultimoIdCompra = async (req: Request, res: Response) => {
  try {
    const result = await SP_OBTENERULTIMOIDCOMPRA();

    if (result.recordset.length > 0) {
      res.json(result.recordset[0]?.IdCompra || -1);
    } else {
      res.status(401).json({ message: "Compra no encontrada" });
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message || "Error desconocido" });
  }
};


export const agregarCompra = async (req: Request, res: Response) => {
  try {
    const result = await SP_AGREGARCOMPRA({
      IdUsuario: req.body?.oUsuario?.IdUsuario,
      IdProveedor: req.body?.oProveedor?.IdProveedor,
      MontoTotal: req.body?.MontoTotal, 
      FechaRegistro: req.body?.FechaRegistro,
    });

    if (result.recordset?.[0]?.Success == 1) {
      res.status(201).json({
        message: "Compra creada correctamente",
        producto: {},
      });
    } else {
      res
        .status(401)
        .json({ message: "No se pudo agregar la compra" });
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message || "Error desconocido" });
  }
};
