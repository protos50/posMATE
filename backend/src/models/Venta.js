/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Venta', {
    'IdVenta': {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "null",
      autoIncrement: true
    },
    'IdUsuario': {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "null",
      references: {
        model: 'USUARIO',
        key: 'IdUsuario'
      }
    },
    'MontoPago': {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: "null"
    },
    'MontoCambio': {
      type: DataTypes.DECIMAL,
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
    },
    'IdCliente': {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "null",
      references: {
        model: 'Cliente',
        key: 'IdCliente'
      }
    }
  }, {
    tableName: 'Venta'
  });
};
