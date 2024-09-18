const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Financeiro = sequelize.define('Financeiro', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipo_transacao: {
        type: DataTypes.ENUM('Receita', 'Despesa'),
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
        type: DataTypes.INTEGER
    },
    agendamento_id: {
        type: DataTypes.INTEGER
    },
    profissional_id: {
        type: DataTypes.INTEGER
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

Financeiro.associate = (models) => {
    Financeiro.belongsTo(models.Paciente, { foreignKey: 'paciente_id' });
    Financeiro.belongsTo(models.Agendamento, { foreignKey: 'agendamento_id' });
    Financeiro.belongsTo(models.Usuario, { foreignKey: 'profissional_id' });
};

module.exports = Financeiro;