﻿using System;
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
    public class CD_DetalleCompra
    {
        private string connectionString = ConfigurationManager.ConnectionStrings["cadena_conexion"].ConnectionString;

        public List<DetalleCompra> ObtenerDetallesCompra(int idCompra)
        {
            List<DetalleCompra> lista = new List<DetalleCompra>();

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                try
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("SP_OBTENERDETALLESCOMPRA", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@IdCompra", idCompra);

                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                lista.Add(new DetalleCompra
                                {
                                    IdDetalleCompra = Convert.ToInt32(reader["IdDetalleCompra"]),
                                    oProducto = new Producto
                                    {
                                        IdProducto = Convert.ToInt32(reader["IdProducto"]),
                                        Nombre = reader["NombreProducto"].ToString()
                                    },
                                    PrecioCompra = Convert.ToDecimal(reader["PrecioCompra"]),
                                    PrecioVenta = Convert.ToDecimal(reader["PrecioVenta"]),
                                    Cantidad = Convert.ToInt32(reader["Cantidad"]),
                                    MontoTotal = Convert.ToDecimal(reader["MontoTotal"]),
                                    FechaRegistro = (DateTime)(reader["FechaRegistro"] as DateTime?)
                                });
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    lista = new List<DetalleCompra>();
                }
            }

            return lista;
        }


        public bool AgregarDetalleCompra(DetalleCompra detalleCompra)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                try
                {
                    using (SqlCommand cmd = new SqlCommand("SP_AGREGARDETALLECOMPRA", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@IdCompra", detalleCompra.IdCompra);
                        cmd.Parameters.AddWithValue("@IdProducto", detalleCompra.oProducto.IdProducto);
                        cmd.Parameters.AddWithValue("@PrecioCompra", detalleCompra.PrecioCompra);
                        cmd.Parameters.AddWithValue("@PrecioVenta", detalleCompra.PrecioVenta);
                        cmd.Parameters.AddWithValue("@Cantidad", detalleCompra.Cantidad);
                        cmd.Parameters.AddWithValue("@MontoTotal", detalleCompra.MontoTotal);
                        cmd.Parameters.AddWithValue("@FechaRegistro", detalleCompra.FechaRegistro);

                        con.Open();

                        int rowsAffected = cmd.ExecuteNonQuery();
                        return rowsAffected > 0;
                    }
                }
                catch (Exception ex)
                {
                    // Manejo de excepciones
                    return false;
                }
            }
        }

    }


}


