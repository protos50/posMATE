/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ROL', {
    'IdRol': {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "null",
      autoIncrement: true
    },
    'Descripcion': {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "null"
    }
  }, {
    tableName: 'ROL'
  });
};
