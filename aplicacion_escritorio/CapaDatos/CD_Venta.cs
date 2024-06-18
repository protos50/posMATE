using System;
using System.Text;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using System.Windows.Forms;
using CapaEntidad;
using Newtonsoft.Json;
using System.Net.Http;

namespace CapaDatos
{
    public class CD_Venta
    {
        private string connectionString = ConfigurationManager.ConnectionStrings["cadena_conexion"].ConnectionString;
        // Get the API URL from ApiConfigManager
        readonly string apiUrl = ApiConfigManager.ApiUrl;
        // HttpClient es recomendable que sea estático y reutilizable
        private static readonly HttpClient client = new HttpClient();

        public List<Venta> ObtenerVentas(int? IdUsuario = null)
        {
            List<Venta> lista = new List<Venta>();

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                try
                {
                    con.Open();

                    using (SqlCommand cmd = new SqlCommand("SELECT v.IdVenta, u.IdUsuario, u.Nombre AS NombreUsuario, c.Nombre AS NombreCliente,v.MontoPago, v.MontoCambio, v.MontoTotal, v.FechaRegistro " +
                                                  "FROM Venta v " +
                                                  "INNER JOIN USUARIO u ON v.IdUsuario = u.IdUsuario " +
                                                  "INNER JOIN Cliente c ON v.IdCliente = c.IdCliente" +
                                                  (IdUsuario.HasValue ? " WHERE v.IdUsuario = @IdUsuario" : ""), con))
                    {
                        cmd.CommandType = CommandType.Text;

                        if (IdUsuario.HasValue)
                        {
                            cmd.Parameters.AddWithValue("@IdUsuario", IdUsuario.Value);
                        }

                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                lista.Add(new Venta
                                {
                                    IdVenta = Convert.ToInt32(reader["IdVenta"]),
                                    oUsuario = new Usuario
                                    {
                                        IdUsuario = Convert.ToInt32(reader["IdUsuario"]),
                                        Nombre = reader["NombreUsuario"].ToString()
                                    },
                                    oCliente = new Cliente
                                    {
                                        Nombre = reader["NombreCliente"].ToString()
                                    },

                                    MontoPago = Convert.ToDecimal(reader["MontoPago"]),
                                    MontoCambio = Convert.ToDecimal(reader["MontoCambio"]),
                                    MontoTotal = Convert.ToDecimal(reader["MontoTotal"]),
                                    FechaRegistro = (DateTime)(reader["FechaRegistro"] as DateTime?)
                                });
                            }
                        }
                    }
                }
                catch (Exception ex)
                {

                    lista = new List<Venta>();
                    MessageBox.Show("Se produjo un error: " + ex.Message);
                }
            }

            return lista;
        }

        public async Task<List<Venta>> ObtenerVentasAsync(int? idUsuario = null)
        {
            List<Venta> lista = new List<Venta>();

            try
            {
                string url = apiUrl + "/ventas";
                if (idUsuario.HasValue)
                {
                    url += "?idusuario=" + idUsuario.Value;
                }

                HttpResponseMessage response = await client.GetAsync(url);
                response.EnsureSuccessStatusCode();
                string responseBody = await response.Content.ReadAsStringAsync();
                lista = JsonConvert.DeserializeObject<List<Venta>>(responseBody);
            }
            catch (HttpRequestException e)
            {
                throw e;
            }
            return lista;
        }

        public bool AgregarVenta(Venta venta)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                try
                {
                    string query = "INSERT INTO Venta(IdUsuario, IdCliente, MontoPago, MontoCambio, MontoTotal, FechaRegistro) " +
                        "VALUES(@IdUsuario, @IdCliente, @MontoPago, @MontoCambio, @MontoTotal, @FechaRegistro)";
                    SqlCommand cmd = new SqlCommand(query, con);
                    cmd.Parameters.AddWithValue("@IdUsuario", venta.oUsuario.IdUsuario);
                    cmd.Parameters.AddWithValue("@IdCliente", venta.oCliente.IdCliente);


                    cmd.Parameters.AddWithValue("@MontoPago", venta.MontoPago);
                    cmd.Parameters.AddWithValue("@MontoCambio", venta.MontoCambio);
                    cmd.Parameters.AddWithValue("@MontoTotal", venta.MontoTotal);
                    cmd.Parameters.AddWithValue("@FechaRegistro", venta.FechaRegistro);
                    cmd.CommandType = CommandType.Text;
                    con.Open();

                    int rowsAffected = cmd.ExecuteNonQuery();
                    return rowsAffected > 0;
                }
                catch (Exception ex)
                {

                    return false;
                }
            }
        }

        public async Task<bool> AgregarVentaAsync(Venta venta)
        {
            try
            {
                // URL del endpoint de la API para agregar una venta
                string url = $"{apiUrl}/ventas";

                // Convertir el objeto Venta a JSON
                string jsonVenta = JsonConvert.SerializeObject(venta);
                StringContent content = new StringContent(jsonVenta, Encoding.UTF8, "application/json");

                // Realizar la solicitud POST
                HttpResponseMessage response = await client.PostAsync(url, content);

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


        public int ObtenerUltimoIDVenta()
        {
            int ultimoID = -1;

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                try
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("SELECT TOP 1 IdVenta FROM Venta ORDER BY IdVenta DESC", con))
                    {
                        cmd.CommandType = CommandType.Text;

                        object result = cmd.ExecuteScalar();

                        if (result != null && result != DBNull.Value)
                        {
                            ultimoID = Convert.ToInt32(result);
                        }
                    }
                }
                catch (Exception ex)
                {

                }
            }

            return ultimoID;
        }

        public async Task<int> ObtenerUltimoIDVentaAsync()
        {
            int ultimoID = -1;
            try
            {
                // URL del endpoint de la API para obtener el último ID de venta
                string url = $"{apiUrl}/ventas/ultimoid";

                // Realizar la solicitud GET de manera asincrónica
                HttpResponseMessage response = await client.GetAsync(url);

                // Verificar si la solicitud fue exitosa
                if (response.IsSuccessStatusCode)
                {
                    // Leer el contenido de la respuesta como string de manera asincrónica
                    string responseBody = await response.Content.ReadAsStringAsync();

                    // Convertir el string JSON a un entero
                    ultimoID = JsonConvert.DeserializeObject<int>(responseBody);
                }
                else
                {
                    // Manejar el caso cuando el estado no es exitoso
                    Console.WriteLine($"Error en la solicitud: {response.StatusCode}");
                }
            }
            catch (HttpRequestException e)
            {
                // Manejar excepciones en caso de error en la solicitud HTTP
                Console.WriteLine($"Request error: {e.Message}");
            }

            return ultimoID;
        }

        public List<Venta> ObtenerVentasPorIdUsuario(int idUsuario)
        {
            List<Venta> ventasUsuario = new List<Venta>();

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                try
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("SELECT v.IdVenta, u.IdUsuario, u.Nombre AS NombreUsuario, c.Nombre AS NombreCliente, v.MontoPago, v.MontoCambio, v.MontoTotal, v.FechaRegistro " +
                                                          "FROM Venta v " +
                                                          "INNER JOIN Usuario u ON v.IdUsuario = u.IdUsuario " +
                                                          "INNER JOIN Cliente c ON v.IdCliente = c.IdCliente " +
                                                          "WHERE u.IdUsuario = @IdUsuario", con))
                    {
                        cmd.CommandType = CommandType.Text;
                        cmd.Parameters.AddWithValue("@IdUsuario", idUsuario);

                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                ventasUsuario.Add(new Venta
                                {
                                    IdVenta = Convert.ToInt32(reader["IdVenta"]),
                                    oUsuario = new Usuario
                                    {
                                        IdUsuario = Convert.ToInt32(reader["IdUsuario"]),
                                        Nombre = reader["NombreUsuario"].ToString()
                                    },
                                    oCliente = new Cliente
                                    {
                                        Nombre = reader["NombreCliente"].ToString()
                                    },
                                    MontoPago = Convert.ToDecimal(reader["MontoPago"]),
                                    MontoCambio = Convert.ToDecimal(reader["MontoCambio"]),
                                    MontoTotal = Convert.ToDecimal(reader["MontoTotal"]),
                                    FechaRegistro = (DateTime)(reader["FechaRegistro"] as DateTime?)
                                });
                            }
                        }
                    }
                }
                catch (Exception ex)
                {

                    MessageBox.Show("Se produjo un error: " + ex.Message);
                }
            }

            return ventasUsuario;
        }

        public List<Venta> ObtenerVentasPorIntervaloDeTiempo(DateTime fechaDesde, DateTime fechaHasta)
        {
            List<Venta> ventasFiltradas = new List<Venta>();

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                try
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("SELECT v.IdVenta, u.IdUsuario, u.Nombre AS NombreUsuario, c.Nombre AS NombreCliente, v.MontoPago, v.MontoCambio, v.MontoTotal, v.FechaRegistro " +
                                                          "FROM Venta v " +
                                                          "INNER JOIN Usuario u ON v.IdUsuario = u.IdUsuario " +
                                                          "INNER JOIN Cliente c ON v.IdCliente = c.IdCliente " +
                                                          "WHERE v.FechaRegistro >= @FechaDesde AND v.FechaRegistro <= @FechaHasta", con))
                    {
                        cmd.CommandType = CommandType.Text;
                        cmd.Parameters.AddWithValue("@FechaDesde", fechaDesde);
                        cmd.Parameters.AddWithValue("@FechaHasta", fechaHasta);

                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                ventasFiltradas.Add(new Venta
                                {
                                    IdVenta = Convert.ToInt32(reader["IdVenta"]),
                                    oUsuario = new Usuario
                                    {
                                        IdUsuario = Convert.ToInt32(reader["IdUsuario"]),
                                        Nombre = reader["NombreUsuario"].ToString()
                                    },
                                    oCliente = new Cliente
                                    {
                                        Nombre = reader["NombreCliente"].ToString()
                                    },
                                    MontoPago = Convert.ToDecimal(reader["MontoPago"]),
                                    MontoCambio = Convert.ToDecimal(reader["MontoCambio"]),
                                    MontoTotal = Convert.ToDecimal(reader["MontoTotal"]),
                                    FechaRegistro = (DateTime)(reader["FechaRegistro"] as DateTime?)
                                });
                            }
                        }
                    }
                }
                catch (Exception ex)
                {

                    MessageBox.Show("Se produjo un error: " + ex.Message);
                }
            }

            return ventasFiltradas;
        }

        public decimal CalcularMontoTotalVentasPorFecha(DateTime fechaDesde, DateTime fechaHasta)
        {
            decimal montoTotal = 0;

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                try
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("SELECT SUM(MontoTotal) AS MontoTotal FROM Venta " +
                                                          "WHERE FechaRegistro >= @FechaDesde AND FechaRegistro <= @FechaHasta", con))
                    {
                        cmd.CommandType = CommandType.Text;
                        cmd.Parameters.AddWithValue("@FechaDesde", fechaDesde);
                        cmd.Parameters.AddWithValue("@FechaHasta", fechaHasta);

                        object result = cmd.ExecuteScalar();

                        if (result != null && result != DBNull.Value)
                        {
                            montoTotal = Convert.ToDecimal(result);
                        }
                    }
                }
                catch (Exception ex)
                {

                    MessageBox.Show("Se produjo un error: " + ex.Message);
                }
            }

            return montoTotal;
        }
    }
}
