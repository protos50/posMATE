﻿using CapaDatos;
using CapaEntidad;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CapaNegocio
{
    public class CN_Categoria
    {
        private CD_Categoria ocd_categoria = new CD_Categoria();

        public List<Categoria> ObtenerCategorias()
        {
            return ocd_categoria.ObtenerCategorias();
        }

        public async Task<List<Categoria>> ObtenerCategoriasAsync()
        {
            return await ocd_categoria.ObtenerCategoriasAsync();
        }
        public bool AgregarCategoria(Categoria categoria)
        {
            return ocd_categoria.AgregarCategoria(categoria);
        }

        public async Task<(bool Success, string mensaje)> AgregarCategoriaAsync(Categoria categoria)
        {
            return await ocd_categoria.AgregarCategoriaAsync(categoria);
        }

        public bool EditarCategoria(Categoria categoria)
        {
            return ocd_categoria.EditarCategoria(categoria);
        }

        public Categoria ObtenerProductoPorId(int id)
        {
            return ocd_categoria.ObtenerCategoriaPorId(id);
        }

        public List<Categoria> ObtenerCategoriasMasVendidas(int topN, DateTime FechaDesde, DateTime FechaHasta)
        {
            return ocd_categoria.ObtenerCategoriasMasVendidas(topN, FechaDesde, FechaHasta);
        }
    }
}
