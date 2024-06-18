using System;
using System.Collections.Generic;
using CapaDatos;
using CapaEntidad;
using System.Threading.Tasks;

namespace CapaNegocios
{
    public class CN_DetalleCompra
    {
        private CD_DetalleCompra datosDetalleCompra;

        public CN_DetalleCompra()
        {
            datosDetalleCompra = new CD_DetalleCompra();
        }

        public List<DetalleCompra> ObtenerDetallesCompra(int idCompra)
        {      
                return datosDetalleCompra.ObtenerDetallesCompra(idCompra);
        }

        public async Task<List<DetalleCompra>> ObtenerDetallesCompraAsync(int idCompra)
        {
                return await datosDetalleCompra.ObtenerDetallesCompraAsync(idCompra);
        }	

        public bool AgregarDetalleCompra(DetalleCompra detalleCompra)
        {      
                return datosDetalleCompra.AgregarDetalleCompra(detalleCompra);                    
        }

        public async Task<bool> AgregarDetalleCompraAsync(DetalleCompra detalleCompra)
        {
                return await datosDetalleCompra.AgregarDetalleCompraAsync(detalleCompra);
        }
    }
}
