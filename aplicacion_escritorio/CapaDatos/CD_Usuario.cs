using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using CapaEntidad;
using System.Net.Http;
using Newtonsoft.Json;
using System.Windows.Forms;
using Microsoft.Reporting.Map.WebForms.BingMaps;

namespace CapaDatos
{
    public class CD_Usuario
    {
        // Get the API URL from ApiConfigManager
        readonly string apiUrl = ApiConfigManager.ApiUrl;
        // HttpClient es recomendable que sea estático y reutilizable
        private static readonly HttpClient client = new HttpClient();

        /// <summary>
        /// Realiza una solicitud asincrónica a la API para obtener una lista de usuarios.
        /// </summary>
        /// <returns>Una lista de objetos Usuario si la solicitud es exitosa; de lo contrario, una lista vacía.</returns>
        public async Task<List<Usuario>> ListarAsync()
        {
            // Inicializa una nueva lista de usuarios
            List<Usuario> lista = new List<Usuario>();
            try
            {
                // URL del endpoint
                string url = apiUrl + "/usuarios";
                // Realiza una solicitud GET a la API de usuarios
                HttpResponseMessage response = await client.GetAsync(url);
                // Asegura que la respuesta sea exitosa (código de estado 200-299)
                response.EnsureSuccessStatusCode();
                // Lee el cuerpo de la respuesta como un string
                string responseBody = await response.Content.ReadAsStringAsync();
                // Deserializa el JSON a una lista de objetos Usuario
                lista = JsonConvert.DeserializeObject<List<Usuario>>(responseBody);
            }
            catch (HttpRequestException e)
            {
                // Manejo de excepciones en caso de error en la solicitud HTTP
                throw e;
            }
            // Devuelve la lista de usuarios
            return lista;
        }


        /// <summary>
        /// Envía una solicitud asincrónica POST a la API para autenticar un usuario.
        /// </summary>
        /// <param name="DNI">El DNI del usuario que intenta iniciar sesión.</param>
        /// <param name="Clave">La clave del usuario que intenta iniciar sesión.</param>
        /// <returns>Un objeto Usuario si la autenticación es exitosa; de lo contrario, null.</returns>
        public async Task<Usuario> LoginAsync(string DNI, string Clave)
        {
            // Empaqueta los datos de DNI y Clave en un objeto anónimo
            var loginData = new { DNI, Clave };
            // Convierte los datos de login a JSON y los envía como contenido de la solicitud
            var content = new StringContent(JsonConvert.SerializeObject(loginData), Encoding.UTF8, "application/json");

            // URL del endpoint
            string url= apiUrl + "/auth/login";
            // Realiza la solicitud POST a la API de login
            var response = await client.PostAsync(url, content);

            if (response.IsSuccessStatusCode)
            {
                // Lee el cuerpo de la respuesta como un string
                var responseBody = await response.Content.ReadAsStringAsync();
                // Deserializa el JSON a un objeto Usuario
                var usuario = JsonConvert.DeserializeObject<Usuario>(responseBody);
                // Devuelve el objeto Usuario
                return usuario;
            }
            else
            {
                // Si el estado no es exitoso, muestra el mensaje de error del servidor
                var errorBody = await response.Content.ReadAsStringAsync();
                Console.WriteLine($"Error en la autenticación: {errorBody}");
                MessageBox.Show($"Error en la autenticación: {errorBody}", "Mensaje", MessageBoxButtons.OK, MessageBoxIcon.Error);
                // Devuelve null si las credenciales no son correctas o si ocurre un error
                return null;
            }
        }


