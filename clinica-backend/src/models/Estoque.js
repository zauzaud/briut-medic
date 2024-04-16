const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize'); // Ajuste o caminho conforme a localização do seu arquivo de configuração do Sequelize

const Estoque = sequelize.define('Estoque', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    produto: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "O nome do produto não pode estar vazio." }
        }
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: { msg: "A quantidade deve ser um número inteiro." },
            min: 0
        }
    }
}, {
    tableName: 'Estoque',
    timestamps: false
});

module.exports = Estoque;
