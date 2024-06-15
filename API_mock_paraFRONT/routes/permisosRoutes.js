const express = require('express');
const router = express.Router();
const showStatus = require('./utils');

//ejemplo del retorno de permisos cuando IdUsuario = '2'
const modelo_json_permiso = [
    {
        "oRol": {
            "IdRol": 1
        },
        "NombreMenu": "btnUsuario"
    },
    {
        "oRol": {
            "IdRol": 1
        },
        "NombreMenu": "btnBackup"
    },
    {
        "oRol": {
            "IdRol": 1
        },
        "NombreMenu": "btnReportes"
    },
    {
        "oRol": {
            "IdRol": 1
        },
        "NombreMenu": "btnCerrarSesion"
    }

]
// Definición de los datos mock
const rolesMenus = {
    1: [
        { oRol: { IdRol: 1 }, NombreMenu: "btnUsuario" },
        { oRol: { IdRol: 1 }, NombreMenu: "btnBackup" },
        { oRol: { IdRol: 1 }, NombreMenu: "btnReportes" },
        { oRol: { IdRol: 1 }, NombreMenu: "btnCerrarSesion" }
    ],
    4: [
        { oRol: { IdRol: 3 }, NombreMenu: "btnProductos" },
        { oRol: { IdRol: 3 }, NombreMenu: "btnCompras" },
        { oRol: { IdRol: 3 }, NombreMenu: "btnProveedores" },
        { oRol: { IdRol: 3 }, NombreMenu: "btnCategorias" },
        { oRol: { IdRol: 3 }, NombreMenu: "btnCerrarSesion" },
        { oRol: { IdRol: 3 }, NombreMenu: "btnReportes" }
    ],
    5: [
        { oRol: { IdRol: 2 }, NombreMenu: "btnUsuario" },
        { oRol: { IdRol: 2 }, NombreMenu: "btnBackup" },
        { oRol: { IdRol: 2 }, NombreMenu: "btnReportes" },
        { oRol: { IdRol: 2 }, NombreMenu: "btnCerrarSesion" }
    ]
};

// Ruta GET para obtener los permisos
router.get('/permisos', (req, res) => {
    const { idusuario } = req.query;
    console.log("GET : /permisos?idusuario=" + idusuario) 

    const permisos = rolesMenus[idusuario];

    if (permisos) {
        res.json(permisos);
        showStatus(res);
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
        showStatus(res);
    }
});

module.exports = router;