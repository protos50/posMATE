const express = require('express');
const app = express();
const path = require('path'); // Importa el módulo 'path'

app.use(express.json());

// Ruta para manejar solicitudes GET
app.get('/', (req, res) => {
  // Envía el archivo HTML como respuesta
  res.sendFile(path.join(__dirname, 'index.html'));

  console.log("Mensaje de estado: " + res.statusMessage);
  console.log("Codigo de estado: " + res.statusCode);
});

// Ruta para obtener la lista de usuarios
app.get('/usuarios', (req, res) => {
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
  console.log("Mensaje de estado: " + res.statusMessage);
  console.log("Codigo de estado: " + res.statusCode);
});

// Endpoint para simular el login de un usuario
app.post('/login', (req, res) => {
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

    console.log("Mensaje de estado: " + res.statusMessage);
    console.log("Codigo de estado: " + res.statusCode);
  } else {
    // Respuesta si las credenciales son incorrectas
    res.status(401).json({ message: 'Credenciales incorrectas' });
  }
}
);


// Endpoint para simular el registro de un usuario
app.post('/usuarios/registrar', (req, res) => {
  console.log(req.body);
  // Aquí puedes procesar los datos recibidos en req.body si es necesario

  // Simula la creación de un usuario y devuelve un ID ficticio con un mensaje vacío
  const idUsuarioFicticio = Math.floor(Math.random() * 10000); // Genera un ID aleatorio
  res.json({
    "IdUsuarioResultado": 0,
    "Mensaje": "No se puede repetir el DNI para mas de un usuario"
  });

  console.log("Mensaje de estado: " + res.statusMessage);
  console.log("Codigo de estado: " + res.statusCode);
});


// Endpoint para simular la edicion de un usuario
app.put('/usuarios/editar', (req, res) => {
  console.log(req.body);
  // Lógica para editar el usuario según los datos recibidos en req.body

  // Ejemplo de respuesta con solo el mensaje
  usuarioEditado = true;
  if (usuarioEditado) {
    res.json({ Respuesta: 1, Mensaje: 'Usuario editado correctamente' });
  } else {
    res.json({ Respuesta: 0, Mensaje: 'Usuario no encontrado o no se pudo editar el DNI' });
  }

  console.log("Mensaje de estado: " + res.statusMessage);
  console.log("Codigo de estado: " + res.statusCode);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});