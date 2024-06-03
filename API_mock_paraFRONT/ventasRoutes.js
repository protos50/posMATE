const express = require('express');
const router = express.Router();

const modelo_json_venta = [

]

router.get('/ventas', (req, res) => {
    console.log("GET : /ventas");

    // Simulación de datos de ventas
    let ventas = [

    ]
    res.json(ventas);
    console.log("Mensaje de estado: " + res.statusMessage);
    console.log("Codigo de estado: " + res.statusCode);
})

module.exports = router;
