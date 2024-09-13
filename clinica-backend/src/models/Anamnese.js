const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Paciente = require('./Paciente');

const Anamnese = sequelize.define('Anamnese', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    paciente_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    historia_clinica: {
        type: DataTypes.TEXT
    },
    medicacoes_atuais: {
        type: DataTypes.TEXT
    },
    alergias: {
        type: DataTypes.TEXT
    },
    habitos_vida: {
        type: DataTypes.TEXT
    },
    antecedentes_familiares: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'Anamnese',
    timestamps: true,
    createdAt: 'data_criacao',
    updatedAt: 'ultima_atualizacao'
});

Anamnese.belongsTo(Paciente, { foreignKey: 'paciente_id' });

module.exports = Anamnese;