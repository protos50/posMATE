import { Request, Response } from "express";
import { database } from "../config/database";
import sql from "mssql";
import {
  SP_AGREGARDETALLECOMPRA,
  SP_OBTENERDETALLESCOMPRA,
} from "../procedures";

export const listarDetalleCompra = async (req: Request, res: Response) => {
  try {
    if (!req.query?.idCompra)
      return res.status(400).json({ message: "idCompra es requerido" });

    const result = await SP_OBTENERDETALLESCOMPRA({
      IdCompra: parseInt(req.query.idCompra.toString()),
    });

    if (result.recordset.length > 0) {
      res.json(
        result.recordset.map((detalle) => ({
          IdDetalleCompra: detalle?.IdDetalleCompra,
          oProducto: {
            IdProducto: detalle?.IdProducto,
            Nombre: detalle?.NombreProducto,
          },
          PrecioCompra: detalle?.PrecioCompra,
          PrecioVenta: detalle?.PrecioVenta,
          Cantidad: detalle?.Cantidad,
          MontoTotal: detalle?.MontoTotal,
          FechaRegistro: detalle?.FechaRegistro,
        }))
      );
    } else {
      res.status(401).json({ message: "Detalle de compra no encontrado" });
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message || "Error desconocido" });
  }
};

export const agregarDetalleCompra = async (req: Request, res: Response) => {
  try {
    

    const result = await SP_AGREGARDETALLECOMPRA({
      IdCompra: req.body?.IdCompra,
      IdProducto: req.body?.oProducto?.IdProducto,
      PrecioCompra: req.body?.PrecioCompra,
      PrecioVenta: req.body?.PrecioVenta,
      Cantidad: req.body?.Cantidad,
      MontoTotal: req.body?.MontoTotal,
      FechaRegistro: req.body?.FechaRegistro,
    });

    if (result.rowsAffected[0] == 1) {
      res.status(201).json({
        message: "Detalle de compra insertado correctamente",
        producto: {},
      });
    } else {
      res
        .status(401)
        .json({ message: "No se pudo agregar el detalle de compra" });
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message || "Error desconocido" });
  }
};
