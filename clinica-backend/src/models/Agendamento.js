const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Paciente = require('./Paciente');
const Usuario = require('./Usuario');

const Agendamento = sequelize.define('Agendamento', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    paciente_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    medico_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    data_hora: {
        type: DataTypes.DATE,
        allowNull: false
    },
    data_hora_fim: {
        type: DataTypes.DATE,
        allowNull: false
    },
    servico: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('agendado', 'confirmado', 'concluido', 'cancelado'),
        allowNull: false
    },
    observacoes: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'Agendamento',
    timestamps: false
});

Agendamento.belongsTo(Paciente, { foreignKey: 'paciente_id' });
Agendamento.belongsTo(Usuario, { foreignKey: 'medico_id' });

module.exports = Agendamento;