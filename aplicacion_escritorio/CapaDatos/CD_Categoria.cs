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
using System.Windows.Forms;

namespace CapaDatos
{
    public class CD_Categoria
    {
        private string connectionString = ConfigurationManager.ConnectionStrings["cadena_conexion"].ConnectionString;

        // Get the API URL from ApiConfigManager
        readonly string apiUrl = ApiConfigManager.ApiUrl;
        // HttpClient es recomendable que sea estático y reutilizable
        private static readonly HttpClient client = new HttpClient();

        public List<Categoria> ObtenerCategorias()
        {
            List<Categoria> lista = new List<Categoria>();

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_OBTENERCATEGORIAS", con); // Nombre del procedimiento almacenado
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            lista.Add(new Categoria()
                            {
                                IdCategoria = Convert.ToInt32(reader["IdCategoria"]),
                                Descripcion = reader["Descripcion"].ToString(),
                                estado = Convert.ToBoolean(reader["estado"])
                            });
                        }
                    }
                }
                catch (Exception ex)
                {
                    // Manejar la excepción si es necesario
                    lista = new List<Categoria>();
                }
            }
            return lista;
        }

        public async Task<List<Categoria>> ObtenerCategoriasAsync()
        {
            List<Categoria> listaCategoria = new List<Categoria>();

            try
            {
                // URL del endpoint
                string url = apiUrl + "/categorias";

                //Peticion GET a la API
                HttpResponseMessage responseMessage = await client.GetAsync(url);

                //Asegura que la respuesta de la peticion sea exitosa o retorna excepcion
                responseMessage.EnsureSuccessStatusCode();
                //
                string responseBody = await responseMessage.Content.ReadAsStringAsync();
                //
                listaCategoria = JsonConvert.DeserializeObject<List<Categoria>>(responseBody);

            }
            catch (HttpRequestException e)
            {

                throw e;
            }

            return listaCategoria;
        }

        public bool AgregarCategoria(Categoria categoria)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_AGREGARCATEGORIA", con); // Nombre del procedimiento almacenado
                    cmd.CommandType = CommandType.StoredProcedure;

                    // Agregar parámetros al procedimiento almacenado
                    cmd.Parameters.AddWithValue("@Descripcion", categoria.Descripcion);
                    cmd.Parameters.AddWithValue("@Estado", categoria.estado);

                    // Agregar parámetro de salida para indicar el éxito de la operación
                    SqlParameter successParameter = new SqlParameter("@Success", SqlDbType.Bit);
                    successParameter.Direction = ParameterDirection.Output;
                    cmd.Parameters.Add(successParameter);

                    con.Open();
                    cmd.ExecuteNonQuery();

                    // Obtener el valor del parámetro de salida
                    bool success = (bool)successParameter.Value;
                    return success;
                }
                catch (Exception ex)
                {

                    return false;
                }
            }
        }

        public async Task<(bool Success, string Mensaje)> AgregarCategoriaAsync(Categoria categoria)
        {
            bool success = false;
            string mensaje = string.Empty;

            try
            {
                //Empaqueta los datos de la categoría en un objeto anónimo
                var categoriaData = new
                {
                    Descripcion = categoria.Descripcion,
                    Estado = categoria.estado
                };

                var content = new StringContent(JsonConvert.SerializeObject(categoriaData), Encoding.UTF8, "application/json");

               
                string url = apiUrl + "/categorias/agregar";  // URL del endpoint
                var response = await client.PostAsync(url, content);  // Realiza la solicitud POST a la API de registro de categorias

                var responseBody = await response.Content.ReadAsStringAsync();  // Lee el cuerpo de la respuesta como un string
                dynamic result = JsonConvert.DeserializeObject<dynamic>(responseBody); // Deserializa el mensaje de respuesta a un objeto JSON

                if (response.IsSuccessStatusCode)
                {
                    success = result.Success;  // Obtiene el valor de la propiedad Success de result
                    mensaje = result.Mensaje;  // Si la solicitud fue exitosa, obtiene el mensaje de respuesta
                }
                else
                {
                    // Muestra un messagebox con el mensaje de error
                    MessageBox.Show($"Error al agregar categoría: {result.Message}", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            catch (HttpRequestException e)
            {
                // Exepcion en caso de error en la solicitud POST
                mensaje = e.Message;
            }

            return (success, mensaje);
        }

        public bool EditarCategoria(Categoria categoria)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_EDITARCATEGORIA", con); // Nombre del procedimiento almacenado
                    cmd.CommandType = CommandType.StoredProcedure;

                    // Agregar parámetros al procedimiento almacenado
                    cmd.Parameters.AddWithValue("@IdCategoria", categoria.IdCategoria);
                    cmd.Parameters.AddWithValue("@Descripcion", categoria.Descripcion);
                    cmd.Parameters.AddWithValue("@Estado", categoria.estado);

                    // Agregar parámetro de salida para indicar el éxito de la operación
                    SqlParameter successParameter = new SqlParameter("@Success", SqlDbType.Bit);
                    successParameter.Direction = ParameterDirection.Output;
                    cmd.Parameters.Add(successParameter);

                    con.Open();
                    cmd.ExecuteNonQuery();

                    // Obtener el valor del parámetro de salida
                    bool success = (bool)successParameter.Value;
                    return success;
                }
                catch (Exception ex)
                {
                    // Manejar la excepción si es necesario
                    return false;
                }
            }
        }

        public Categoria ObtenerCategoriaPorId(int idCategoria)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_OBTENERCATEGORIAPORID", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@IdCategoria", idCategoria);
                    cmd.Parameters.Add("@Descripcion", SqlDbType.NVarChar, 100).Direction = ParameterDirection.Output;
                    cmd.Parameters.Add("@Estado", SqlDbType.Bit).Direction = ParameterDirection.Output;

                    con.Open();
                    cmd.ExecuteNonQuery();

                    // Recuperar los valores de salida de los parámetros
                    string descripcion = cmd.Parameters["@Descripcion"].Value.ToString();
                    bool estado = Convert.ToBoolean(cmd.Parameters["@Estado"].Value);

                    // Crear y devolver la instancia de Categoria
                    Categoria categoria = new Categoria
                    {
                        IdCategoria = idCategoria,
                        Descripcion = descripcion,
                        estado = estado
                    };

                    return categoria;
                }
                catch (Exception ex)
                {
                    // Manejar la excepción si es necesario
                    return null;
                }
            }
        }



        public List<Categoria> ObtenerCategoriasMasVendidas(int topN, DateTime fechaDesde, DateTime fechaHasta)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_OBTENERCATEGORIASMASVENDIDAS", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@TopN", topN);
                    cmd.Parameters.AddWithValue("@FechaDesde", fechaDesde);
                    cmd.Parameters.AddWithValue("@FechaHasta", fechaHasta);

                    con.Open();

                    List<Categoria> categoriasMasVendidas = new List<Categoria>();

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Categoria categoria = new Categoria
                            {
                                IdCategoria = Convert.ToInt32(reader["IdCategoria"]),
                                Descripcion = reader["Descripcion"].ToString(),
                                estado = Convert.ToBoolean(reader["Estado"])
                            };
                            categoriasMasVendidas.Add(categoria);
                        }
                    }

                    return categoriasMasVendidas;
                }
                catch (Exception ex)
                {
                    // Manejar la excepción si es necesario
                    return new List<Categoria>();
                }
            }
        }


    }
}
