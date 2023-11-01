let sequelize = require("sequelize");
let database = new sequelize(
    'gamingstore',
    'root','',
 {
    host: 'localhost',
    dialect: 'mysql'
})
module.exports = database