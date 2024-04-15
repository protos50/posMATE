/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DETALLE_VENTA', {
    'IdDetalleVenta': {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "null",
      autoIncrement: true
    },
    'IdVenta': {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "null",
      references: {
        model: 'Venta',
        key: 'IdVenta'
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
    'PrecioVenta': {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: "null"
    },
    'Cantidad': {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "null"
    },
    'Subtotal': {
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
    tableName: 'DETALLE_VENTA'
  });
};
