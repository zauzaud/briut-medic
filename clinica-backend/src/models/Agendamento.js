// clinica-backend/src/models/Agendamento.js
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


// Método para criar agendamento com transação
Agendamento.criarComTransacao = async function(dadosAgendamento) {
    const t = await sequelize.transaction();
    try {
        const agendamento = await this.create(dadosAgendamento, { transaction: t });
        await t.commit();
        return agendamento;
    } catch (error) {
        await t.rollback();
        throw error; // Lançar o erro para ser capturado pelo controlador
    }
};

module.exports = Agendamento;
