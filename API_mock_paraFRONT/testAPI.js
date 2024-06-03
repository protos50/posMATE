const axios = require('axios');

async function enviarPeticionPost(url, datos) {
  try {
    // Envía la petición POST
    const respuesta = await axios.post(url, datos);

    // Verifica la respuesta
    if (respuesta.status === 200) {
      console.log('Éxito:', respuesta.data);
    } else {
      console.log('Respuesta con estado:', respuesta.status);
      console.log('Mensaje del servidor:', respuesta.data); // Aquí está el mensaje del servidor
    }

    console.log("Mensaje de estado: " + respuesta.statusText);
    console.log("Codigo de estado: " + respuesta.status);

  } catch (error) {
    console.error('Error en la petición:', error.message);
    console.log('Error recibido:', error.response.data); // Aquí está el mensaje del servidor en caso de error
  }

  
}

async function enviarPeticionGet(url) {
  try {
    // Envía la petición GET
    const respuesta = await axios.get(url);

    // Verifica la respuesta
    if (respuesta.status === 200) {
      console.log('Éxito:', respuesta.data);
    } else {
      console.log('Respuesta con estado:', respuesta.status);
      console.log('Mensaje del servidor:', respuesta.data); // Aquí está el mensaje del servidor
    }

    console.log("Mensaje de estado: " + respuesta.statusText);
    console.log("Codigo de estado: " + respuesta.status);

  } catch (error) {
    console.error('Error en la petición:', error.message);
    console.log('Error recibido:', error.response.data); // Aquí está el mensaje del servidor en caso de error
  }
}

async function enviarPeticionPut(url, datos) {
  try {
    // Envía la petición PUT
    const respuesta = await axios.put(url, datos);

    if (respuesta.status === 200) {
      console.log('Respuesta:', respuesta.data);
    } else {
      console.log('Respuesta con estado:', respuesta.status);
      console.log('Mensaje del servidor:', respuesta.data); // Aquí está el mensaje del servidor
    }

    console.log("Mensaje de estado: " + respuesta.statusText);
    console.log("Codigo de estado: " + respuesta.status);
    
  } catch (error) {
    console.error('Error en la petición:', error.message);
    console.log('Error recibido:', error.response.data); // Aquí está el mensaje del servidor en caso de error
  }
}

// Datos a mandar
const dato_usuario_editar = {
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
};

const dato_usuario_registrar = {
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
};

// Supongamos que tienes los valores de DNI y Clave
const DNI = "123"; // Ejemplo: DNI del usuario
const Clave = "123"; // Ejemplo: Clave del usuario

// Crea un objeto con las mismas propiedades
const dato_login = {
  DNI: DNI,
  Clave: Clave
};

// Ahora puedes usar el objeto dato_login en tu código JavaScript
// para simular los datos que se enviarán a la API.


// Url
const port = 3033;

const urlLogin = `http://localhost:${port}/auth/login`;
const urlRegistrar = `http://localhost:${port}/usuarios/registrar`;
const urlUsuarios = `http://localhost:${port}/usuarios`;
const urlEditarUsuario = `http://localhost:${port}/usuarios/editar`;
const urlUsuarioPorNombre = `http://localhost:${port}/usuarios/obtener-por-nombre?nombre={Franquitoz}`;
const urlCategorias = `http://localhost:${port}/categorias`;


//enviarPeticionPost(urlRegistrar, dato_usuario_registrar); // POST registrar usuario
//enviarPeticionGet(urlUsuarios); // GET peticion lista usuarios
//enviarPeticionPut(urlEditarUsuario, dato_usuario_editar) // PUT editar un usuario
//enviarPeticionGet(urlUsuarioPorNombre) // GET usuario por nombre
enviarPeticionPost(urlLogin, dato_login);
//enviarPeticionGet(urlCategorias); // GET peticion lista categorias