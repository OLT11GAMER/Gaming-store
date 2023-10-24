let sequelize = require("sequelize");
let database = new sequelize(
    'finder',
    'root','',
 {
    host: 'localhost',
    dialect: 'mysql'
})
module.exports = database