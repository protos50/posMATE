/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('COMPRA', {
    'IdCompra': {
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
    'IdProveedor': {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "null",
      references: {
        model: 'PROVEEDOR',
        key: 'IdProveedor'
      }
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
    tableName: 'COMPRA'
  });
};
