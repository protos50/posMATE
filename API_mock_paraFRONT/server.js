const express = require('express');
const app = express();

const categoriasRoutes = require('./routes/categoriasRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');
const rolesRoutes = require('./routes/rolesRoutes');
const productosRoutes = require('./routes/productosRoutes');
const clientesRoutes = require('./routes/clientesRoutes');
const proveedoresRoutes = require('./routes/proveedoresRoutes');
const permisosRoutes = require('./routes/permisosRoutes');


app.use(express.json());
app.use(categoriasRoutes);
app.use(usuariosRoutes);
app.use(rolesRoutes);
app.use(productosRoutes);
app.use(clientesRoutes);
app.use(proveedoresRoutes);
app.use(permisosRoutes);


const PORT = 3033;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
