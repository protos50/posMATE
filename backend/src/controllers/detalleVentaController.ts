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

export const agregarDetalleVenta = async (req: Request, res: Response) => {
  try {
    var request = new sql.Request(database);
    request.input("IdVenta", sql.Int(), req.body.IdVenta);
    request.input("IdProducto", sql.Int(), req.body.oProducto.IdProducto);
    request.input("PrecioVenta", sql.Decimal(18, 2), req.body.PrecioVenta);
    request.input("Cantidad", sql.Int(), req.body.Cantidad);
    request.input("Subtotal", sql.Decimal(18, 2), req.body.Subtotal);
    request.input("FechaRegistro", sql.DateTime(), req.body.FechaRegistro);

    const result = await request.query(
      "INSERT INTO DETALLE_VENTA(IdVenta, IdProducto, PrecioVenta, Cantidad, Subtotal, FechaRegistro) " +
        "VALUES(@IdVenta, @IdProducto, @PrecioVenta, @Cantidad, @Subtotal, @FechaRegistro)"
    );

    if (result.rowsAffected[0] == 1) {
      res.status(201).json({
        message: "Detalle de venta insertado correctamente",
        producto: {},
      });
    } else {
      res
        .status(401)
        .json({ message: "No se pudo agregar el detalle de venta" });
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message || "Error desconocido" });
  }
};
