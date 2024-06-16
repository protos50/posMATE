const express = require('express');
const router = express.Router();
const { showStatus } = require('./utils');
const path = require('path'); // Importa el módulo 'path'

const modelo_json_usuario = [
  {
    "IdUsuario": 1,
    "Nombre": "AdminGonzalo",
    "Apellido": "Ramirez",
    "Clave": "123",
    "Email": "admin@gmail.com",
    "DNI": "123",
    "Direccion": "Brasil 120",
    "FechaNacimiento": "2002-10-10",
    "Telefono": "3794205084",
    "Estado": true,
    "oRol": {
      "IdRol": 1,
      "Descripcion": "Administrador"
    }
  }
]

// Ruta para manejar solicitudes GET
router.get('/', (req, res) => {
  console.log("GET : /");
  // Envía el archivo HTML como respuesta
  res.sendFile(path.join(__dirname, '../index.html'));
  showStatus(res);
});


// Ruta para obtener la lista de usuarios
router.get('/usuarios', (req, res) => {
  console.log("GET : /usuarios");
  const usuarios = [
    {
      "IdUsuario": 1,
      "Nombre": "AdminGonzalo",
      "Apellido": "Ramirez",
      "Clave": "123",
      "Email": "admin@gmail.com",
      "DNI": "123",
      "Direccion": "Brasil 120",
      "FechaNacimiento": "2002-10-10",
      "Telefono": "3794205084",
      "Estado": true,
      "oRol": {
        "IdRol": 1,
        "Descripcion": "Administrador"
      }
    },
    {
      "IdUsuario": 2,
      "Nombre": "AdminFranco",
      "Apellido": "zini",
      "Clave": "admin2",
      "Email": "admin2@gmail.com",
      "DNI": "40049028",
      "Direccion": "Uruguay 201",
      "FechaNacimiento": "1998-11-06",
      "Telefono": "3794203121",
      "Estado": true,
      "oRol": {
        "IdRol": 1,
        "Descripcion": "Administrador"
      }
    },
    {
      "IdUsuario": 3,
      "Nombre": "EncargadoLuis",
      "Apellido": "Lopez",
      "Clave": "1234",
      "Email": "encargado@gmail.com",
      "DNI": "1234",
      "Direccion": "Lavalle 101",
      "FechaNacimiento": "1995-07-13",
      "Telefono": "3775405121",
      "Estado": true,
      "oRol": {
        "IdRol": 3,
        "Descripcion": "Encargado"
      }
    },
    {
      "IdUsuario": 4,
      "Nombre": "EncargadoPedro",
      "Apellido": "Silva",
      "Clave": "encargado2",
      "Email": "encargado2@gmail.com",
      "DNI": "38124851",
      "Direccion": "Peru 431",
      "FechaNacimiento": "2000-05-31",
      "Telefono": "1122524512",
      "Estado": true,
      "oRol": {
        "IdRol": 3,
        "Descripcion": "Encargado"
      }
    },
    {
      "IdUsuario": 5,
      "Nombre": "EmpleadoCamila",
      "Apellido": "Paredes",
      "Clave": "12345",
      "Email": "vendedor@gmail.com",
      "DNI": "12345",
      "Direccion": "junin 12",
      "FechaNacimiento": "2002-12-14",
      "Telefono": "3795812351",
      "Estado": true,
      "oRol": {
        "IdRol": 2,
        "Descripcion": "Empleado"
      }
    },
    {
      "IdUsuario": 6,
      "Nombre": "EmpleadoMartin",
      "Apellido": "Palermo",
      "Clave": "empleado2",
      "Email": "empleado2@gmail.com",
      "DNI": "42528412",
      "Direccion": "San lorenzo 991",
      "FechaNacimiento": "2000-07-14",
      "Telefono": "1120458121",
      "Estado": true,
      "oRol": {
        "IdRol": 2,
        "Descripcion": "Empleado"
      }
    }
  ];

  res.json(usuarios);
  showStatus(res);
});

