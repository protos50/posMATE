/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PRODUCTO', {
    'IdProducto': {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "null",
      autoIncrement: true
    },
    'IdCategoria': {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "null",
      references: {
        model: 'CATEGORIA',
        key: 'IdCategoria'
      }
    },
    'Nombre': {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "null"
    },
    'Descripcion': {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "null"
    },
    'Stock': {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '((0))',
      comment: "null"
    },
    'PrecioCompra': {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: '((0))',
      comment: "null"
    },
    'PrecioVenta': {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: '((0))',
      comment: "null"
    },
    'Estado': {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      comment: "null"
    },
    'FechaRegistro': {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: '(getdate())',
      comment: "null"
    },
    'codigoProducto': {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "null"
    }
  }, {
    tableName: 'PRODUCTO'
  });
};
