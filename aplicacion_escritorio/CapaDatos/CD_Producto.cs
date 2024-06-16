using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaEntidad;
using System.Net.Http;
using Newtonsoft.Json;

namespace CapaDatos
{
    public class CD_Producto
    {
        private string connectionString = ConfigurationManager.ConnectionStrings["cadena_conexion"].ConnectionString;

        // Get the API URL from ApiConfigManager
        readonly string apiUrl = ApiConfigManager.ApiUrl;
        // HttpClient es recomendable que sea estático y reutilizable
        private static readonly HttpClient client = new HttpClient();

        public List<Producto> ObtenerProductos()
        {
            List<Producto> lista = new List<Producto>();

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                try
                {
                    StringBuilder query = new StringBuilder();
                    query.AppendLine("SELECT p.IdProducto, p.IdCategoria, p.Nombre, p.Descripcion, p.Stock, p.PrecioCompra, p.PrecioVenta, p.Estado, p.FechaRegistro, c.Descripcion AS CategoriaDescripcion, p.codigoProducto ");
                    query.AppendLine("FROM PRODUCTO p ");
                    query.AppendLine("LEFT JOIN CATEGORIA c ON p.IdCategoria = c.IdCategoria");

                    SqlCommand cmd = new SqlCommand(query.ToString(), con);
                    cmd.CommandType = CommandType.Text;
                    con.Open();

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            lista.Add(new Producto()
                            {
                                IdProducto = Convert.ToInt32(reader["IdProducto"]),
                                oCategoria = new Categoria
                                {
                                    IdCategoria = Convert.ToInt32(reader["IdCategoria"]),
                                    Descripcion = reader["CategoriaDescripcion"].ToString()
                                },
                                Nombre = reader["Nombre"].ToString(),
                                Descripcion = reader["Descripcion"].ToString(),
                                Stock = Convert.ToInt32(reader["Stock"]),
                                PrecioCompra = Convert.ToDecimal(reader["PrecioCompra"]),
                                PrecioVenta = Convert.ToDecimal(reader["PrecioVenta"]),
                                Estado = Convert.ToBoolean(reader["Estado"]),
                                FechaRegistro = (DateTime)(reader["FechaRegistro"] as DateTime?),
                                codigoProducto = reader["codigoProducto"].ToString()

                            });
                        }
                    }
                }
                catch (Exception ex)
                {

                    lista = new List<Producto>();
                }
            }
            return lista;
        }

        /// <summary>
        /// Realiza una solicitud asincrónica a la API para obtener la lista de productos.
        /// </summary>
        /// <returns>Una lista de objetos Producto si la solicitud es exitosa; de lo contrario, una excepcion.</returns>
        public async Task<List<Producto>> ObtenerProductosAsync()
        {
            // Inicializa una nueva lista de productos
            List<Producto> lista = new List<Producto>();
            try
            {
                // URL del endpoint
                string url = apiUrl + "/productos";
                // Realiza una solicitud GET a la API
                HttpResponseMessage response = await client.GetAsync(url);
                // Asegura que la respuesta sea exitosa (código de estado 200-299)
                response.EnsureSuccessStatusCode();
                // Lee el cuerpo de la respuesta como un string
                string responseBody = await response.Content.ReadAsStringAsync();
                // Deserializa el JSON a una lista de objetos Producto
                lista = JsonConvert.DeserializeObject<List<Producto>>(responseBody);
            }
            catch (HttpRequestException e)
            {
                // Manejo de excepciones en caso de error en la solicitud HTTP
                throw e;
            }
            // Devuelve la lista de productos
            return lista;
        }

        public bool AgregarProducto(Producto producto)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                try
                {
                    string query = "INSERT INTO PRODUCTO (IdCategoria, Nombre, Descripcion, Stock, PrecioCompra, PrecioVenta, Estado, FechaRegistro, codigoProducto) " +
                                   "VALUES (@IdCategoria, @Nombre, @Descripcion, @Stock, @PrecioCompra, @PrecioVenta, @Estado, @FechaRegistro, @codigoProducto)";

                    SqlCommand cmd = new SqlCommand(query, con);
                    cmd.Parameters.AddWithValue("@IdCategoria", producto.oCategoria.IdCategoria);
                    cmd.Parameters.AddWithValue("@Nombre", producto.Nombre);
                    cmd.Parameters.AddWithValue("@Descripcion", producto.Descripcion);
                    cmd.Parameters.AddWithValue("@Stock", producto.Stock);
                    cmd.Parameters.AddWithValue("@PrecioCompra", producto.PrecioCompra);
                    cmd.Parameters.AddWithValue("@PrecioVenta", producto.PrecioVenta);
                    cmd.Parameters.AddWithValue("@Estado", producto.Estado);
                    cmd.Parameters.AddWithValue("@FechaRegistro", producto.FechaRegistro);
                    cmd.Parameters.AddWithValue("@codigoProducto", producto.codigoProducto);

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

        public async Task<bool> AgregarProductoAsync(Producto producto)
        {
            try
            {
                // URL del endpoint de la API para agregar un producto
                string url = $"{apiUrl}/productos";

                // Convertir el objeto Producto a JSON
                string jsonProducto = JsonConvert.SerializeObject(producto);
                StringContent content = new StringContent(jsonProducto, Encoding.UTF8, "application/json");

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

        public bool EditarProducto(Producto producto)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                try
                {
                    string query = "UPDATE PRODUCTO " +
                                   "SET IdCategoria = @IdCategoria, Nombre = @Nombre, Descripcion = @Descripcion, Stock = @Stock, " +
                                   "PrecioCompra = @PrecioCompra, PrecioVenta = @PrecioVenta, Estado = @Estado, FechaRegistro = @FechaRegistro, codigoProducto = @codigoProducto " +
                                   "WHERE IdProducto = @IdProducto";

                    SqlCommand cmd = new SqlCommand(query, con);
                    cmd.Parameters.AddWithValue("@IdProducto", producto.IdProducto);
                    cmd.Parameters.AddWithValue("@IdCategoria", producto.oCategoria.IdCategoria);
                    cmd.Parameters.AddWithValue("@Nombre", producto.Nombre);
                    cmd.Parameters.AddWithValue("@Descripcion", producto.Descripcion);
                    cmd.Parameters.AddWithValue("@Stock", producto.Stock);
                    cmd.Parameters.AddWithValue("@PrecioCompra", producto.PrecioCompra);
                    cmd.Parameters.AddWithValue("@PrecioVenta", producto.PrecioVenta);
                    cmd.Parameters.AddWithValue("@Estado", producto.Estado);
                    cmd.Parameters.AddWithValue("@FechaRegistro", producto.FechaRegistro);
                    cmd.Parameters.AddWithValue("@codigoProducto", producto.codigoProducto);

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

        public async Task<bool> EditarProductoAsync(Producto producto)
        {
            try
            {
                string url = $"{apiUrl}/productos/{producto.IdProducto}";

                var jsonContent = JsonConvert.SerializeObject(producto);
                var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");

                HttpResponseMessage response = await client.PutAsync(url, content);

                if (response.IsSuccessStatusCode)
                {
                    return true;
                }
                else
                {
                    Console.WriteLine($"Error: {response.StatusCode} - {response.ReasonPhrase}");
                    return false;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex.Message}");
                return false;
            }
        }



        public Producto ObtenerProductoPorCodigoProducto(string codigoProducto)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                try
                {
                    string query = "SELECT p.IdProducto, p.IdCategoria, p.Nombre, p.Descripcion, p.Stock, p.PrecioCompra, p.PrecioVenta, p.Estado, p.FechaRegistro, c.Descripcion AS CategoriaDescripcion, p.codigoProducto " +
                                   "FROM PRODUCTO p " +
                                   "LEFT JOIN CATEGORIA c ON p.IdCategoria = c.IdCategoria " +
                                   "WHERE p.codigoProducto = @CodigoProducto";

                    SqlCommand cmd = new SqlCommand(query, con);
                    cmd.Parameters.AddWithValue("@CodigoProducto", codigoProducto);
                    cmd.CommandType = CommandType.Text;
                    con.Open();

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return new Producto
                            {
                                IdProducto = Convert.ToInt32(reader["IdProducto"]),
                                oCategoria = new Categoria
                                {
                                    IdCategoria = Convert.ToInt32(reader["IdCategoria"]),
                                    Descripcion = reader["CategoriaDescripcion"].ToString()
                                },
                                Nombre = reader["Nombre"].ToString(),
                                Descripcion = reader["Descripcion"].ToString(),
                                Stock = Convert.ToInt32(reader["Stock"]),
                                PrecioCompra = Convert.ToDecimal(reader["PrecioCompra"]),
                                PrecioVenta = Convert.ToDecimal(reader["PrecioVenta"]),
                                Estado = Convert.ToBoolean(reader["Estado"]),
                                FechaRegistro = (DateTime)(reader["FechaRegistro"] as DateTime?),
                                codigoProducto = reader["codigoProducto"].ToString()
                            };
                        }
                    }


                    return null;
                }
                catch (Exception ex)
                {

                    return null;
                }
            }
        }

        public async Task<Producto> ObtenerProductoPorCodigoProductoAsync(string codigoProducto)
        {
            try
            {
                string url = $"{apiUrl}/productos/codigo/{codigoProducto}";

                HttpResponseMessage response = await client.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    string jsonResponse = await response.Content.ReadAsStringAsync();
                    Producto producto = JsonConvert.DeserializeObject<Producto>(jsonResponse);
                    return producto;
                }
                else
                {
                    Console.WriteLine($"Error: {response.StatusCode} - {response.ReasonPhrase}");
                    return null;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex.Message}");
                return null;
            }
        }

        public bool ActualizarStockProducto(int productoId, int cantidad)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                try
                {
                    string query = "UPDATE PRODUCTO SET Stock = Stock + @Cantidad WHERE IdProducto = @ProductoId";

                    SqlCommand cmd = new SqlCommand(query, con);
                    cmd.Parameters.AddWithValue("@Cantidad", cantidad);
                    cmd.Parameters.AddWithValue("@ProductoId", productoId);

                    cmd.CommandType = CommandType.Text;
                    con.Open();

                    int rowsAffected = cmd.ExecuteNonQuery();
                    return rowsAffected > 0;
                }
                catch (Exception ex)
                {
                    // Manejo de errores aquí
                    return false;
                }
            }
        }

        public async Task<bool> ActualizarStockProductoAsync(int productoId, int cantidad)
        {
            try
            {
                string url = $"{apiUrl}/productos/{productoId}/actualizarStock";
                var content = new StringContent(JsonConvert.SerializeObject(new { cantidad }), Encoding.UTF8, "application/json");

                HttpResponseMessage response = await client.PutAsync(url, content);

                return response.IsSuccessStatusCode;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex.Message}");
                return false;
            }
        }


        public bool ActualizarStockProductoVenta(int productoId, int cantidad)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                try
                {
                    string query = "UPDATE PRODUCTO SET Stock = Stock - @Cantidad WHERE IdProducto = @ProductoId";

                    SqlCommand cmd = new SqlCommand(query, con);
                    cmd.Parameters.AddWithValue("@Cantidad", cantidad);
                    cmd.Parameters.AddWithValue("@ProductoId", productoId);

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

        public async Task<bool> ActualizarStockProductoVentaAsync(int productoId, int cantidad)
        {
            try
            {
                string url = $"{apiUrl}/productos/{productoId}/actualizarStockVenta";
                var content = new StringContent(JsonConvert.SerializeObject(new { cantidad }), Encoding.UTF8, "application/json");

                HttpResponseMessage response = await client.PutAsync(url, content);

                return response.IsSuccessStatusCode;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex.Message}");
                return false;
            }
        }


        public Producto ObtenerProductoPorId(int id)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                try
                {
                    string query = "SELECT p.IdProducto, p.IdCategoria, p.Nombre, p.Descripcion, p.Stock, p.PrecioCompra, p.PrecioVenta, p.Estado, p.FechaRegistro, c.Descripcion AS CategoriaDescripcion, p.codigoProducto " +
                                   "FROM PRODUCTO p " +
                                   "LEFT JOIN CATEGORIA c ON p.IdCategoria = c.IdCategoria " +
                                   "WHERE p.IdProducto = @id";

                    SqlCommand cmd = new SqlCommand(query, con);
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.CommandType = CommandType.Text;
                    con.Open();

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return new Producto
                            {
                                IdProducto = Convert.ToInt32(reader["IdProducto"]),
                                oCategoria = new Categoria
                                {
                                    IdCategoria = Convert.ToInt32(reader["IdCategoria"]),
                                    Descripcion = reader["CategoriaDescripcion"].ToString()
                                },
                                Nombre = reader["Nombre"].ToString(),
                                Descripcion = reader["Descripcion"].ToString(),
                                Stock = Convert.ToInt32(reader["Stock"]),
                                PrecioCompra = Convert.ToDecimal(reader["PrecioCompra"]),
                                PrecioVenta = Convert.ToDecimal(reader["PrecioVenta"]),
                                Estado = Convert.ToBoolean(reader["Estado"]),
                                FechaRegistro = (DateTime)(reader["FechaRegistro"] as DateTime?),
                                codigoProducto = reader["codigoProducto"].ToString()
                            };
                        }
                    }


                    return null;
                }
                catch (Exception ex)
                {

                    return null;
                }
            }
        }

        public async Task<Producto> ObtenerProductoPorIdAsync(int id)
        {
            try
            {
                string url = $"{apiUrl}/productos/{id}";

                HttpResponseMessage response = await client.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    string jsonResponse = await response.Content.ReadAsStringAsync();
                    Producto producto = JsonConvert.DeserializeObject<Producto>(jsonResponse);
                    return producto;
                }
                else
                {
                    Console.WriteLine($"Error: {response.StatusCode} - {response.ReasonPhrase}");
                    return null;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex.Message}");
                return null;
            }
        }


        public List<Producto> ObtenerProductosMasVendidos(int topN, DateTime fechaDesde, DateTime fechaHasta)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                try
                {
                    string query = "SELECT TOP (@TopN) p.IdProducto, SUM(dv.Cantidad) AS TotalVendido " +
                                   "FROM PRODUCTO p " +
                                   "INNER JOIN DETALLE_VENTA dv ON p.IdProducto = dv.IdProducto " +
                                   "WHERE dv.FechaRegistro BETWEEN @FechaDesde AND @FechaHasta " +
                                   "GROUP BY p.IdProducto " +
                                   "ORDER BY TotalVendido DESC";

                    SqlCommand cmd = new SqlCommand(query, con);
                    cmd.Parameters.AddWithValue("@TopN", topN);
                    cmd.Parameters.AddWithValue("@FechaDesde", fechaDesde);
                    cmd.Parameters.AddWithValue("@FechaHasta", fechaHasta);
                    cmd.CommandType = CommandType.Text;
                    con.Open();

                    List<Producto> productosMasVendidos = new List<Producto>();

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            int idProducto = Convert.ToInt32(reader["IdProducto"]);
                            Producto producto = ObtenerProductoPorId(idProducto);
                            if (producto != null)
                            {
                                productosMasVendidos.Add(producto);
                            }
                        }
                    }

                    return productosMasVendidos;
                }
                catch (Exception ex)
                {

                    return new List<Producto>();
                }
            }
        }

        public async Task<List<Producto>> ObtenerProductosMasVendidosAsync(int topN, DateTime fechaDesde, DateTime fechaHasta)
        {
            try
            {
                var url = $"{apiUrl}/productos/masvendidos?topN={topN}&fechaDesde={fechaDesde:yyyy-MM-dd}&fechaHasta={fechaHasta:yyyy-MM-dd}";

                HttpResponseMessage response = await client.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    string jsonResponse = await response.Content.ReadAsStringAsync();
                    List<Producto> productosMasVendidos = JsonConvert.DeserializeObject<List<Producto>>(jsonResponse);
                    return productosMasVendidos;
                }
                else
                {
                    // Manejar el caso de una respuesta no exitosa
                    return new List<Producto>();
                }
            }
            catch (Exception ex)
            {
                // Manejar la excepción
                return new List<Producto>();
            }
        }


    }
}
