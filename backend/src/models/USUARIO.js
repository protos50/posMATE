/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('USUARIO', {
    'IdUsuario': {
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
    'Apellido': {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "null"
    },
    'Clave': {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "null"
    },
    'Email': {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "null"
    },
    'DNI': {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "null"
    },
    'Direccion': {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "null"
    },
    'FechaNacimiento': {
      type: DataTypes.DATEONLY,
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
    },
    'IdRol': {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "null",
      references: {
        model: 'ROL',
        key: 'IdRol'
      }
    }
  }, {
    tableName: 'USUARIO'
  });
};
