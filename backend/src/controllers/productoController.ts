import { Request, Response } from "express";

import {
  SP_ACTUALIZARSTOCKPRODUCTO,
  SP_ACTUALIZARSTOCKPRODUCTOVENTA,
  SP_AGREGARPRODUCTO,
  SP_EDITARPRODUCTO,
  SP_OBTENERPRODUCTOPORCODIGOPRODUCTO,
  SP_OBTENERPRODUCTOPORID,
  SP_OBTENERPRODUCTOS,
  SP_OBTENERPRODUCTOSMASVENDIDOS,
} from "../procedures";

export const listarProductos = async (req: Request, res: Response) => {
  try {
    const result = await SP_OBTENERPRODUCTOS();

    if (result.recordset.length > 0) {
      res.json(
        result.recordset.map((producto: any) => {
          return {
            IdProducto: producto.IdProducto,
            oCategoria: {
              IdCategoria: producto.IdCategoria,
              Descripcion: producto.CategoriaDescripcion,
            },
            Nombre: producto.Nombre,
            Descripcion: producto.Descripcion,
            Stock: producto.Stock,
            PrecioCompra: producto.PrecioCompra,
            PrecioVenta: producto.PrecioVenta,
            Estado: producto.Estado,
            FechaRegistro: producto.FechaRegistro,
            codigoProducto: producto.codigoProducto,
          };
        })
      );
    } else {
      res.status(401).json({ message: "Producto no encontrado" });
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message || "Error desconocido" });
  }
};

export const obtenerProductoPorId = async (req: Request, res: Response) => {
  try {
    if (!req.params.id)
      return res.status(400).json({ message: "id es requerido" });

    const result = await SP_OBTENERPRODUCTOPORID({
      Id: parseInt(req?.params?.id.toString()),
    });

    if (result.recordset.length > 0) {
      res.json(
        result.recordset.map((producto: any) => {
          return {
            IdProducto: producto.IdProducto,
            oCategoria: {
              IdCategoria: producto.IdCategoria,
              Descripcion: producto.CategoriaDescripcion,
            },
            Nombre: producto.Nombre,
            Descripcion: producto.Descripcion,
            Stock: producto.Stock,
            PrecioCompra: producto.PrecioCompra,
            PrecioVenta: producto.PrecioVenta,
            Estado: producto.Estado,
            FechaRegistro: producto.FechaRegistro,
            codigoProducto: producto.codigoProducto,
          };
        })[0]
      );
    } else {
      res.status(401).json({ message: "Producto no encontrado" });
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message || "Error desconocido" });
  }
};

export const obtenerProductoPorCodigo = async (req: Request, res: Response) => {
  try {
    if (!req.params.codigoProducto)
      return res.status(400).json({ message: "codigoProducto es requerido" });

    const result = await SP_OBTENERPRODUCTOPORCODIGOPRODUCTO({
      CodigoProducto: req?.params?.codigoProducto.toString(),
    });

    if (result.recordset.length > 0) {
      res.json(
        result.recordset.map((producto: any) => {
          return {
            IdProducto: producto.IdProducto,
            oCategoria: {
              IdCategoria: producto.IdCategoria,
              Descripcion: producto.CategoriaDescripcion,
            },
            Nombre: producto.Nombre,
            Descripcion: producto.Descripcion,
            Stock: producto.Stock,
            PrecioCompra: producto.PrecioCompra,
            PrecioVenta: producto.PrecioVenta,
            Estado: producto.Estado,
            FechaRegistro: producto.FechaRegistro,
            codigoProducto: producto.codigoProducto,
          };
        })[0]
      );
    } else {
      res.status(401).json({ message: "Producto no encontrado" });
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message || "Error desconocido" });
  }
};

export const insertarProducto = async (req: Request, res: Response) => {
  try {
    const result = await SP_AGREGARPRODUCTO({
      IdCategoria: req?.body?.oCategoria?.IdCategoria,
      Nombre: req?.body?.Nombre,
      Descripcion: req?.body?.Descripcion,
      Stock: req?.body?.Stock,
      PrecioCompra: req?.body?.PrecioCompra,
      PrecioVenta: req?.body?.PrecioVenta,
      Estado: req?.body?.Estado,
      FechaRegistro: req?.body?.FechaRegistro,
      codigoProducto: req?.body?.codigoProducto,
    });
    console.log("INSERCION", result);

    if (result.rowsAffected[0] == 1) {
      res.status(201).json({
        message: "Producto insertado correctamente",
        producto: {},
      });
    } else {
      res.status(401).json({ message: "No se pudo agregar el producto" });
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message || "Error desconocido" });
  }
};

