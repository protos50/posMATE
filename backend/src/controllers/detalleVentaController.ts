import { Request, Response } from "express";
import { database } from "../config/database";
import sql from "mssql";

export const listarDetalleVenta = async (req: Request, res: Response) => {
  try {
    if (!req.query?.idVenta)
      return res.status(400).json({ message: "idVenta es requerido" });

    var request = new sql.Request(database);

    request.input("IdVenta", sql.Int(), req.query.idVenta);

    const result = await request.query(
      "SELECT dv.IdDetalleVenta, dv.IdProducto, dv.PrecioVenta, dv.Cantidad, dv.Subtotal, dv.FechaRegistro, p.Nombre AS NombreProducto " +
        "FROM DETALLE_VENTA dv " +
        "INNER JOIN PRODUCTO p ON dv.IdProducto = p.IdProducto " +
        "WHERE dv.IdVenta = @IdVenta"
    );

    if (result.recordset.length > 0) {
      res.json(
        result.recordset.map((detVenta: any) => {
          return {
            IdDetalleVenta: detVenta.IdDetalleVenta,
            oProducto: {
              IdProducto: detVenta.IdProducto,
              Nombre: detVenta.NombreProducto,
            },
            PrecioVenta: detVenta.PrecioVenta,
            Cantidad: detVenta.Cantidad,
            Subtotal: detVenta.Subtotal,
            FechaRegistro: detVenta.FechaRegistro,
          };
        })
      );
    } else {
      res.status(401).json({ message: "Detalle de venta no encontrado" });
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message || "Error desconocido" });
  }
};

export const listarDeetalleVenta = async (req: Request, res: Response) => {
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
