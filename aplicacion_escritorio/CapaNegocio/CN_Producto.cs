using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class CN_Producto
    {
        private CD_Producto ocd_producto = new CD_Producto();

        public List<Producto> ObtenerProductos()
        {
            return ocd_producto.ObtenerProductos();
        }

        public async Task<List<Producto>> ObtenerProductosAsync()
        {
            return await ocd_producto.ObtenerProductosAsync();
        }

        public bool AgregarProducto(Producto producto)
        {
            return ocd_producto.AgregarProducto(producto);
        }

        public async Task<bool> AgregarProductoAsync(Producto producto)
        {
            return await ocd_producto.AgregarProductoAsync(producto);
        }


        public bool EditarProducto(Producto producto)
        {
            return ocd_producto.EditarProducto(producto);
        }

        public async Task<bool> EditarProductoAsync(Producto producto)
        {
            return await ocd_producto.EditarProductoAsync(producto);
        }

        public Producto ObtenerProductoPorCodigoProducto(string codigoProducto)
        {
            return ocd_producto.ObtenerProductoPorCodigoProducto(codigoProducto);
        }

        public async Task<Producto> ObtenerProductoPorCodigoProductoAsync(string codigoProducto)
        {
            return await ocd_producto.ObtenerProductoPorCodigoProductoAsync(codigoProducto);
        }

        public Producto ObtenerProductoPorId(int id)
        {
            return ocd_producto.ObtenerProductoPorId(id);
        }

        public async Task<Producto> ObtenerProductoPorIdAsync(int id)
        {
            return await ocd_producto.ObtenerProductoPorIdAsync(id);
        }

        public bool ActualizarStockProducto(int productoId, int cantidad)
        {
            return ocd_producto.ActualizarStockProducto(productoId, cantidad);
        }

        public async Task<bool> ActualizarStockProductoAsync(int productoId, int cantidad)
        {
            return await ocd_producto.ActualizarStockProductoAsync(productoId, cantidad);
        }

        public bool ActualizarStockProductoVenta(int productoId, int cantidad)
        {
            return ocd_producto.ActualizarStockProductoVenta(productoId, cantidad);
        }

        public async Task<bool> ActualizarStockProductoVentaAsync(int productoId, int cantidad)
        {
            return await ocd_producto.ActualizarStockProductoVentaAsync(productoId, cantidad);
        }
        
        public List<Producto> ObtenerProductoMasVendido(int topN, DateTime FechaDesde, DateTime FechaHasta)
        {
            return ocd_producto.ObtenerProductosMasVendidos(topN, FechaDesde, FechaHasta);
        }

        public async Task<List<Producto>> ObtenerProductosMasVendidosAsync(int topN, DateTime fechaDesde, DateTime fechaHasta)
        {
            return await ocd_producto.ObtenerProductosMasVendidosAsync(topN, fechaDesde, fechaHasta);
        }


    }
}
