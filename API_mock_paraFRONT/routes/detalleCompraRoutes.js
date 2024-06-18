const express = require('express');
const router = express.Router();
const { showStatus } = require('./utils');


// Mock data for DetalleCompra
const modelo_json_detallesCompra = [
    {
        IdDetalleCompra: 1,
        oProducto: {
            IdProducto: 1,
            Nombre: "Producto1"
        },
        PrecioCompra: 50.00,
        PrecioVenta: 60.00,
        Cantidad: 10,
        MontoTotal: 500.00,
        FechaRegistro: "2023-11-14T16:17:16.607"
    },
    {
        IdDetalleCompra: 2,
        oProducto: {
            IdProducto: 2,
            Nombre: "Producto2"
        },
        PrecioCompra: 30.00,
        PrecioVenta: 40.00,
        Cantidad: 5,
        MontoTotal: 150.00,
        FechaRegistro: "2023-11-14T16:17:16.607"
    }
];

// Endpoint to get DetalleCompra by IdCompra
router.get('/detallescompra', (req, res) => {
    const idCompra = parseInt(req.query.idCompra);

    console.log("GET : /detallescompra?idCompra=" + idCompra);

    let detallesCompra = [
        {
            "IdCompra": 1,
            "DetallesCompra": [
                {
                    "IdDetalleCompra": 1,
                    "oProducto":
                    {
                        "IdProducto": 5,
                        "Nombre": "Arroz Premium"
                    },
                    "PrecioCompra": 13.00,
                    "PrecioVenta": 19.99,
                    "Cantidad": 20,
                    "MontoTotal": 260.00,
                    "FechaRegistro": "2023-11-14T16:32:02.383"
                },
                {
                    "IdDetalleCompra": 2,
                    "oProducto":
                    {
                        "IdProducto": 6,
                        "Nombre": "Aceite de Oliva Extra Virgen"
                    },
                    "PrecioCompra": 10.00,
                    "PrecioVenta": 14.99,
                    "Cantidad": 10,
                    "MontoTotal": 100.00,
                    "FechaRegistro": "2023-11-14T16:32:02.383"
                },
                {
                    "IdDetalleCompra": 3,
                    "oProducto":
                    {
                        "IdProducto": 21,
                        "Nombre": "Habitos atomicos"
                    },
                    "PrecioCompra": 20.00,
                    "PrecioVenta": 80.00,
                    "Cantidad": 31,
                    "MontoTotal": 620.00,
                    "FechaRegistro": "2023-11-14T16:32:02.383"
                }
            ]
        },
        { "IdCompra": 2, "DetallesCompra": [{ "IdDetalleCompra": 4, "oProducto": { "IdProducto": 8, "Nombre": "Toallas de Baño" }, "PrecioCompra": 11.00, "PrecioVenta": 29.99, "Cantidad": 14, "MontoTotal": 154.00, "FechaRegistro": "2023-11-14T16:38:33.820" }, { "IdDetalleCompra": 5, "oProducto": { "IdProducto": 22, "Nombre": "Licor" }, "PrecioCompra": 14.00, "PrecioVenta": 28.00, "Cantidad": 44, "MontoTotal": 616.00, "FechaRegistro": "2023-11-14T16:38:33.820" }] },
        { "IdCompra": 3, "DetallesCompra": [{ "IdDetalleCompra": 6, "oProducto": { "IdProducto": 9, "Nombre": "Juego de Construcción" }, "PrecioCompra": 60.00, "PrecioVenta": 24.99, "Cantidad": 5, "MontoTotal": 300.00, "FechaRegistro": "2023-11-14T16:47:02.627" }] },
        { "IdCompra": 5, "DetallesCompra": [{ "IdDetalleCompra": 7, "oProducto": { "IdProducto": 1, "Nombre": "Smartphone XYZ" }, "PrecioCompra": 80.00, "PrecioVenta": 499.99, "Cantidad": 2, "MontoTotal": 160.00, "FechaRegistro": "2023-11-14T22:28:23.713" }] }
    ];

    if (!isNaN(idCompra)) {
        // Filtrar los detalles de compra por IdCompra
        const detallesCompraFiltrados = detallesCompra.find(compra => compra.IdCompra === idCompra);

        if (detallesCompraFiltrados) {
            // Mapear los detalles de compra al formato requerido
            const respuesta = detallesCompraFiltrados.DetallesCompra.map(detalle => ({
                IdDetalleCompra: detalle.IdDetalleCompra,
                oProducto: {
                    IdProducto: detalle.oProducto.IdProducto,
                    Nombre: detalle.oProducto.Nombre
                },
                PrecioCompra: detalle.PrecioCompra,
                PrecioVenta: detalle.PrecioVenta,
                Cantidad: detalle.Cantidad,
                MontoTotal: detalle.MontoTotal,
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



// Endpoint para agregar un detalle de compra
router.post('/detallecompra', (req, res) => {
    // Lista de detalles de compra (simulación)
    let detallesCompra = [];

    console.log("POST : /detallecompra");
    const detalleCompra = req.body;

    console.log("DetalleCompra recibido:", detalleCompra);

    // Simular la inserción de un detalle de compra
    detallesCompra.push(detalleCompra);

    res.status(201).json({
        message: "Detalle de compra insertado correctamente",
        detalleCompra: detalleCompra
    });

    // Mostrar el estado de la respuesta
    showStatus(res);
});


module.exports = router;
