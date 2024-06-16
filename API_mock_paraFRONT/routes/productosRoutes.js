const express = require('express');
const router = express.Router();
const { showStatus } = require('./utils');

// Middleware para parsear el body de las solicitudes como JSON
router.use(express.json());


const modelo_json_producto = [
    {
        "IdProducto": 1,
        "oCategoria": {
            "IdCategoria": 1,
            "Descripcion": "Electrónicos"
        },
        "Nombre": "Smartphone XYZ",
        "Descripcion": "Teléfono inteligente de última generación",
        "Stock": 50,
        "PrecioCompra": 80.00,
        "PrecioVenta": 499.99,
        "Estado": true,
        "FechaRegistro": "2023-11-14T16:17:16.607",
        "codigoProducto": "P001"
    }
]

router.get('/productos', (req, res) => {
    console.log("GET : /productos");

    // Simular un retraso de 5 segundos (5000 milisegundos)
    setTimeout(() => {
        // Simulación de datos de productos
        let productos = [{ "IdProducto": 1, "oCategoria": { "IdCategoria": 1, "Descripcion": "Electrónicos" }, "Nombre": "Smartphone XYZ", "Descripcion": "Teléfono inteligente de última generación", "Stock": 50, "PrecioCompra": 80.00, "PrecioVenta": 499.99, "Estado": true, "FechaRegistro": "2023-11-14T16:17:16.607", "codigoProducto": "P001" }, { "IdProducto": 2, "oCategoria": { "IdCategoria": 1, "Descripcion": "Electrónicos" }, "Nombre": "Laptop Pro", "Descripcion": "Laptop potente para trabajo y entretenimiento", "Stock": 30, "PrecioCompra": 800.00, "PrecioVenta": 1299.99, "Estado": true, "FechaRegistro": "2023-11-14T16:17:16.607", "codigoProducto": "P002" }, { "IdProducto": 3, "oCategoria": { "IdCategoria": 2, "Descripcion": "Ropa" }, "Nombre": "Camisa Casual", "Descripcion": "Camisa de algodón para ocasiones informales", "Stock": 99, "PrecioCompra": 20.00, "PrecioVenta": 39.99, "Estado": true, "FechaRegistro": "2023-11-14T16:17:16.607", "codigoProducto": "P003" }, { "IdProducto": 4, "oCategoria": { "IdCategoria": 2, "Descripcion": "Ropa" }, "Nombre": "Vestido Elegante", "Descripcion": "Vestido de noche para eventos especiales", "Stock": 50, "PrecioCompra": 50.00, "PrecioVenta": 99.99, "Estado": true, "FechaRegistro": "2023-11-14T16:17:16.607", "codigoProducto": "P004" }, { "IdProducto": 5, "oCategoria": { "IdCategoria": 3, "Descripcion": "Alimentos" }, "Nombre": "Arroz Premium", "Descripcion": "Arroz de calidad premium, 5 kg", "Stock": 230, "PrecioCompra": 13.00, "PrecioVenta": 19.99, "Estado": true, "FechaRegistro": "2023-11-14T16:17:16.607", "codigoProducto": "P005" }, { "IdProducto": 6, "oCategoria": { "IdCategoria": 3, "Descripcion": "Alimentos" }, "Nombre": "Aceite de Oliva Extra Virgen", "Descripcion": "Botella de aceite de oliva de alta calidad", "Stock": 91, "PrecioCompra": 10.00, "PrecioVenta": 14.99, "Estado": true, "FechaRegistro": "2023-11-14T16:17:16.607", "codigoProducto": "P006" }, { "IdProducto": 7, "oCategoria": { "IdCategoria": 4, "Descripcion": "Hogar" }, "Nombre": "Set de Sartenes", "Descripcion": "Juego de sartenes antiadherentes", "Stock": 49, "PrecioCompra": 30.00, "PrecioVenta": 49.99, "Estado": true, "FechaRegistro": "2023-11-14T16:17:16.607", "codigoProducto": "P007" }, { "IdProducto": 8, "oCategoria": { "IdCategoria": 4, "Descripcion": "Hogar" }, "Nombre": "Toallas de Baño", "Descripcion": "Toallas suaves y absorbentes, paquete de 3", "Stock": 129, "PrecioCompra": 11.00, "PrecioVenta": 29.99, "Estado": true, "FechaRegistro": "2023-11-14T16:17:16.607", "codigoProducto": "P008" }, { "IdProducto": 9, "oCategoria": { "IdCategoria": 5, "Descripcion": "Juguetes" }, "Nombre": "Juego de Construcción", "Descripcion": "Set de bloques de construcción para niños", "Stock": 85, "PrecioCompra": 60.00, "PrecioVenta": 24.99, "Estado": true, "FechaRegistro": "2023-11-14T16:17:16.607", "codigoProducto": "P009" }, { "IdProducto": 10, "oCategoria": { "IdCategoria": 5, "Descripcion": "Juguetes" }, "Nombre": "Muñeca Articulada", "Descripcion": "Muñeca articulada con accesorios", "Stock": 39, "PrecioCompra": 8.00, "PrecioVenta": 15.99, "Estado": true, "FechaRegistro": "2023-11-14T16:17:16.607", "codigoProducto": "P010" }, { "IdProducto": 11, "oCategoria": { "IdCategoria": 6, "Descripcion": "Belleza" }, "Nombre": "Kit de Maquillaje Profesional", "Descripcion": "Kit completo de maquillaje profesional", "Stock": 59, "PrecioCompra": 40.00, "PrecioVenta": 79.99, "Estado": true, "FechaRegistro": "2023-11-14T16:17:16.607", "codigoProducto": "P011" }, { "IdProducto": 12, "oCategoria": { "IdCategoria": 6, "Descripcion": "Belleza" }, "Nombre": "Secadora de Pelo", "Descripcion": "Secadora de pelo iónica para un secado rápido", "Stock": 30, "PrecioCompra": 25.00, "PrecioVenta": 49.99, "Estado": true, "FechaRegistro": "2023-11-14T16:17:16.607", "codigoProducto": "P012" }, { "IdProducto": 13, "oCategoria": { "IdCategoria": 7, "Descripcion": "Deportes" }, "Nombre": "Balón de Fútbol", "Descripcion": "Balón oficial de tamaño 5", "Stock": 28, "PrecioCompra": 15.00, "PrecioVenta": 29.99, "Estado": true, "FechaRegistro": "2023-11-14T16:17:16.607", "codigoProducto": "P013" }, { "IdProducto": 14, "oCategoria": { "IdCategoria": 7, "Descripcion": "Deportes" }, "Nombre": "Raqueta de Tenis", "Descripcion": "Raqueta de tenis para jugadores intermedios", "Stock": 20, "PrecioCompra": 40.00, "PrecioVenta": 79.99, "Estado": true, "FechaRegistro": "2023-11-14T16:17:16.607", "codigoProducto": "P014" }, { "IdProducto": 15, "oCategoria": { "IdCategoria": 8, "Descripcion": "Libros" }, "Nombre": "Libro Bestseller", "Descripcion": "Último libro del autor más vendido", "Stock": 100, "PrecioCompra": 10.00, "PrecioVenta": 19.99, "Estado": true, "FechaRegistro": "2023-11-14T16:17:16.607", "codigoProducto": "P015" }, { "IdProducto": 16, "oCategoria": { "IdCategoria": 8, "Descripcion": "Libros" }, "Nombre": "Cuaderno de Dibujo", "Descripcion": "Cuaderno de dibujo con páginas de alta calidad", "Stock": 47, "PrecioCompra": 5.00, "PrecioVenta": 9.99, "Estado": true, "FechaRegistro": "2023-11-14T16:17:16.607", "codigoProducto": "P016" }, { "IdProducto": 17, "oCategoria": { "IdCategoria": 9, "Descripcion": "Muebles" }, "Nombre": "Sofá Reclinable", "Descripcion": "Sofá cómodo con función de reclinado", "Stock": 20, "PrecioCompra": 300.00, "PrecioVenta": 599.99, "Estado": true, "FechaRegistro": "2023-11-14T16:17:16.607", "codigoProducto": "P017" }, { "IdProducto": 18, "oCategoria": { "IdCategoria": 9, "Descripcion": "Muebles" }, "Nombre": "Mesa de Centro Moderna", "Descripcion": "Mesa de centro con diseño moderno", "Stock": 30, "PrecioCompra": 50.00, "PrecioVenta": 99.99, "Estado": true, "FechaRegistro": "2023-11-14T16:17:16.607", "codigoProducto": "P018" }, { "IdProducto": 19, "oCategoria": { "IdCategoria": 10, "Descripcion": "Automotriz" }, "Nombre": "Aceite de Motor Sintético", "Descripcion": "Aceite de motor sintético, 5 litros", "Stock": 40, "PrecioCompra": 25.00, "PrecioVenta": 49.99, "Estado": true, "FechaRegistro": "2023-11-14T16:17:16.607", "codigoProducto": "P019" }, { "IdProducto": 20, "oCategoria": { "IdCategoria": 10, "Descripcion": "Automotriz" }, "Nombre": "Llantas Todo Terreno", "Descripcion": "Juego de llantas para vehículos todo terreno", "Stock": 14, "PrecioCompra": 80.00, "PrecioVenta": 159.99, "Estado": true, "FechaRegistro": "2023-11-14T16:17:16.607", "codigoProducto": "P020" }, { "IdProducto": 21, "oCategoria": { "IdCategoria": 8, "Descripcion": "Libros" }, "Nombre": "Habitos atomicos", "Descripcion": "Libro mas popular", "Stock": 30, "PrecioCompra": 20.00, "PrecioVenta": 80.00, "Estado": true, "FechaRegistro": "2023-11-14T16:32:02.383", "codigoProducto": "P021" }, { "IdProducto": 22, "oCategoria": { "IdCategoria": 3, "Descripcion": "Alimentos" }, "Nombre": "Licor", "Descripcion": "licor de limon", "Stock": 40, "PrecioCompra": 14.00, "PrecioVenta": 28.00, "Estado": true, "FechaRegistro": "2023-11-14T16:38:33.820", "codigoProducto": "P0016" }];

        res.json(productos);
        showStatus(res);
    }, 1);
})

// Endpoint para simular la inserción de un producto
router.post('/productos', (req, res) => {
    const producto = req.body;

    console.log("Producto recibido:", producto);

    // Simular una inserción exitosa
    res.status(201).json({
        message: "Producto insertado correctamente",
        producto: producto
    });

    // Mostrar el estado de la respuesta
    showStatus(res);
});

module.exports = router;
