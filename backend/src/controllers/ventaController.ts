import { Request, Response } from "express";
import { database } from "../config/database";
import sql from "mssql";

export const listarVentas = async (req: Request, res: Response) => {
  try {
    var request = new sql.Request(database);

    if (req.query?.idusuario) request.input("IdUsuario", req.query.idusuario);

    const result = await request.query(
      "SELECT v.IdVenta, u.IdUsuario, u.Nombre AS NombreUsuario, c.Nombre AS NombreCliente,v.MontoPago, v.MontoCambio, v.MontoTotal, v.FechaRegistro " +
        "FROM Venta v " +
        "INNER JOIN USUARIO u ON v.IdUsuario = u.IdUsuario " +
        "INNER JOIN Cliente c ON v.IdCliente = c.IdCliente" +
        (req.query?.idusuario ? " WHERE v.IdUsuario = @IdUsuario" : "")
    );

    console.log(result);
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

export const ultimoIdVenta = async (req: Request, res: Response) => {
  try {
    const result = await database.query(
      "SELECT TOP 1 IdVenta FROM Venta ORDER BY IdVenta DESC"
    );
    console.log(result);

    if (result.recordset.length > 0) {
      res.json(result.recordset[0]?.IdVenta || -1);
    } else {
      res.status(401).json({ message: "Compra no encontrada" });
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message || "Error desconocido" });
  }
};

export const agregarVenta = async (req: Request, res: Response) => {
  try {
    var request = new sql.Request(database);
    /*   cmd.Parameters.AddWithValue("@IdUsuario", venta.oUsuario.IdUsuario);
                    cmd.Parameters.AddWithValue("@IdCliente", venta.oCliente.IdCliente);
                    cmd.Parameters.AddWithValue("@MontoPago", venta.MontoPago);
                    cmd.Parameters.AddWithValue("@MontoCambio", venta.MontoCambio);
                    cmd.Parameters.AddWithValue("@MontoTotal", venta.MontoTotal);
                    cmd.Parameters.AddWithValue("@FechaRegistro", venta.FechaRegistro);
                    
                    curl -X POST http://localhost:3000/ventas -H "Content-Type: application/json" -d '{
    "oUsuario": { "IdUsuario": 1 },
    "oCliente": { "IdCliente": 2 },
    "MontoPago": 200.00,
    "MontoCambio": 50.00,
    "MontoTotal": 150.00,
    "FechaRegistro": "2023-11-14T16:17:16.607"
}'
*/
    request.input("IdUsuario", req.body.oUsuario.IdUsuario);
    request.input("IdCliente", req.body.oCliente.IdCliente);
    request.input("MontoPago", req.body.MontoPago);
    request.input("MontoCambio", req.body.MontoCambio);
    request.input("MontoTotal", req.body.MontoTotal);
    request.input("FechaRegistro", sql.DateTime, req.body.FechaRegistro);

    const result = await request.query(
      "INSERT INTO Venta(IdUsuario, IdCliente, MontoPago, MontoCambio, MontoTotal, FechaRegistro) " +
        "VALUES(@IdUsuario, @IdCliente, @MontoPago, @MontoCambio, @MontoTotal, @FechaRegistro)"
    );
    console.log(result);

    if (result.rowsAffected[0] == 1) {
      res.status(201).json({
        message: "Compra creada correctamente",
        producto: {},
      });
    } else {
      res.status(401).json({ message: "No se pudo agregar la compra" });
    }
  } catch (error: any) {
    console.error("ERROR VENTA", error);
    res.status(400).json({ message: error.message || "Error desconocido" });
  }
};
