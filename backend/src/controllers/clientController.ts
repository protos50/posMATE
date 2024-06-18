import { Request, Response } from "express";
import { SP_OBTENERCLIENTES, SP_AGREGARCLIENTE } from "../procedures";

export const listarClientes = async (req: Request, res: Response) => {
  try {
    const result = await SP_OBTENERCLIENTES();

    if (result.recordset.length > 0) {
      res.json(result.recordset);
    } else {
      res.status(401).json({ message: "Cliente no encontrado" });
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message || "Error desconocido" });
  }
};

export const agregarCliente = async (req: Request, res: Response) => {
  const { DNI, Nombre, Apellido } = req.body;

  if (DNI && Nombre && Apellido) {
    SP_AGREGARCLIENTE({
      DNI: DNI ? parseInt(DNI as string) : undefined,
      Nombre: Nombre as string,
      Apellido: Apellido as string,
    })
      .then((result) => {
        console.log("RESULTADO CLIENTE", result);
        res.json({
          message: "Cliente agregado",
          result: result.recordset,
        });
      })
      .catch((error) => {
        res.status(400).json({
          message: "Error al agregar cliente",
          error,
        });
      });
  } else {
    res.setHeader("Content-Type", "application/json").json({
      message: "Faltan parametros",
    });
  }
};