export const editarProducto = async (req: Request, res: Response) => {
  try {
    const result = await SP_EDITARPRODUCTO({
      IdProducto: parseInt(req?.params?.id),
      IdCategoria: req?.body?.oCategoria?.IdCategoria,
      Nombre: req?.body?.Nombre,
      Descripcion: req?.body?.Descripcion,
      Stock: req?.body?.Stock,
      PrecioCompra: req?.body?.PrecioCompra,
      PrecioVenta: req?.body?.PrecioVenta,
      Estado: req?.body?.Estado,
      FechaRegistro: req?.body?.FechaRegistro,
      codigoProducto: req?.body?.codigoProducto,
    });
    console.log("EDICION", result);

    if (result.rowsAffected[0] == 1) {
      res.status(200).json({
        message: "Producto editado correctamente",
        producto: {},
      });
    } else {
      res.status(401).json({ message: "Error al editar producto" });
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message || "Error desconocido" });
  }
};

export const actualizarStock = async (req: Request, res: Response) => {
  try {
    const result = await SP_ACTUALIZARSTOCKPRODUCTO({
      ProductoId: parseInt(req?.params?.id),
      Cantidad: req?.body?.cantidad,
    });
    console.log("ActualizarStock", result);

    if (result.rowsAffected[0] == 1) {
      res.status(200).json({
        message: "Stock actualizado correctamente",
        producto: {},
      });
    } else {
      res.status(401).json({ message: "Error al actualizar stock" });
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message || "Error desconocido" });
  }
};

export const actualizarStockVenta = async (req: Request, res: Response) => {
  try {
    const result = await SP_ACTUALIZARSTOCKPRODUCTOVENTA({
      ProductoId: parseInt(req?.params?.id),
      Cantidad: req?.body?.cantidad,
    });
    console.log("ActualizarStock", result);

    if (result.rowsAffected[0] == 1) {
      res.status(200).json({
        message: "Stock de venta actualizado correctamente",
        producto: {},
      });
    } else {
      res.status(401).json({ message: "Error al actualizar stock de venta" });
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message || "Error desconocido" });
  }
};

export const masVendidos = async (req: Request, res: Response) => {
  try {
    if (!req?.query?.topN)
      return res.status(400).json({ message: "topN es requerido" });
    if (!req?.query?.fechaDesde)
      return res.status(400).json({ message: "fechaDesde es requerido" });
    if (!req?.query?.fechaHasta)
      return res.status(400).json({ message: "fechaHasta es requerido" });

    
    const result = await SP_OBTENERPRODUCTOSMASVENDIDOS({
      TopN: parseInt(req?.query?.topN?.toString()),
      FechaDesde: new Date(req?.query?.fechaDesde.toString()),
      FechaHasta: new Date(req?.query?.fechaHasta.toString()),
    });

    if (result.recordset.length > 0) {
      res.json(
        result.recordset.map((producto: any) => {
          return {
            IdProducto: producto.IdProducto,
            oCategoria: {
              IdCategoria: producto.IdCategoria,
              Descripcion: producto.CategoriaDescripcion,
            },
            Nombre: producto.Nombre,
            Descripcion: producto.Descripcion,
            Stock: producto.Stock,
            PrecioCompra: producto.PrecioCompra,
            PrecioVenta: producto.PrecioVenta,
            Estado: producto.Estado,
            FechaRegistro: producto.FechaRegistro,
            codigoProducto: producto.codigoProducto,
            TotalVendido: producto.TotalVendido || producto.IdProducto || 0,
          };
        })
      );
    } else {
      res.status(401).json({ message: "Usuario no encontrado" });
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message || "Error desconocido" });
  }
};


/*export const masVendidos = async (req: Request, res: Response) => {
  try {
    if (!req?.query?.topN)
      return res.status(400).json({ message: "topN es requerido" });
    if (!req?.query?.fechaDesde)
      return res.status(400).json({ message: "fechaDesde es requerido" });
    if (!req?.query?.fechaHasta)
      return res.status(400).json({ message: "fechaHasta es requerido" });

    var request = new sql.Request(database);

    request.input("TopN", sql.Int(), parseInt(req?.query?.topN?.toString()));
    request.input(
      "FechaDesde",
      sql.Date(),
      new Date(req?.query?.fechaDesde.toString())
    );
    request.input(
      "FechaHasta",
      sql.Date(),
      new Date(req?.query?.fechaHasta.toString())
    );
 
    const result = await request.query(
      "SELECT TOP (@TopN) p.IdProducto, SUM(dv.Cantidad) AS TotalVendido " +
        "FROM PRODUCTO p " +
        "INNER JOIN DETALLE_VENTA dv ON p.IdProducto = dv.IdProducto " +
        "WHERE dv.FechaRegistro BETWEEN @FechaDesde AND @FechaHasta " +
        "GROUP BY p.IdProducto " +
        "ORDER BY TotalVendido DESC"
    );

    if (result.recordset.length > 0) {
      res.json(result.recordset);
    } else {
      res.status(401).json({ message: "Usuario no encontrado" });
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message || "Error desconocido" });
  }
};
*/