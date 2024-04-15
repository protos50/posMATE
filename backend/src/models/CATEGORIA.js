/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CATEGORIA', {
    'IdCategoria': {
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
    },
    'Estado': {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      comment: "null"
    }
  }, {
    tableName: 'CATEGORIA'
  });
};
