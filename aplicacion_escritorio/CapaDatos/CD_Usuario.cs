using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using CapaEntidad;

namespace CapaDatos
{
    public class CD_Usuario
    {
        // Método para listar usuarios desde la base de datos
        public List<Usuario> Listar()
        {
            List<Usuario> lista = new List<Usuario>();

            // bloque 'using' para asegurarse de que se cierre la conexión correctamente
            using (SqlConnection con = new SqlConnection(Conexion.cadena))
            {
                try
                {
                    con.Open(); // Abre la conexión 

                    // Nombre del procedimiento almacenado
                    string storedProcedure = "SP_LISTARUSUARIOS";

                    using (SqlCommand cmd = new SqlCommand(storedProcedure, con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                // Agrega objetos de Usuario a la lista, leyendo datos desde el SqlDataReader
                                lista.Add(new Usuario()
                                {
                                    IdUsuario = Convert.ToInt32(reader["IdUsuario"]),
                                    DNI = reader["DNI"].ToString(),
                                    Nombre = reader["Nombre"].ToString(),
                                    Apellido = reader["Apellido"].ToString(),
                                    Email = reader["Email"].ToString(),
                                    Clave = reader["Clave"].ToString(),
                                    Direccion = reader["Direccion"].ToString(),
                                    FechaNacimiento = (DateTime)(reader["FechaNacimiento"] as DateTime?),
                                    Telefono = reader["Telefono"].ToString(),
                                    Estado = Convert.ToBoolean(reader["Estado"]),
                                    oRol = new Rol()
                                    {
                                        IdRol = Convert.ToInt32(reader["IdRol"]),
                                        Descripcion = reader["Descripcion"].ToString()
                                    }
                                });
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    // Manejo de excepciones
                    throw ex;
                }
            }

            return lista;
        }


        // Método para registrar un usuario en la base de datos
        public int Registrar(Usuario obj, out string Mensaje)
        {
            int idUsuarioGenerado = 0;
            Mensaje = string.Empty;

            try
            {
                using (SqlConnection con = new SqlConnection(Conexion.cadena))
                {
                    // Creación de un comando SQL para ejecutar un procedimiento almacenado
                    SqlCommand cmd = new SqlCommand("SP_REGISTRARUSUARIO", con);
                    cmd.Parameters.AddWithValue("Nombre", obj.Nombre);
                    cmd.Parameters.AddWithValue("Apellido", obj.Apellido);
                    cmd.Parameters.AddWithValue("Clave", obj.Clave);
                    cmd.Parameters.AddWithValue("Email", obj.Email);
                    cmd.Parameters.AddWithValue("DNI", obj.DNI);
                    cmd.Parameters.AddWithValue("Direccion", obj.Direccion);
                    cmd.Parameters.AddWithValue("FechaNacimiento", obj.FechaNacimiento);
                    cmd.Parameters.AddWithValue("Telefono", obj.Telefono);
                    cmd.Parameters.AddWithValue("IdRol", obj.oRol.IdRol);
                    cmd.Parameters.AddWithValue("@Estado", obj.@Estado);
                    cmd.Parameters.Add("IdUsuarioResultado", SqlDbType.Int).Direction = ParameterDirection.Output;
                    cmd.Parameters.Add("Mensaje", SqlDbType.VarChar, 500).Direction = ParameterDirection.Output;

                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();

                    // Ejecutar el procedimiento almacenado
                    cmd.ExecuteNonQuery();

                    idUsuarioGenerado = Convert.ToInt32(cmd.Parameters["IdUsuarioResultado"].Value);
                    Mensaje = cmd.Parameters["Mensaje"].Value.ToString();
                }
            }
            catch (Exception ex)
            {
                idUsuarioGenerado = 0;
                Mensaje = ex.Message;
            }

            return idUsuarioGenerado;
        }

        // Método para editar un usuario en la base de datos
        public bool Editar(Usuario obj, out string Mensaje)
        {
            bool respuesta = false;
            Mensaje = string.Empty;

            try
            {
                using (SqlConnection con = new SqlConnection(Conexion.cadena))
                {
                    // Creación de un comando SQL para ejecutar un procedimiento almacenado 
                    SqlCommand cmd = new SqlCommand("SP_EDITARUSUARIO", con);
                    cmd.Parameters.AddWithValue("IdUsuario", obj.IdUsuario);
                    cmd.Parameters.AddWithValue("Nombre", obj.Nombre);
                    cmd.Parameters.AddWithValue("Apellido", obj.Apellido);
                    cmd.Parameters.AddWithValue("Clave", obj.Clave);
                    cmd.Parameters.AddWithValue("Email", obj.Email);
                    cmd.Parameters.AddWithValue("DNI", obj.DNI);
                    cmd.Parameters.AddWithValue("Direccion", obj.Direccion);
                    cmd.Parameters.AddWithValue("FechaNacimiento", obj.FechaNacimiento);
                    cmd.Parameters.AddWithValue("Telefono", obj.Telefono);
                    cmd.Parameters.AddWithValue("IdRol", obj.oRol.IdRol);
                    cmd.Parameters.AddWithValue("@Estado", obj.@Estado);
                    cmd.Parameters.Add("Respuesta", SqlDbType.Int).Direction = ParameterDirection.Output;
                    cmd.Parameters.Add("Mensaje", SqlDbType.VarChar, 500).Direction = ParameterDirection.Output;

                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();

                    // Ejecutar el procedimiento almacenado de edición
                    cmd.ExecuteNonQuery();

                    respuesta = Convert.ToBoolean(cmd.Parameters["Respuesta"].Value);
                    Mensaje = cmd.Parameters["Mensaje"].Value.ToString();
                }
            }
            catch (Exception ex)
            {
                respuesta = false;
                Mensaje = ex.Message;
            }

            return respuesta;
        }

        public Usuario ObtenerUsuarioPorNombre(string nombre)
        {
            Usuario usuario = null;

            using (SqlConnection con = new SqlConnection(Conexion.cadena))
            {
                try
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand("SP_OBTENERUSUARIOPORNOMBRE", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Nombre", nombre);

                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                usuario = new Usuario()
                                {
                                    IdUsuario = Convert.ToInt32(reader["IdUsuario"])
                                };
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }

            return usuario;
        }

    }
}
