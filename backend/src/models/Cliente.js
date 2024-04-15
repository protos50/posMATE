/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Cliente', {
    'IdCliente': {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      primaryKey: true,
      comment: "null",
      autoIncrement: true
    },
    'DNI': {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "null"
    },
    'Nombre': {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "null"
    },
    'Apellido': {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "null"
    }
  }, {
    tableName: 'Cliente'
  });
};
