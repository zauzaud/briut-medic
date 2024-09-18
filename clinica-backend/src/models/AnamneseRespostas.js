const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Anamnese = require('./Anamnese');

const AnamneseRespostas = sequelize.define('AnamneseRespostas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    anamnese_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    pergunta: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    resposta: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'AnamneseRespostas',
    timestamps: false
});

AnamneseRespostas.belongsTo(Anamnese, { foreignKey: 'anamnese_id' });
Anamnese.hasMany(AnamneseRespostas, { foreignKey: 'anamnese_id' });

module.exports = AnamneseRespostas;