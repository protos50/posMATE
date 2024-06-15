const express = require('express');
const router = express.Router();
const showStatus = require('./utils');

// Mock data for DetalleVenta
const modelo_json_detallesVenta = [
    {
        IdDetalleVenta: 1,
        oProducto: {
            IdProducto: 1,
            Nombre: "Producto1"
        },
        PrecioVenta: 60.00,
        Cantidad: 10,
        Subtotal: 500.00,
        FechaRegistro: "2023-11-14T16:17:16.607"
    },
    {
        IdDetalleVenta: 2,
        oProducto: {
            IdProducto: 2,
            Nombre: "Producto2"
        },
        PrecioVenta: 40.00,
        Cantidad: 5,
        Subtotal: 150.00,
        FechaRegistro: "2023-11-14T16:17:16.607"
    }
];

// Endpoint to get DetalleVenta by IdVenta
router.get('/detallesventa', (req, res) => {
    const idVenta = parseInt(req.query.idVenta);
    console.log("GET : /detallesventa?idVenta=" + idVenta);

    // Mock data for DetalleCompra
    const detallesVenta = [
        {
            "IdVenta": 1,
            "DetallesVenta": [
                {
                    "IdDetalleVenta": 1,
                    "oProducto":
                    {
                        "IdProducto": 13,
                        "Nombre": "Balón de Fútbol"
                    },
                    "PrecioVenta": 29.99,
                    "Cantidad": 1,
                    "Subtotal": 29.99,
                    "FechaRegistro": "2023-11-14T16:50:12.933"
                },
                {
                    "IdDetalleVenta": 2,
                    "oProducto":
                    {
                        "IdProducto": 7,
                        "Nombre": "Set de Sartenes"
                    },
                    "PrecioVenta": 49.99,
                    "Cantidad": 1,
                    "Subtotal": 49.99,
                    "FechaRegistro": "2023-11-14T16:50:12.933"
                },
                {
                    "IdDetalleVenta": 3,
                    "oProducto":
                    {
                        "IdProducto": 6,
                        "Nombre": "Aceite de Oliva Extra Virgen"
                    },
                    "PrecioVenta": 14.99,
                    "Cantidad": 2,
                    "Subtotal": 29.98,
                    "FechaRegistro": "2023-11-14T16:50:12.933"
                }
            ]
        },
        { "IdVenta": 2, "DetallesVenta": [{ "IdDetalleVenta": 4, "oProducto": { "IdProducto": 11, "Nombre": "Kit de Maquillaje Profesional" }, "PrecioVenta": 79.99, "Cantidad": 1, "Subtotal": 79.99, "FechaRegistro": "2023-11-14T16:50:12.933" }, { "IdDetalleVenta": 5, "oProducto": { "IdProducto": 16, "Nombre": "Cuaderno de Dibujo" }, "PrecioVenta": 9.99, "Cantidad": 1, "Subtotal": 9.99, "FechaRegistro": "2023-11-14T16:50:12.933" }, { "IdDetalleVenta": 6, "oProducto": { "IdProducto": 20, "Nombre": "Llantas Todo Terreno" }, "PrecioVenta": 159.99, "Cantidad": 1, "Subtotal": 159.99, "FechaRegistro": "2023-11-14T16:50:12.933" }] }, { "IdVenta": 3, "DetallesVenta": [{ "IdDetalleVenta": 7, "oProducto": { "IdProducto": 1, "Nombre": "Smartphone XYZ" }, "PrecioVenta": 499.99, "Cantidad": 1, "Subtotal": 499.99, "FechaRegistro": "2023-11-14T16:50:12.933" }, { "IdDetalleVenta": 8, "oProducto": { "IdProducto": 8, "Nombre": "Toallas de Baño" }, "PrecioVenta": 29.99, "Cantidad": 5, "Subtotal": 149.95, "FechaRegistro": "2023-11-14T16:50:12.933" }, { "IdDetalleVenta": 9, "oProducto": { "IdProducto": 5, "Nombre": "Arroz Premium" }, "PrecioVenta": 19.99, "Cantidad": 10, "Subtotal": 199.90, "FechaRegistro": "2023-11-14T16:50:12.933" }] }, { "IdVenta": 4, "DetallesVenta": [{ "IdDetalleVenta": 10, "oProducto": { "IdProducto": 3, "Nombre": "Camisa Casual" }, "PrecioVenta": 39.99, "Cantidad": 1, "Subtotal": 39.99, "FechaRegistro": "2023-11-14T16:59:19.250" }, { "IdDetalleVenta": 11, "oProducto": { "IdProducto": 16, "Nombre": "Cuaderno de Dibujo" }, "PrecioVenta": 9.99, "Cantidad": 2, "Subtotal": 19.98, "FechaRegistro": "2023-11-14T16:59:19.250" }, { "IdDetalleVenta": 12, "oProducto": { "IdProducto": 21, "Nombre": "Habitos atomicos" }, "PrecioVenta": 80.00, "Cantidad": 1, "Subtotal": 80.00, "FechaRegistro": "2023-11-14T16:59:19.250" }, { "IdDetalleVenta": 13, "oProducto": { "IdProducto": 13, "Nombre": "Balón de Fútbol" }, "PrecioVenta": 29.99, "Cantidad": 21, "Subtotal": 629.79, "FechaRegistro": "2023-11-14T16:59:19.250" }, { "IdDetalleVenta": 14, "oProducto": { "IdProducto": 1, "Nombre": "Smartphone XYZ" }, "PrecioVenta": 499.99, "Cantidad": 3, "Subtotal": 1499.97, "FechaRegistro": "2023-11-14T16:59:19.250" }] }, { "IdVenta": 5, "DetallesVenta": [{ "IdDetalleVenta": 15, "oProducto": { "IdProducto": 22, "Nombre": "Licor" }, "PrecioVenta": 28.00, "Cantidad": 4, "Subtotal": 112.00, "FechaRegistro": "2023-11-14T22:49:55.647" }, { "IdDetalleVenta": 16, "oProducto": { "IdProducto": 10, "Nombre": "Muñeca Articulada" }, "PrecioVenta": 15.99, "Cantidad": 1, "Subtotal": 15.99, "FechaRegistro": "2023-11-14T22:49:55.647" }] }
    ];


    if (!isNaN(idVenta)) {
        // Filtrar los detalles de venta por IdVenta
        let detallesVentaFiltrados = detallesVenta.find(venta => venta.IdVenta === idVenta);

        if (detallesVentaFiltrados) {
            // Mapear los detalles de compra al formato requerido
            const respuesta = detallesVentaFiltrados.DetallesVenta.map(detalle => ({
                IdDetalleVenta: detalle.IdDetalleVenta,
                oProducto: {
                    IdProducto: detalle.oProducto.IdProducto,
                    Nombre: detalle.oProducto.Nombre
                },
                PrecioVenta: detalle.PrecioVenta,
                Cantidad: detalle.Cantidad,
                Subtotal: detalle.Subtotal,
                FechaRegistro: detalle.FechaRegistro
            }));
            res.json(respuesta);
            showStatus(res);
        } else {
            res.status(404).send('El IdCompra no fue encontrado');
            showStatus(res);
        }
    } else {
        res.status(400).send('El IdCompra es inválido');
        showStatus(res);
    }
});


module.exports = router;
