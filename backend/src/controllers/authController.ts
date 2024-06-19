import { Request, Response } from "express";
// import { db } from "../config/database";
import { SP_LISTARUSUARIOS, SP_AGREGARCLIENTE } from "../procedures";
import { database } from "../config/database";
import sql from "mssql";
import crypto from "crypto";


export const hashPassword = (password: string) => {
  return crypto
    .createHash("sha256")
    .update("unaSaltMuySegura" + password)
    .digest("hex").slice(0, 50);
};

export const login = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    // const result = await SP_LISTARUSUARIOS();
    /*
     
   
*/
    var request = new sql.Request(database);

    request.input("DNI", req.body.DNI);
    request.input("Clave", hashPassword(req.body.Clave));

    const result =
      await request.query(`SELECT u.IdUsuario, u.DNI, u.Nombre, u.Apellido, u.Email, u.Direccion, 
           ISNULL(u.FechaNacimiento, '') AS FechaNacimiento, u.Telefono, u.Estado, 
           r.IdRol, r.Descripcion 
    FROM usuario u
    INNER JOIN rol r ON r.IdRol = u.IdRol
    WHERE u.DNI = @DNI AND u.Clave = @Clave;`);

    console.log(result);
    if (result.recordset.length > 0) {
      //filtrar por usuario y contraseña
      // const usuario = result.recordset.filter(
      //   (r) => r?.DNI === req.body.DNI && r?.Clave === req.body.Clave
      // );

      // if (usuario.length > 0 && usuario[0]) {
      const usr = result.recordset[0];

      res.json({
        IdUsuario: usr.IdUsuario,
        Nombre: usr.Nombre,
        Apellido: usr.Apellido,
        Clave: "********",
        Email: usr.Email,
        DNI: usr.DNI,
        Direccion: usr.Direccion,
        FechaNacimiento: usr.FechaNacimiento,
        Telefono: usr.Telefono,
        Estado: usr.Estado,
        oRol: {
          IdRol: usr.IdRol,
          Descripcion: usr.Descripcion,
        },
      });
    } else {
      res.status(401).json({ message: "Credenciales incorrectas" });
    }
    // } else {
    // res.status(401).json({ message: "No existen usuarios" });
    // }
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message || "Error desconocido" });
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
