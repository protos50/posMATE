const express = require('express');
const router = express.Router();

router.get('/categorias', (req, res) => {
    console.log("GET : /categorias");
  
    // Simulación de datos de categorias
    let categorias = [
      {"IdCategoria":1,"Descripcion":"Electrónicos","Estado":true},
      {"IdCategoria":2,"Descripcion":"Ropa","Estado":false},
      {"IdCategoria":3,"Descripcion":"Alimentos","Estado":true},
      {"IdCategoria":4,"Descripcion":"Hogar","Estado":true},
      {"IdCategoria":5,"Descripcion":"Juguetes","Estado":true},
      {"IdCategoria":6,"Descripcion":"Belleza","Estado":true},
      {"IdCategoria":7,"Descripcion":"Deportes","Estado":true},
      {"IdCategoria":8,"Descripcion":"Libros","Estado":true},
      {"IdCategoria":9,"Descripcion":"Muebles","Estado":true},
      {"IdCategoria":10,"Descripcion":"Automotriz","Estado":true},
      {"IdCategoria":11,"Descripcion":"Jardín","Estado":true},
      {"IdCategoria":12,"Descripcion":"Mascotas","Estado":true},
      {"IdCategoria":13,"Descripcion":"Farmacia","Estado":true},
      {"IdCategoria":14,"Descripcion":"Herramientas","Estado":true},
      {"IdCategoria":15,"Descripcion":"Oficina","Estado":true},
      {"IdCategoria":16,"Descripcion":"Instrumentos Musicales","Estado":true},
      {"IdCategoria":17,"Descripcion":"Artículos para bebés","Estado":true},
      {"IdCategoria":18,"Descripcion":"Arte y Manualidades","Estado":true},
      {"IdCategoria":19,"Descripcion":"Fotografía","Estado":true},
      {"IdCategoria":20,"Descripcion":"Software","Estado":true}
    ]
    res.json(categorias);
    console.log("Mensaje de estado: " + res.statusMessage);
    console.log("Codigo de estado: " + res.statusCode);
  })
  
module.exports = router;
