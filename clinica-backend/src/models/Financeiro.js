const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Paciente = require('./Paciente');

const Financeiro = sequelize.define('Financeiro', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipo_transacao: {
        type: DataTypes.ENUM('receita', 'despesa'),
        allowNull: false
    },
    valor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    data: {
        type: DataTypes.DATE,
        allowNull: false
    },
    paciente_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    descricao: {
        type: DataTypes.TEXT
    },
    categoria: {
        type: DataTypes.STRING(100)
    }
}, {
    tableName: 'Financeiro',
    timestamps: false
});

Financeiro.belongsTo(Paciente, { foreignKey: 'paciente_id' });

module.exports = Financeiro;