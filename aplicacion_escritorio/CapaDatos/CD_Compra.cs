using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaEntidad;
using System.Windows.Forms;
using Newtonsoft.Json;
using System.Net.Http;

namespace CapaDatos
{
    public class CD_Compra
    {
        private string connectionString = ConfigurationManager.ConnectionStrings["cadena_conexion"].ConnectionString;

        // Get the API URL from ApiConfigManager
        readonly string apiUrl = ApiConfigManager.ApiUrl;
        // HttpClient es recomendable que sea estático y reutilizable
        private static readonly HttpClient client = new HttpClient();


        public List<Compra> ObtenerCompras(int? IdUsuario = null)
        {
            List<Compra> lista = new List<Compra>();

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                try
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("SP_OBTENERCOMPRAS", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        // Agregar parámetro si es necesario
                        if (IdUsuario.HasValue)
                        {
                            cmd.Parameters.AddWithValue("@IdUsuario", IdUsuario.Value);
                        }

                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                lista.Add(new Compra
                                {
                                    IdCompra = Convert.ToInt32(reader["IdCompra"]),
                                    oUsuario = new Usuario
                                    {
                                        Nombre = reader["NombreUsuario"].ToString()
                                    },
                                    oProveedor = new Proveedor
                                    {
                                        Nombre = reader["NombreProveedor"].ToString()
                                    },
                                    MontoTotal = Convert.ToDecimal(reader["MontoTotal"]),
                                    FechaRegistro = (DateTime)(reader["FechaRegistro"] as DateTime?)
                                });
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    // Manejar la excepción según sea necesario
                    lista = new List<Compra>();
                }
            }
            return lista;
        }

        /// <summary>
        /// Realiza una solicitud asincrónica a la API para obtener la lista de compras realizadas de un usuario específico
        /// si es pasado el id del usuario, sino todas las compras.
        /// </summary>
        /// <param name="IdUsuario">El id del usuario o null si se desea obtener todas las compras</param>
        /// <returns>Una lista de objetos Compra con los datos de las compras realizadas</returns>
        public async Task<List<Compra>> ObtenerComprasAsync(int? IdUsuario = null)
        {
            List<Compra> lista = new List<Compra>();

            try
            {
                string url = apiUrl + "/compras";
                if (IdUsuario.HasValue)
                {
                    url += "?idusuario=" + IdUsuario.Value;
                }

                HttpResponseMessage response = await client.GetAsync(url);
                response.EnsureSuccessStatusCode();
                string responseBody = await response.Content.ReadAsStringAsync();
                lista = JsonConvert.DeserializeObject<List<Compra>>(responseBody);
            }
            catch (HttpRequestException e)
            {
                // Manejo de excepciones en caso de error en la solicitud HTTP
                throw e;
            }
            return lista;
        }


        public bool AgregarCompra(Compra compra)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_AGREGARCOMPRA", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@IdUsuario", compra.oUsuario.IdUsuario);
                    cmd.Parameters.AddWithValue("@IdProveedor", compra.oProveedor.IdProveedor);
                    cmd.Parameters.AddWithValue("@MontoTotal", compra.MontoTotal);
                    cmd.Parameters.AddWithValue("@FechaRegistro", compra.FechaRegistro);

                    con.Open();

                    int success = (int)cmd.ExecuteScalar();
                    return success == 1;
                }
                catch (Exception ex)
                {
                    return false;
                }
            }
        }

        public bool AgregarCompraAsync(Compra compra)
        {
            try
            {
                // URL del endpoint de la API para agregar una compra
                string url = $"{apiUrl}/compras";

                // Convertir el objeto Compra a JSON
                string jsonCompra = JsonConvert.SerializeObject(compra);
                StringContent content = new StringContent(jsonCompra, Encoding.UTF8, "application/json");

                // Realizar la solicitud POST
                HttpResponseMessage response = client.PostAsync(url, content).Result;

                // Asegurarse de que la solicitud fue exitosa
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


        public int ObtenerUltimoIDCompra()
        {
            int ultimoID = -1;

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                try
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("SP_OBTENERULTIMOIDCOMPRA", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        object result = cmd.ExecuteScalar();

                        if (result != null && result != DBNull.Value)
                        {
                            ultimoID = Convert.ToInt32(result);
                        }
                    }
                }
                catch (Exception ex)
                {
                    // Manejo de excepciones
                }
            }

            return ultimoID;
        }



        public decimal CalcularMontoTotalComprasPorFecha(DateTime fechaDesde, DateTime fechaHasta)
        {
            decimal montoTotal = 0;

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_CALCULARMONTOTOTALCOMPRASPORFECHA", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@FechaDesde", fechaDesde);
                    cmd.Parameters.AddWithValue("@FechaHasta", fechaHasta);

                    con.Open();

                    object result = cmd.ExecuteScalar();

                    if (result != null && result != DBNull.Value)
                    {
                        montoTotal = Convert.ToDecimal(result);
                    }
                }
                catch (Exception ex)
                {
                    // Manejar la excepción según sea necesario
                    MessageBox.Show("Se produjo un error: " + ex.Message);
                }
            }

            return montoTotal;
        }

    }
}
