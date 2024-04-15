import { Request, Response } from "express";
// import { db } from "../config/database";
//import { SP_LISTARUSUARIOS, SP_AGREGARCLIENTE } from "../procedures";
export const login = async (req: Request, res: Response) => {
  try {
    // //get dni, nombre, apellido from request GET parameters

    // const result = await SP_LISTARUSUARIOS();
    // //const result = await database.query('SELECT TOP 5 * FROM Cliente');
    // //await database.close();
    // console.log("Resultado", result);
    // res.setHeader("Content-Type", "application/json").json({
    //   message: "Lista de usuarios ",
    //   result: result.recordset,
    // });
    /*const result = await database.query('SELECT TOP 5 * FROM Cliente');
    //await database.close();

   res.setHeader('Content-Type', 'application/json').json({
      message: 'Lista de usuarios ',
      result: result.recordset,
    });*/
  } catch (error) {
    res.json(error);
  }
};

export const logout = async (req: Request, res: Response) => {
  const { DNI, Nombre, Apellido } = req.body;

  if (DNI && Nombre && Apellido) {
   /* SP_AGREGARCLIENTE({
      DNI: DNI ? parseInt(DNI as string) : undefined,
      Nombre: Nombre as string,
      Apellido: Apellido as string,
    })
      .then((result) => {
        console.log("RESULTADO CLIENTE",result);
        res.json({
          message: "Cliente agregado",
          result: result.recordset,
        });
      })
      .catch((error:any) => {
        res.status(400).json({
          message: "Error al agregar cliente",
          error,
        });
      });*/
  } else {
    res.setHeader("Content-Type", "application/json").json({
      message: "Faltan parametros",
    });
  }
};