        // Método para listar usuarios desde la base de datos
        public List<Usuario> Listar()
        {
            List<Usuario> lista = new List<Usuario>();

            // bloque 'using' para asegurarse de que se cierre la conexión correctamente
            using (SqlConnection con = new SqlConnection(Conexion.cadena))
            {
                try
                {
                    con.Open(); // Abre la conexión 

                    // Nombre del procedimiento almacenado
                    string storedProcedure = "SP_LISTARUSUARIOS";

                    using (SqlCommand cmd = new SqlCommand(storedProcedure, con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                // Agrega objetos de Usuario a la lista, leyendo datos desde el SqlDataReader
                                lista.Add(new Usuario()
                                {
                                    IdUsuario = Convert.ToInt32(reader["IdUsuario"]),
                                    DNI = reader["DNI"].ToString(),
                                    Nombre = reader["Nombre"].ToString(),
                                    Apellido = reader["Apellido"].ToString(),
                                    Email = reader["Email"].ToString(),
                                    Clave = reader["Clave"].ToString(),
                                    Direccion = reader["Direccion"].ToString(),
                                    FechaNacimiento = (DateTime)(reader["FechaNacimiento"] as DateTime?),
                                    Telefono = reader["Telefono"].ToString(),
                                    Estado = Convert.ToBoolean(reader["Estado"]),
                                    oRol = new Rol()
                                    {
                                        IdRol = Convert.ToInt32(reader["IdRol"]),
                                        Descripcion = reader["Descripcion"].ToString()
                                    }
                                });
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    // Manejo de excepciones
                    throw ex;
                }
            }

            return lista;
        }

        /// <summary>
        /// Envía una solicitud asincrónica POST a la API para registrar un nuevo usuario.
        /// </summary>
        /// <param name="obj">El objeto Usuario con los datos a registrar.</param>
        /// <returns>Una tupla que contiene el ID del usuario generado y el mensaje de resultado.</returns>
        public async Task<(int IdUsuario, string Mensaje)> RegistrarAsync(Usuario obj)
        {
            int idUsuarioGenerado = 0;
            string mensaje = string.Empty;

            try
            {
                // Empaqueta los datos del usuario en un objeto anónimo
                var userData = new
                {
                    obj.Nombre,
                    obj.Apellido,
                    obj.Clave,
                    obj.Email,
                    obj.DNI,
                    obj.Direccion,
                    FechaNacimiento = obj.FechaNacimiento.ToString("yyyy-MM-dd"),
                    obj.Telefono,
                    obj.oRol.IdRol,
                    obj.Estado
                };
                var content = new StringContent(JsonConvert.SerializeObject(userData), Encoding.UTF8, "application/json");

                // URL del endpoint
                string url = apiUrl + "/usuarios/registra";
                // Realiza la solicitud POST a la API de registro de usuarios
                var response = await client.PostAsync(url, content);
                if (response.IsSuccessStatusCode)
                {
                    // Lee el cuerpo de la respuesta como un string
                    var responseBody = await response.Content.ReadAsStringAsync();
                    // Deserializa el JSON para obtener el ID del usuario y el mensaje
                    dynamic result = JsonConvert.DeserializeObject<dynamic>(responseBody);
                    idUsuarioGenerado = result.IdUsuarioResultado;
                    mensaje = result.Mensaje;
                }
                else
                {
                    // Lee el cuerpo de la respuesta como un string para obtener el mensaje de error
                    var errorBody = await response.Content.ReadAsStringAsync();
                    Console.WriteLine($"Error en la autenticación: {errorBody}");
                    MessageBox.Show($"Error en la autenticación: {errorBody}", "Mensaje", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            catch (HttpRequestException e)
            {
                // Manejo de excepciones en caso de error en la solicitud HTTP
                mensaje = e.Message;
            }

            return (idUsuarioGenerado, mensaje);
        }



        // Método para registrar un usuario en la base de datos
        public int Registrar(Usuario obj, out string Mensaje)
        {
            int idUsuarioGenerado = 0;
            Mensaje = string.Empty;

            try
            {
                using (SqlConnection con = new SqlConnection(Conexion.cadena))
                {
                    // Creación de un comando SQL para ejecutar un procedimiento almacenado
                    SqlCommand cmd = new SqlCommand("SP_REGISTRARUSUARIO", con);
                    cmd.Parameters.AddWithValue("Nombre", obj.Nombre);
                    cmd.Parameters.AddWithValue("Apellido", obj.Apellido);
                    cmd.Parameters.AddWithValue("Clave", obj.Clave);
                    cmd.Parameters.AddWithValue("Email", obj.Email);
                    cmd.Parameters.AddWithValue("DNI", obj.DNI);
                    cmd.Parameters.AddWithValue("Direccion", obj.Direccion);
                    cmd.Parameters.AddWithValue("FechaNacimiento", obj.FechaNacimiento);
                    cmd.Parameters.AddWithValue("Telefono", obj.Telefono);
                    cmd.Parameters.AddWithValue("IdRol", obj.oRol.IdRol);
                    cmd.Parameters.AddWithValue("@Estado", obj.@Estado);
                    cmd.Parameters.Add("IdUsuarioResultado", SqlDbType.Int).Direction = ParameterDirection.Output;
                    cmd.Parameters.Add("Mensaje", SqlDbType.VarChar, 500).Direction = ParameterDirection.Output;

                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();

                    // Ejecutar el procedimiento almacenado
                    cmd.ExecuteNonQuery();

                    idUsuarioGenerado = Convert.ToInt32(cmd.Parameters["IdUsuarioResultado"].Value);
                    Mensaje = cmd.Parameters["Mensaje"].Value.ToString();
                }
            }
            catch (Exception ex)
            {
                idUsuarioGenerado = 0;
                Mensaje = ex.Message;
            }

            return idUsuarioGenerado;
        }

        public async Task<(bool Respuesta, string Mensaje)> EditarUsuarioAsync(Usuario obj)
        {
            int respuesta = 0;
            string mensaje = string.Empty;

            try
            {
                // Empaqueta los datos del usuario en un objeto anónimo
                var userData = new
                {
                    obj.IdUsuario,
                    obj.Nombre,
                    obj.Apellido,
                    obj.Clave,
                    obj.Email,
                    obj.DNI,
                    obj.Direccion,
                    FechaNacimiento = obj.FechaNacimiento.ToString("yyyy-MM-dd"),
                    obj.Telefono,
                    obj.oRol.IdRol,
                    obj.Estado
                };
                var content = new StringContent(JsonConvert.SerializeObject(userData), Encoding.UTF8, "application/json");

                // URL del endpoint
                string url = apiUrl + "/usuarios/editar";
                // Realiza la solicitud PUT a la API para editar el usuario
                var response = await client.PutAsync(url, content);
                if (response.IsSuccessStatusCode)
                {
                    // Lee el cuerpo de la respuesta como un string
                    var responseBody = await response.Content.ReadAsStringAsync();
                    // Deserializa el JSON para obtener la respuesta y el mensaje
                    dynamic result = JsonConvert.DeserializeObject<dynamic>(responseBody);
                    respuesta = result.Respuesta;
                    mensaje = result.Mensaje;
                }
                else
                {
                    var errorBody = await response.Content.ReadAsStringAsync();
                    Console.WriteLine($"Error en la autenticación: {errorBody}");
                    MessageBox.Show($"Error en la autenticación: {errorBody}", "Mensaje", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            catch (HttpRequestException e)
            {
                // Manejo de excepciones en caso de error en la solicitud HTTP
                mensaje = e.Message;
            }
            return (Convert.ToBoolean(respuesta), mensaje);
        }


        // Método para editar un usuario en la base de datos
        public bool Editar(Usuario obj, out string Mensaje)
        {
            bool respuesta = false;
            Mensaje = string.Empty;

            try
            {
                using (SqlConnection con = new SqlConnection(Conexion.cadena))
                {
                    // Creación de un comando SQL para ejecutar un procedimiento almacenado 
                    SqlCommand cmd = new SqlCommand("SP_EDITARUSUARIO", con);
                    cmd.Parameters.AddWithValue("IdUsuario", obj.IdUsuario);
                    cmd.Parameters.AddWithValue("Nombre", obj.Nombre);
                    cmd.Parameters.AddWithValue("Apellido", obj.Apellido);
                    cmd.Parameters.AddWithValue("Clave", obj.Clave);
                    cmd.Parameters.AddWithValue("Email", obj.Email);
                    cmd.Parameters.AddWithValue("DNI", obj.DNI);
                    cmd.Parameters.AddWithValue("Direccion", obj.Direccion);
                    cmd.Parameters.AddWithValue("FechaNacimiento", obj.FechaNacimiento);
                    cmd.Parameters.AddWithValue("Telefono", obj.Telefono);
                    cmd.Parameters.AddWithValue("IdRol", obj.oRol.IdRol);
                    cmd.Parameters.AddWithValue("@Estado", obj.@Estado);
                    cmd.Parameters.Add("Respuesta", SqlDbType.Int).Direction = ParameterDirection.Output;
                    cmd.Parameters.Add("Mensaje", SqlDbType.VarChar, 500).Direction = ParameterDirection.Output;

                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();

                    // Ejecutar el procedimiento almacenado de edición
                    cmd.ExecuteNonQuery();

                    respuesta = Convert.ToBoolean(cmd.Parameters["Respuesta"].Value);
                    Mensaje = cmd.Parameters["Mensaje"].Value.ToString();
                }
            }
            catch (Exception ex)
            {
                respuesta = false;
                Mensaje = ex.Message;
            }

            return respuesta;
        }

        public Usuario ObtenerUsuarioPorNombre(string nombre)
        {
            Usuario usuario = null;

            using (SqlConnection con = new SqlConnection(Conexion.cadena))
            {
                try
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("SP_OBTENERUSUARIOPORNOMBRE", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Nombre", nombre);

                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                usuario = new Usuario()
                                {
                                    IdUsuario = Convert.ToInt32(reader["IdUsuario"])
                                };
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }

            return usuario;
        }

        public async Task<Usuario> ObtenerUsuarioPorNombreAsync(string nombre)
        {
            try
            {
                // URL del endpoint
                string url = apiUrl + $"/usuarios/obtener-por-nombre?nombre={nombre}";
                //var response = await client.GetAsync($"http://localhost:3000/usuarios/obtener-por-nombre?nombre={nombre}");
                var response = await client.GetAsync(url);
                if (response.IsSuccessStatusCode)
                {
                    var responseBody = await response.Content.ReadAsStringAsync();
                    // Verifica si la API devolvió un objeto vacío
                    if (string.IsNullOrWhiteSpace(responseBody))
                    {
                        return null; // El usuario será null si la API devolvió un objeto vacío
                    }
                    else
                    {
                        var usuario = JsonConvert.DeserializeObject<Usuario>(responseBody);
                        return usuario; // Devuelve el usuario si se encontró
                    }
                }
                else
                {
                    var errorBody = await response.Content.ReadAsStringAsync();
                    Console.WriteLine($"Error en la autenticación: {errorBody}");
                    MessageBox.Show($"Error en la autenticación: {errorBody}", "Mensaje", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    return null; // El usuario será null si la respuesta no fue exitosa
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


    }
}
