using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaEntidad;
using Newtonsoft.Json;
using System.Net.Http;


namespace CapaDatos
{
    public class CD_Cliente
    {
        private string connectionString = ConfigurationManager.ConnectionStrings["cadena_conexion"].ConnectionString;

        // Get the API URL from ApiConfigManager
        readonly string apiUrl = ApiConfigManager.ApiUrl;
        // HttpClient es recomendable que sea estático y reutilizable
        private static readonly HttpClient client = new HttpClient();

        public List<Cliente> ObtenerClientes()
        {
            List<Cliente> lista = new List<Cliente>();

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_OBTENERCLIENTES", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            lista.Add(new Cliente()
                            {
                                IdCliente = Convert.ToInt32(reader["IdCliente"]),
                                DNI = Convert.ToInt32(reader["DNI"]),
                                Nombre = reader["Nombre"].ToString(),
                                Apellido = reader["Apellido"].ToString()
                            });
                        }
                    }
                }
                catch (Exception ex)
                {
                    lista = new List<Cliente>();
                    // Manejar la excepción si es necesario
                }
            }
            return lista;
        }

        /// <summary>
        /// Realiza una solicitud asincrónica a la API para obtener la lista de clientes.
        /// </summary>
        /// <returns>Una lista de objetos Cliente si la solicitud es exitosa; de lo contrario, una excepcion.</returns>
        public async Task<List<Cliente>> ListarClienteAsync()
        {
            List<Cliente> lista = new List<Cliente>();
            try
            {
                string url = apiUrl + "/clientes";
                HttpResponseMessage response = await client.GetAsync(url);
                response.EnsureSuccessStatusCode();
                string responseBody = await response.Content.ReadAsStringAsync();
                lista = JsonConvert.DeserializeObject<List<Cliente>>(responseBody);
            }
            catch (HttpRequestException e)
            {
                throw e;
            }
            return lista;
        }

        public bool AgregarCliente(Cliente cliente)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_AGREGARCLIENTE", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@DNI", cliente.DNI);
                    cmd.Parameters.AddWithValue("@Nombre", cliente.Nombre);
                    cmd.Parameters.AddWithValue("@Apellido", cliente.Apellido);

                    con.Open();
                    int rowsAffected = cmd.ExecuteNonQuery();
                    return rowsAffected > 0;
                }
                catch (Exception ex)
                {
                    // Manejar la excepción si es necesario
                    return false;
                }
            }
        }

        public async Task<bool> AgregarClienteAsync(Cliente cliente)
        {
            try
            {
                // URL del endpoint de la API para agregar un cliente
                string url = $"{apiUrl}/clientes";

                // Convertir el objeto Cliente a JSON
                string jsonCliente = JsonConvert.SerializeObject(cliente);
                StringContent content = new StringContent(jsonCliente, Encoding.UTF8, "application/json");

                // Realizar la solicitud POST de manera asincrónica
                HttpResponseMessage response = await client.PostAsync(url, content);

                // Verificar si la solicitud fue exitosa
                response.EnsureSuccessStatusCode();

                // Opcionalmente, puedes verificar el código de estado o el contenido de la respuesta
                return response.IsSuccessStatusCode;
            }
            catch (HttpRequestException e)
            {
                // Manejar excepciones en caso de error en la solicitud HTTP
                Console.WriteLine($"Request error: {e.Message}");
                return false;
            }
        }


        public Cliente BuscarClientePorDNI(int dni)
        {
            Cliente clienteEncontrado = null;

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_BUSCARCLIENTEPORDNI", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@DNI", dni);

                    con.Open();

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            clienteEncontrado = new Cliente()
                            {
                                IdCliente = Convert.ToInt32(reader["IdCliente"]),
                                DNI = Convert.ToInt32(reader["DNI"]),
                                Nombre = reader["Nombre"].ToString(),
                                Apellido = reader["Apellido"].ToString()
                            };
                        }
                    }
                }
                catch (Exception ex)
                {
                    // Manejar la excepción si es necesario
                }
            }

            return clienteEncontrado;
        }

        public int ObtenerIdClientePorDNI(int dni)
        {
            int idCliente = -1; // Valor predeterminado si no se encuentra el cliente

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_OBTENERIDCLIENTEPORDNI", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@DNI", dni);

                    con.Open();

                    object result = cmd.ExecuteScalar();

                    if (result != null && result != DBNull.Value)
                    {
                        idCliente = Convert.ToInt32(result);
                    }
                }
                catch (Exception ex)
                {
                    // Manejar la excepción si es necesario
                }
            }

            return idCliente;
        }


    }
}