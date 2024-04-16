const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('clinicadb', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;