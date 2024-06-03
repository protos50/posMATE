using CapaEntidad;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Net.Http;

namespace CapaDatos
{
    public class CD_Permiso
    {
        // Get the API URL from ApiConfigManager
        readonly string apiUrl = ApiConfigManager.ApiUrl;
        // HttpClient es recomendable que sea estático y reutilizable
        private static readonly HttpClient client = new HttpClient();

        public List<Permiso> Listar(int idusuario)
        {
            List<Permiso> lista = new List<Permiso>();

            using (SqlConnection con = new SqlConnection(Conexion.cadena))
            {
                try
                {

                    StringBuilder query = new StringBuilder();
                    query.AppendLine("select PERMISO.IdRol,PERMISO.NombreMenu from  PERMISO");
                    query.AppendLine(" inner join ROL r on r.IdRol = PERMISO.IdRol");
                    query.AppendLine("inner join USUARIO u on u.IdRol = r.IdRol");
                    query.AppendLine("WHERE u.IdUsuario = @IdUsuario");



                    SqlCommand cmd = new SqlCommand(query.ToString(), con);
                    cmd.Parameters.AddWithValue("@IdUsuario", idusuario);
                    cmd.CommandType = CommandType.Text;
                    con.Open();


                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            lista.Add(new Permiso()
                            {
                                oRol = new Rol() { IdRol = Convert.ToInt32(reader["IdRol"]) },
                                NombreMenu = reader["NombreMenu"].ToString(),
                                // formato json de la estructura anterior



                            });
                        }
                    }
                }
                catch (Exception ex)
                {

                    lista = new List<Permiso>();
                }
            }
            return lista;
        }

        /// <summary>
        /// Realiza una solicitud asincrónica a la API para obtener la lista de permisos de un usuario específico.
        /// </summary>
        /// <param name="idusuario">El ID del usuario para el cual se quieren listar los permisos.</param>
        /// <returns>Una lista de objetos Permiso si la solicitud es exitosa; de lo contrario, una excepción.</returns>
        public async Task<List<Permiso>> ListarAsync(int idusuario)
        {
            List<Permiso> lista = new List<Permiso>();
            try
            {
                // URL del endpoint
                string url = apiUrl + "/permisos?idusuario=" + idusuario;
                // Realiza una solicitud GET a la API
                HttpResponseMessage response = await client.GetAsync(url);
                // Asegura que la respuesta sea exitosa (código de estado 200-299)
                response.EnsureSuccessStatusCode();
                // Lee el cuerpo de la respuesta como un string
                string responseBody = await response.Content.ReadAsStringAsync();
                // Deserializa el JSON a una lista de objetos Permiso
                lista = JsonConvert.DeserializeObject<List<Permiso>>(responseBody);
            }
            catch (HttpRequestException e)
            {
                // Manejo de excepciones en caso de error en la solicitud HTTP
                throw e;
            }
            // Devuelve la lista de permisos
            return lista;
        }

    }
}
