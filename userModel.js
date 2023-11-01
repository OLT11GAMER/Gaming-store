let database = require('./database');
let sequelize = require('sequelize');
database.sync();

let modeli = database.define('User', {
    username: {
      type: sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: sequelize.STRING,
      allowNull: false,
    },
  });

  module.exports = modeli;