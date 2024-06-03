const express = require('express');
const app = express();

const categoriasRoutes = require('./categoriasRoutes');
const usuariosRoutes = require('./usuariosRoutes');

app.use(express.json());
app.use(categoriasRoutes);
app.use(usuariosRoutes);


const PORT = 3033;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
