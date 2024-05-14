const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Agendamento = sequelize.define('Agendamento', {
    usuario_id: {
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
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Agendamento',
    timestamps: false
});

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
