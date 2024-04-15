/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PERMISO', {
    'IdPermiso': {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "null",
      autoIncrement: true
    },
    'IdRol': {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "null",
      references: {
        model: 'ROL',
        key: 'IdRol'
      }
    },
    'NombreMenu': {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "null"
    }
  }, {
    tableName: 'PERMISO'
  });
};
