const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

// Define o modelo 'Agendamento', correspondendo à tabela 'Agendamento' no banco de dados.
const Agendamento = sequelize.define('Agendamento', {
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Usuario',
            key: 'id'
        }
    },
    data_hora: {
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
    timestamps: false // Desativa a geração automatica de timestamps 
});

module.exports = Agendamento;
