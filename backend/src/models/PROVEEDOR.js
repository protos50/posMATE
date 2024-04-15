/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PROVEEDOR', {
    'IdProveedor': {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "null",
      autoIncrement: true
    },
    'Nombre': {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "null"
    },
    'Documento': {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "null"
    },
    'Telefono': {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "null"
    },
    'Estado': {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      comment: "null"
    }
  }, {
    tableName: 'PROVEEDOR'
  });
};
