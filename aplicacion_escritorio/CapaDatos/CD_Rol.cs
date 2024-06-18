using CapaEntidad;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;
using Newtonsoft.Json;
using Microsoft.Reporting.Map.WebForms.BingMaps;
using System.Windows.Forms;

namespace CapaDatos
{
    public class CD_Rol
    {
        // Get the API URL from ApiConfigManager
        readonly string apiUrl = ApiConfigManager.ApiUrl;
        // HttpClient es recomendable que sea estático y reutilizable
        private static readonly HttpClient client = new HttpClient();

        /// <summary>
        /// Realiza una solicitud asincrónica a la API para obtener la lista de roles.
        /// </summary>
        /// <returns>Una lista de objetos Rol si la solicitud es exitosa; de lo contrario, una excepcion.</returns>
        public async Task<List<Rol>> ListarRolAsync()
        {
            List<Rol> lista = new List<Rol>();
            try
            {
                string url = apiUrl + "/roles";
                HttpResponseMessage response = await client.GetAsync(url);

                // Verificar si la respuesta fue exitosa
                if (response.IsSuccessStatusCode)
                {
                    string responseBody = await response.Content.ReadAsStringAsync();
                    lista = JsonConvert.DeserializeObject<List<Rol>>(responseBody);
                }
                else
                {
                    // Obtener el mensaje de error del servidor
                    string errorBody = await response.Content.ReadAsStringAsync();
                    Console.WriteLine($"Error en la autenticación: {errorBody}");
                    MessageBox.Show($"Error en la autenticación: {errorBody}", "Mensaje", MessageBoxButtons.OK, MessageBoxIcon.Error);

                    return null;
                }
            }
            catch (HttpRequestException e)
            {
                // Manejo de excepciones de HttpRequestException
                Console.WriteLine($"Excepción al hacer la solicitud HTTP: {e.Message}");
                MessageBox.Show($"Excepción al hacer la solicitud HTTP: {e.Message}", "Mensaje", MessageBoxButtons.OK, MessageBoxIcon.Error);

                return null;
            }

            return lista;
        }

        // Método para listar roles desde la base de datos
        public List<Rol> Listar()
        {
            List<Rol> lista = new List<Rol>();


            using (SqlConnection con = new SqlConnection(Conexion.cadena))
            {
                try
                {
                    //consulta SQL para seleccionar datos de la tabla 'ROL'
                    StringBuilder query = new StringBuilder();
                    query.AppendLine("select IdRol, Descripcion from ROL");

                    // Creación de un comando SQL con la consulta y la conexión
                    SqlCommand cmd = new SqlCommand(query.ToString(), con);

                    cmd.CommandType = CommandType.Text;
                    con.Open();

                    // Ejecutar la consulta y leer los datos resultantes
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            lista.Add(new Rol()
                            {
                                IdRol = Convert.ToInt32(reader["IdRol"]),
                                Descripcion = reader["Descripcion"].ToString(),
                            });
                        }
                    }
                }
                catch (Exception ex)
                {

                    lista = new List<Rol>();
                }
            }
            return lista;
        }


    }
}
