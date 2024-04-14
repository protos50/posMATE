using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaEntidad;

namespace CapaDatos
{
    public class CD_Categoria
    {
        private string connectionString = ConfigurationManager.ConnectionStrings["cadena_conexion"].ConnectionString;

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
