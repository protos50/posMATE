const express = require('express');
const router = express.Router();
const showStatus = require('./utils');

const modelo_json_roles = [
    { 
        "IdRol": 1, 
        "Descripcion": 
        "Administrador" 
    }
]

router.get('/roles', (req, res) => {
    console.log("GET : /roles");

    // Simulación de datos de roles
    let roles = [
        { "IdRol": 1, "Descripcion": "Administrador" },
        { "IdRol": 2, "Descripcion": "Empleado" },
        { "IdRol": 3, "Descripcion": "Encargado" }
    ]
    res.json(roles);
    showStatus(res);
})

module.exports = router;
