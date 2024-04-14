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

namespace CapaDatos
{
    public class CD_Compra
    {
        private string connectionString = ConfigurationManager.ConnectionStrings["cadena_conexion"].ConnectionString;

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
