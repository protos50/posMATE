const express = require('express');
const router = express.Router();
const { showStatus } = require('./utils');

const modelo_json_proveedore = [
    {
        "IdProveedor": 28,
        "Nombre": "TechCorp Distribuciones",
        "Documento": "123456789",
        "Telefono": "123-456-7890",
        "Estado": true
    }
]

router.get('/proveedores', (req, res) => {
    console.log("GET : /proveedores");

    // Simulación de datos de proveedores
    let proveedores = [
        { "IdProveedor": 28, "Nombre": "TechCorp Distribuciones", "Documento": "123456789", "Telefono": "123-456-7890", "Estado": true },
        { "IdProveedor": 29, "Nombre": "ModaFashion Proveedores", "Documento": "987654321", "Telefono": "987-654-3210", "Estado": true },
        { "IdProveedor": 30, "Nombre": "Abastos Alimenticios S.A.", "Documento": "456789012", "Telefono": "456-789-0123", "Estado": true },
        { "IdProveedor": 31, "Nombre": "Casa Hogar Mía", "Documento": "321098765", "Telefono": "321-098-7654", "Estado": true },
        { "IdProveedor": 32, "Nombre": "Juguetería Sonrisas", "Documento": "678901234", "Telefono": "678-901-2345", "Estado": true },
        { "IdProveedor": 33, "Nombre": "Belleza y Estilo Pro", "Documento": "234567890", "Telefono": "234-567-8901", "Estado": true },
        { "IdProveedor": 34, "Nombre": "DeporteTotal Distribuidora", "Documento": "890123456", "Telefono": "890-123-4567", "Estado": true },
        { "IdProveedor": 35, "Nombre": "Librería Conocimiento", "Documento": "567890123", "Telefono": "567-890-1234", "Estado": true },
        { "IdProveedor": 36, "Nombre": "Mueblería Comfort", "Documento": "012345678", "Telefono": "012-345-6789", "Estado": true },
        { "IdProveedor": 37, "Nombre": "Autopartes Rápidas", "Documento": "789012345", "Telefono": "789-012-3456", "Estado": true },
        { "IdProveedor": 38, "Nombre": "Jardinería Natural", "Documento": "345678901", "Telefono": "345-678-9012", "Estado": true },
        { "IdProveedor": 39, "Nombre": "Mascotas Felices", "Documento": "901234567", "Telefono": "901-234-5678", "Estado": true },
        { "IdProveedor": 40, "Nombre": "Farmacia Bienestar", "Documento": "456123789", "Telefono": "456-123-7890", "Estado": true },
        { "IdProveedor": 41, "Nombre": "Herramientas Profesionales", "Documento": "789456123", "Telefono": "789-456-1230", "Estado": true },
        { "IdProveedor": 42, "Nombre": "OfiSuministros", "Documento": "123789456", "Telefono": "123-789-4560", "Estado": true },
        { "IdProveedor": 43, "Nombre": "Armonía Musical Instrumentos", "Documento": "987012345", "Telefono": "987-012-3450", "Estado": true },
        { "IdProveedor": 44, "Nombre": "Artículos Bebé Encantado", "Documento": "654321098", "Telefono": "654-321-0980", "Estado": true },
        { "IdProveedor": 45, "Nombre": "Arte Creativo Suministros", "Documento": "210987654", "Telefono": "210-987-6540", "Estado": true },
        { "IdProveedor": 46, "Nombre": "FotoArte Equipamiento", "Documento": "543210987", "Telefono": "543-210-9870", "Estado": true },
        { "IdProveedor": 47, "Nombre": "Software Solutions", "Documento": "876543210", "Telefono": "876-543-2100", "Estado": false }

    ]
    res.json(proveedores);
    showStatus(res);
})

module.exports = router;
