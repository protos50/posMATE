import { Request, Response } from "express";
import {
  SP_LISTARUSUARIOS,
  SP_REGISTRARUSUARIO,
  SP_EDITARUSUARIO,
  SP_OBTENERUSUARIOPORNOMBRE,
} from "../procedures";
import { hashPassword } from  "./authController"

export const obtenerUsuarioPorNombre = async (req: Request, res: Response) => {
  try {
    if (!req.query?.nombre)
      return res.status(400).json({ message: "nombre es requerido" });

    const result = await SP_OBTENERUSUARIOPORNOMBRE({
      Nombre: req?.query?.nombre.toString(),
    });

    if (result.recordset.length > 0) {
      res.json(result.recordset[0]);
    } else {
      res.status(401).json({ message: "No existen usuario con ese nombre" });
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message || "Error desconocido" });
  }
};

export const listarUsuarios = async (req: Request, res: Response) => {
  try {
    const result = await SP_LISTARUSUARIOS();

    if (result.recordset.length > 0) {
      //Formatear quitando la clave y agregando el rol
      res.json(
        result.recordset.map((usr: any) => {
          return {
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
          };
        })
      );
    } else {
      res.status(401).json({ message: "No existen usuarios" });
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message || "Error desconocido" });
  }
};

export const agregarUsuario = async (req: Request, res: Response) => {
  /* req.body
  {
  Nombre: 'api name',
  Apellido: 'api surname',
  Clave: 'api pass',
  Email: 'api@test.com',
  DNI: '666',
  Direccion: 'api 666',
  FechaNacimiento: '2023-09-14',
  Telefono: '5645',
  IdRol: 2,
  Estado: false
}

Si el registro fue exitoso, IdUsuarioResultado es el ID del nuevo usuario*/
  try {
    let usuario = req.body;
    usuario.Clave = hashPassword(usuario.Clave);
    
    const result = await SP_REGISTRARUSUARIO(usuario);
    console.log("RESULTADO USUARIO", result);
    res.json(result.output);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({
      IdUsuarioResultado: 0,
      Mensaje: error.message || "Error desconocido",
    });
  }
};

export const editarUsuario = async (req: Request, res: Response) => {
  /* req.body
  {
  IdUsuario: '1',
  Nombre: 'api name',
  Apellido: 'api surname',
  Clave: 'api pass',
  Email: 'api@test.com',
  DNI: '666',
  Direccion: 'api 666',
  FechaNacimiento: '2023-09-14',
  Telefono: '5645',
  IdRol: 2,
  Estado: false
}

Si el registro fue exitoso, IdUsuarioResultado es el ID del nuevo usuario*/
  try {
    //Si req.body.Clave es igual a ********, eliminar Clave de body
    let usuario = req.body;
    if(usuario.Clave === "********"){
      delete usuario.Clave;
    }else{
      usuario.Clave = hashPassword(usuario.Clave);
    }

    const result = await SP_EDITARUSUARIO(usuario);
    console.log("RESULTADO EDITAR USUARIO", result);
    res.json(result.output);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({
      Respuesta: 0,
      Mensaje: error.message || "Error desconocido",
    });
  }
}; 

