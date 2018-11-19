'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {type:DataTypes.STRING, unique: true}
  }, {
    underscored: true,
    tableName: 'users'
  });
  // User.associate = function(models) {
  //   // associations can be defined here
  // };
  return User;
};