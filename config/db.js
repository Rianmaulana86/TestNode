const Sequelize = require('sequelize');
const sequelize = new Sequelize('testci4', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;