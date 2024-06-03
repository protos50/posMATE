const express = require('express');
const app = express();

const categoriasRoutes = require('./categoriasRoutes');
const usuariosRoutes = require('./usuariosRoutes');
const rolesRoutes = require('./rolesRoutes');
const productosRoutes = require('./productosRoutes');


app.use(express.json());
app.use(categoriasRoutes);
app.use(usuariosRoutes);
app.use(rolesRoutes);
app.use(productosRoutes);


const PORT = 3033;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
