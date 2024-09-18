const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

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
    tipo_anamnese: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    tableName: 'Anamnese',
    timestamps: true,
    createdAt: 'data_criacao',
    updatedAt: 'ultima_atualizacao'
});



module.exports = Anamnese;