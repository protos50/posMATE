import { Request, Response } from "express";
// import { db } from "../config/database";

// let models = require("../models");
//import { SP_LISTARUSUARIOS, SP_AGREGARCLIENTE } from "../procedures";

export const listarClientes = async (req: Request, res: Response) => {
  //get dni, nombre, apellido from request GET parameters
  /*try{
  //const users = await  models.USUARIO.findAll()
  //console.log(users)
 
 
  res.json({
    message: "Lista de clientes ",
    result: users,
  });
  } catch (error) {
    console.log(error)
    res.json({
      message: "Error al listar clientes ",
      error,
    });
  }

*/

  // const result = await SP_LISTARUSUARIOS();
  //const result = await database.query('SELECT TOP 5 * FROM Cliente');
  //await database.close();
  //  console.log("Resultado", result);
  // res.json({
  //   message: "Lista de usuarios ",
  /*result: result.recordset.map((r) => ({
        IdUsuario: r.IdUsuario,
        DNI: r.DNI,
        Nombre: r.Nombre,
        Apellido: r.Apellido,
        Email: r.Email,
        Clave: r.Clave,
        Direccion: r.Direccion,
        FechaNacimiento: r.FechaNacimiento,
        Telefono: r.Telefono,
        Estado: r.Estado,
        IdRol: r.IdRol,
        Descripcion: r.Descripcion,
      })),*/

  // });
  /*const result = await database.query('SELECT TOP 5 * FROM Cliente');
    //await database.close();

   res.setHeader('Content-Type', 'application/json').json({
      message: 'Lista de usuarios ',
      result: result.recordset,
    });*/
};

export const agregarCliente = async (req: Request, res: Response) => {
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
      .catch((error) => {
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
