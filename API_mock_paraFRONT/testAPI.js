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
    }
  } catch (error) {
    console.error('Error en la petición:', error.message);
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
    }
  } catch (error) {
    console.error('Error en la petición:', error.message);
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
    }
  } catch (error) {
    console.error('Error en la petición:', error.message);
  }
}

// Url
const urlRegistrar = 'http://localhost:3000/usuarios/registrar';
const urlUsuarios = 'http://localhost:3000/usuarios';
const urlEditarUsuario = 'http://localhost:3000/usuarios/editar';

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

//enviarPeticionPost(urlRegistrar, dato_usuario_registrar); // POST registrar usuario
//enviarPeticionGet(urlUsuarios); // GET peticion lista usuarios
enviarPeticionPut(urlEditarUsuario, dato_usuario_editar) // PUT editar un usuario
