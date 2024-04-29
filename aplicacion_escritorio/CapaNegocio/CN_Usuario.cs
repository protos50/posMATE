using CapaDatos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaEntidad;

namespace CapaNegocio
{
    public class CN_Usuario
    {
        private CD_Usuario ocd_usuario = new CD_Usuario();
        
        public List<Usuario> Listar()
        {
            return ocd_usuario.Listar();
        }

        public async Task<List<Usuario>> ListarAsync()
        {
            return await ocd_usuario.ListarAsync();
        }

        public async Task<Usuario> LoginAsync(string DNI, string Clave)
        {
            return await ocd_usuario.LoginAsync(DNI, Clave);
        }

        public async Task<(int IdUsuario, string Mensaje)> RegistrarAsync(Usuario obj)
        {
            // Aquí llamas al método RegistrarAsync de la capa de datos
            return await ocd_usuario.RegistrarAsync(obj);
        }

        public async Task<(bool Respuesta, string Mensaje)> EditarUsuarioAsync(Usuario obj)
        {
            // Aquí llamas al método RegistrarAsync de la capa de datos
            return await ocd_usuario.EditarUsuarioAsync(obj);
        }

        public async Task<Usuario> ObtenerUsuarioPorNombreAsync(string nombre)
        {
            return await ocd_usuario.ObtenerUsuarioPorNombreAsync(nombre);
        }
        public int Registrar(Usuario obj, out string Mensaje)
        {
            return ocd_usuario.Registrar(obj, out Mensaje);
        }


        public bool Editar(Usuario obj, out string Mensaje)
        {
                return ocd_usuario.Editar(obj, out Mensaje);
        }

        public Usuario ObtenerUsuarioPorNombre(string nombre)
        {
            return ocd_usuario.ObtenerUsuarioPorNombre(nombre);
        }

    }
}
    

