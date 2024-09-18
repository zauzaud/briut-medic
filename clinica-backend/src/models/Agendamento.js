const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

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
    profissional_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    servico_id: {
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
    status: {
        type: DataTypes.ENUM('Agendado', 'Confirmado', 'Concluido', 'Cancelado'),
        allowNull: false
    },
    observacoes: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'Agendamento',
    timestamps: false
});

Agendamento.associate = (models) => {
    Agendamento.belongsTo(models.Paciente, { foreignKey: 'paciente_id' });
    Agendamento.belongsTo(models.Usuario, { foreignKey: 'profissional_id' });
    Agendamento.belongsTo(models.Servico, { foreignKey: 'servico_id' });
};

module.exports = Agendamento;