// Endpoint para simular el login de un usuario
router.post('/auth/login', (req, res) => {
  console.log("POST : /auth/login");

  console.log(req.body);
  // Simula la verificación de credenciales
  const { DNI, Clave } = req.body;
  if (DNI === '123' && Clave === '123') {
    // Datos del usuario que se devolverán si las credenciales son correctas
    const usuario = {
      "IdUsuario": 1,
      "Nombre": "AdminGonzalo",
      "Apellido": "Ramirez",
      "Clave": "123",
      "Email": "admin@gmail.com",
      "DNI": "123",
      "Direccion": "Brasil 120",
      "FechaNacimiento": "2002-10-10",
      "Telefono": "3794205084",
      "Estado": true,
      "oRol": {
        "IdRol": 1,
        "Descripcion": "Administrador"
      }
    };

    res.json(usuario);
    showStatus(res);
  } else if (DNI === '1234' && Clave === '1234') {
    // Datos del segundo usuario
    const usuario = {
      "IdUsuario": 5,
      "Nombre": "EmpleadoCamila",
      "Apellido": "Paredes",
      "Clave": "12345",
      "Email": "vendedor@gmail.com",
      "DNI": "12345",
      "Direccion": "junin 12",
      "FechaNacimiento": "2002-12-14",
      "Telefono": "3795812351",
      "Estado": true,
      "oRol": {
        "IdRol": 2,
        "Descripcion": "Empleado"
      }
    };
    res.json(usuario);
    showStatus(res);
  } else if (DNI === '12345' && Clave === '12345') {
    // Datos del tercer usuario
    const usuario = {
      "IdUsuario": 4,
      "Nombre": "EncargadoPedro",
      "Apellido": "Silva",
      "Clave": "encargado2",
      "Email": "encargado2@gmail.com",
      "DNI": "38124851",
      "Direccion": "Peru 431",
      "FechaNacimiento": "2000-05-31",
      "Telefono": "1122524512",
      "Estado": true,
      "oRol": {
        "IdRol": 3,
        "Descripcion": "Encargado"
      }
      
    };
    res.json(usuario);
    showStatus(res);
  } else {
    // Respuesta si las credenciales son incorrectas
    res.status(401).json({ message: 'Credenciales incorrectas!!!' });
    showStatus(res);
  }
}
);


// Endpoint para simular el registro de un usuario
router.post('/usuarios/registrar', (req, res) => {
  console.log("POST : /usuarios/registrar");
  console.log(req.body);
  // Aquí puedes procesar los datos recibidos en req.body si es necesario

  // Simula la creación de un usuario y devuelve un ID ficticio con un mensaje vacío
  const idUsuarioFicticio = Math.floor(Math.random() * 10000); // Genera un ID aleatorio

  // caso creado el usuario
  res.json({
    "IdUsuarioResultado": idUsuarioFicticio,
    "Mensaje": "Usuario Registrado"
  });

  // caso se quiera registar un mismo DNI
  /*
  res.json({
    "IdUsuarioResultado": 0,
    "Mensaje": "No se puede repetir el DNI para mas de un usuario"
  });
  */
  showStatus(res);
});


// Endpoint para simular la edicion de un usuario
router.put('/usuarios/editar', (req, res) => {
  console.log("PUT : /usuarios/editar");
  console.log(req.body);
  // Lógica para editar el usuario según los datos recibidos en req.body

  // Ejemplo de respuesta con solo el mensaje
  usuarioEditado = true;
  if (usuarioEditado) {
    res.json({ Respuesta: 1, Mensaje: 'Usuario editado correctamente' });
    showStatus(res);
  } else {
    res.json({ Respuesta: 0, Mensaje: 'Usuario no encontrado o no se pudo editar el DNI' });
    showStatus(res);
  }

  showStatus(res);
});

// Ruta para obtener un usuario por nombre
router.get('/usuarios/obtener-por-nombre', (req, res) => {
  console.log("GET : /usuarios/obtener-por-nombre");

  let nombre = req.query.nombre; // Obtén el nombre desde la consulta
  nombre = nombre.replace('{', '').replace('}', '')
  console.log("Nombre recibido: " + nombre)

  // Realiza la lógica para obtener el usuario por nombre desde tu base de datos
  // (puedes usar tus procedimientos almacenados aquí)

  // Ejemplo: consulta a la lista de usuarios y encuentra el usuario por nombre
  let usuarioEncontrado;

  if (nombre == "ChasChas") {
    usuarioEncontrado = true;
  } else {
    usuarioEncontrado = false;
  }

  if (usuarioEncontrado) {
    const idUsuario_encontrado = 1;
    res.json({ IdUsuario: idUsuario_encontrado }); // Devuelve solo el IdUsuario como respuesta
    showStatus(res);
  } else {
    res.json({}); // No se encontró ningún usuario, devuelve un objeto vacío
  }

  showStatus(res);
});

module.exports = router;