const express = require('express');
const router = express.Router();

const modelo_json_compra = [

]

router.get('/compras', (req, res) => {
    console.log("GET : /compras");

    // Simulación de datos de compras
    let compras = [

    ]
    res.json(compras);
    console.log("Mensaje de estado: " + res.statusMessage);
    console.log("Codigo de estado: " + res.statusCode);
})

module.exports = router;
