const express = require('express');
const router = express.Router();

const modelo_json_cliente = [
    { 
        "IdCliente": 1, 
        "DNI": 44543439, 
        "Nombre": "Gonzalo", 
        "Apellido": "Ramirez" 
    },
]

router.get('/clientes', (req, res) => {
    console.log("GET : /clientes");

    // Simulación de datos de clientes
    let clientes = [
        { "IdCliente": 1, "DNI": 44543439, "Nombre": "Gonzalo", "Apellido": "Ramirez" },
        { "IdCliente": 4, "DNI": 20123587, "Nombre": "Juan", "Apellido": "Alvarez" },
        { "IdCliente": 7, "DNI": 31258741, "Nombre": "Mario", "Apellido": "Kempes" },
        { "IdCliente": 18, "DNI": 30123981, "Nombre": "Marcos", "Apellido": "Ruben" }
    ]
    res.json(clientes);
    console.log("Mensaje de estado: " + res.statusMessage);
    console.log("Codigo de estado: " + res.statusCode);
})

module.exports = router;
