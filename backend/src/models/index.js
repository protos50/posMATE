'use strict';

let fs = require('fs');
let path = require('path');
let Sequelize = require('sequelize');
let basename = path.basename(__filename);
const db = {};
let dotenv = require('dotenv');

dotenv.config();
const sequelize = new Sequelize({
    database: process.env.DB_NAME ?? "mysb",
    dialect: 'mssql',
    username: process.env.DB_USER ?? "sa",
    password: process.env.DB_PASS ?? "sa",
    port: parseInt(process.env.DB_PORT ?? "1433"),
    models: ['../models'], // or [Player, Team],

    define: {
        timestamps: false
    }
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.CATEGORIA = require('./CATEGORIA')(sequelize, Sequelize)
db.COMPRA = require('./COMPRA')(sequelize, Sequelize)
db.Cliente = require('./Cliente')(sequelize, Sequelize)
db.DETALLE_COMPRA = require('./DETALLE_COMPRA')(sequelize, Sequelize)
db.DETALLE_VENTA = require('./DETALLE_VENTA')(sequelize, Sequelize)
db.PERMISO = require('./PERMISO')(sequelize, Sequelize)
db.PRODUCTO = require('./PRODUCTO')(sequelize, Sequelize)
db.PROVEEDOR = require('./PROVEEDOR')(sequelize, Sequelize)
db.ROL = require('./ROL')(sequelize, Sequelize)
db.USUARIO = require('./USUARIO')(sequelize, Sequelize)
db.Venta = require('./Venta')(sequelize, Sequelize)

//////////Generacion del codigo para importar
/*fs.readdirSync(__dirname).filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
})
    .forEach(file => {
        let model = file.slice(0, -3);
        //Importa el modelo
        db[model] = require(path.join(__dirname, file))(sequelize, Sequelize);
        //Genera codigo para importar los modelos
        console.log(`db.${model} = require('./${model}')(sequelize, Sequelize)`);

    });*/
//////////////////
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

module.exports = db
