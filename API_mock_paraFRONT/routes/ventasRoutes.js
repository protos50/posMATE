const express = require('express');
const router = express.Router();
const { showStatus } = require('./utils');

const modelo_json_venta = [
    {
        "IdVenta": 1,
        "oUsuario":
        {
            "IdUsuario": 1,
            "Nombre": "Usuario1"
        },
        "oCliente":
        {
            "Nombre": "Cliente1"
        },
        "MontoPago": 100.50,
        "MontoCambio": 10.00,
        "MontoTotal": 90.50,
        "FechaRegistro": "2023-11-14T16:17:16.607"
    }
];

/*
USE [DB_posnet]
GO

SELECT 
	v.IdVenta,
    JSON_QUERY(
		(
			SELECT u.IdUsuario, u.Nombre
			FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
		)
	) AS oUsuario,
	JSON_QUERY(
		(
			SELECT c.Nombre
			FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
		)
	) AS oCliente,
			v.MontoPago,
			v.MontoCambio,
			v.MontoTotal,
			v.FechaRegistro
	FROM 
		Venta v
	INNER JOIN 
		[dbo].[USUARIO] u ON v.IdUsuario = u.IdUsuario
	INNER JOIN 
		[dbo].[Cliente] c ON c.IdCliente = v.IdCliente
	FOR JSON PATH;

GO
*/

// Simulación de datos de ventas
let ventas = [
    {
        "IdVenta": 1,
        "oUsuario":
        {
            "IdUsuario": 5,
            "Nombre": "EmpleadoCamila"
        },
        "oCliente":
        {
            "Nombre": "Gonzalo"
        },
        "MontoPago": 120.00,
        "MontoCambio": 10.04,
        "MontoTotal": 109.96,
        "FechaRegistro": "2023-11-14T16:50:12.933"
    },
    {
        "IdVenta": 2,
        "oUsuario":
        {
            "IdUsuario": 5,
            "Nombre": "EmpleadoCamila"
        },
        "oCliente":
        {
            "Nombre": "Gonzalo"
        },
        "MontoPago": 400.00,
        "MontoCambio": 150.03,
        "MontoTotal": 249.97,
        "FechaRegistro": "2023-11-14T16:50:12.933"
    },
    {
        "IdVenta": 3,
        "oUsuario":
        {
            "IdUsuario": 5,
            "Nombre": "EmpleadoCamila"
        },
        "oCliente":
        {
            "Nombre": "Gonzalo"
        },
        "MontoPago": 1300.00,
        "MontoCambio": 450.16,
        "MontoTotal": 849.84,
        "FechaRegistro": "2023-11-14T16:50:12.933"
    },
    {
        "IdVenta": 4,
        "oUsuario":
        {
            "IdUsuario": 5,
            "Nombre": "EmpleadoCamila"
        },
        "oCliente":
        {
            "Nombre": "Gonzalo"
        },
        "MontoPago": 2300.00,
        "MontoCambio": 30.27,
        "MontoTotal": 2269.73,
        "FechaRegistro": "2023-11-14T16:59:19.250"
    },
    {
        "IdVenta": 5,
        "oUsuario":
        {
            "IdUsuario": 6,
            "Nombre": "EmpleadoMartin"
        },
        "oCliente":
        {
            "Nombre": "Marcos"
        },
        "MontoPago": 130.00,
        " MontoCambio": 2.01,
        "MontoTotal": 127.99,
        "FechaRegistro": "2023-11-14T22:49:55.647"
    }

];

router.get('/ventas', (req, res) => {
    const idUsuario = parseInt(req.query.idusuario);
    console.log("GET : /ventas?idUsuario=" + idUsuario);

    // Si el IdUsuario es un número
    if (!isNaN(idUsuario)) {
        ventas = ventas.filter(venta => venta.oUsuario.IdUsuario === idUsuario);
    }

    // Eliminar los IDs de cliente de las ventas
    ventas = ventas.map(venta => ({
        IdVenta: venta.IdVenta,
        oUsuario: { IdUsuario: venta.oUsuario.IdUsuario, Nombre: venta.oUsuario.Nombre },
        oCliente: { Nombre: venta.oCliente.Nombre },
        MontoPago: venta.MontoPago,
        MontoCambio: venta.MontoCambio,
        MontoTotal: venta.MontoTotal,
        FechaRegistro: venta.FechaRegistro
    }));

    res.json(ventas);
    showStatus(res);
})

// Endpoint para simular la inserción de una venta
router.post('/ventas', (req, res) => {
    console.log("POST : /ventas");
    const venta = req.body;

    console.log("Venta recibida:", venta);

    // Simular una inserción exitosa
    res.status(201).json({
        message: "Venta insertada correctamente",
        venta: venta
    });

    // Mostrar el estado de la respuesta
    showStatus(res);
});

// Endpoint para obtener el último ID de venta
router.get('/ventas/ultimoid', (req, res) => {
    console.log("GET : /ventas/ultimoid");

    // Simular la obtención del último ID de venta
    let ultimoIdVenta = ventas.length > 0 ? ventas[ventas.length - 1].IdVenta : -1;

    res.status(200).json(ultimoIdVenta);

    // Mostrar el estado de la respuesta
    showStatus(res);
});


module.exports = router;
