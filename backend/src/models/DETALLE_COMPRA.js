/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DETALLE_COMPRA', {
    'IdDetalleCompra': {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "null",
      autoIncrement: true
    },
    'IdCompra': {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "null",
      references: {
        model: 'COMPRA',
        key: 'IdCompra'
      }
    },
    'IdProducto': {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "null",
      references: {
        model: 'PRODUCTO',
        key: 'IdProducto'
      }
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
    'Cantidad': {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "null"
    },
    'MontoTotal': {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: "null"
    },
    'FechaRegistro': {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: '(getdate())',
      comment: "null"
    }
  }, {
    tableName: 'DETALLE_COMPRA'
  });
};
