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
        type: DataTypes.DATEONLY,
        allowNull: true
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
    },
    informacoes_medicas: {
        type: DataTypes.TEXT
    },
    data_cadastro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'Paciente',
    timestamps: false
});

module.exports = Paciente;