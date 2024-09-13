const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Paciente = sequelize.define('Paciente', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        unique: true
    },
    telefone: {
        type: DataTypes.STRING(20)
    },
    data_nascimento: {
        type: DataTypes.DATE
    },
    genero: {
        type: DataTypes.STRING(20)
    },
    endereco: {
        type: DataTypes.STRING(255)
    },
    cidade: {
        type: DataTypes.STRING(100)
    },
    estado: {
        type: DataTypes.STRING(50)
    },
    cep: {
        type: DataTypes.STRING(10)
    }
}, {
    tableName: 'Paciente',
    timestamps: true,
    createdAt: 'data_cadastro',
    updatedAt: false
});

module.exports = Paciente;