const express = require('express');
const router = express.Router();
const {showStatus} = require('./utils.js');

// ATENCION: ESTE ES EL MODELO DE DATOS DE PRUEBA
// En compras su almacenamiento almacenado puede mandarse opcionalmente el idusuario como parametro
// para traer solo las compras de dicho user, sino es mandado idusuario se manda todas las compras. 
const modelo_json_compra = [
    {
        IdCompra: 1,
        oUsuario:
        {
            Nombre: "Usuario1"
        },
        oProveedor:
        {
            Nombre: "Proveedor1"

        },
        MontoTotal: 100.50,
        FechaRegistro: "2023-11-14T16:17:16.607"
    },
    {
        IdCompra: 2,
        oUsuario:
        {
            Nombre: "Usuario2"
        },
        oProveedor:
        {
            Nombre: "Proveedor2"
        },
        MontoTotal: 200.75,
        FechaRegistro: "2023-11-15T16:17:16.607"
    }
];


router.get('/compras', (req, res) => {
    const idUsuario = parseInt(req.query.idusuario); // Obtener el idusuario desde la URL
    console.log("GET : /compras?idusuario=" + idUsuario) 

    let compras = [
        {
            "IdCompra": 1,
            "oUsuario":
            {
                "IdUsuario": 3,
                "Nombre": "EncargadoLuis"
            },
            "oProveedor":
            {
                "IdProveedor": 35,
                "Nombre": "Librería Conocimiento"
            },
            "MontoTotal": 980.00,
            "FechaRegistro": "2023-11-14T16:32:02.383"
        },
        { "IdCompra": 2, "oUsuario": { "IdUsuario": 3, "Nombre": "EncargadoLuis" }, "oProveedor": { "IdProveedor": 31, "Nombre": "Casa Hogar Mía" }, "MontoTotal": 770.00, "FechaRegistro": "2023-11-14T16:38:33.820" },
        { "IdCompra": 3, "oUsuario": { "IdUsuario": 4, "Nombre": "EncargadoPedro" }, "oProveedor": { "IdProveedor": 32, "Nombre": "Juguetería Sonrisas" }, "MontoTotal": 300.00, "FechaRegistro": "2023-11-14T16:47:02.627" },
        { "IdCompra": 5, "oUsuario": { "IdUsuario": 3, "Nombre": "EncargadoLuis" }, "oProveedor": { "IdProveedor": 47, "Nombre": "Software Solutions" }, "MontoTotal": 160.00, "FechaRegistro": "2023-11-14T22:28:23.713" }
    ];

    // Si el IdUsuario es un numero
    if (!isNaN(idUsuario)) {  
        compras = compras.filter(compra => compra.oUsuario.IdUsuario === idUsuario); // Filtrar las compras segun el IdUsuario se se proporciona
    }

    // Eliminar los IDs de usuario y proveedor del resultado
    compras = compras.map(compra => ({
        IdCompra: compra.IdCompra,
        oUsuario: { Nombre: compra.oUsuario.Nombre },
        oProveedor: { Nombre: compra.oProveedor.Nombre },
        MontoTotal: compra.MontoTotal,
        FechaRegistro: compra.FechaRegistro
    }));

    //  Filtrar las compras segun el IdUsuario se se proporciona
    res.json(compras);
    showStatus(res);
})

module.exports = router;
