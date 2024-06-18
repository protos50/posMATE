import { Request, Response } from "express";
import { database } from "../config/database";

export const listarVentas = async (req: Request, res: Response) => {
  try {
    const result = await database.query("SELECT v.IdVenta, u.IdUsuario, u.Nombre AS NombreUsuario, c.Nombre AS NombreCliente,v.MontoPago, v.MontoCambio, v.MontoTotal, v.FechaRegistro " +
                                                  "FROM Venta v " +
                                                  "INNER JOIN USUARIO u ON v.IdUsuario = u.IdUsuario " +
                                                  "INNER JOIN Cliente c ON v.IdCliente = c.IdCliente") /*+
                                                  (IdUsuario.HasValue ? " WHERE v.IdUsuario = @IdUsuario" : ""))*/;
console.log(result)
    if (result.recordset.length > 0) { 
      res.json(
        result.recordset.map((venta) => ({
          IdVenta: venta.IdVenta,
          oUsuario: {
            IdUsuario: venta.IdUsuario,
            Nombre: venta.NombreUsuario,
          },
          oCliente: { Nombre: venta.NombreCliente },
          MontoPago: venta.MontoPago,
          MontoCambio: venta.MontoCambio,
          MontoTotal: venta.MontoTotal,
          FechaRegistro: venta.FechaRegistro,
        }))
      );
    } else {
      res.status(401).json({ message: "No existen ventas" });
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message || "Error desconocido" });
  }
};
