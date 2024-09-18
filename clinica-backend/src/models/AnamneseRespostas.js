const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

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

AnamneseRespostas.associate = function(models) {
    AnamneseRespostas.belongsTo(models.Anamnese, { foreignKey: 'anamnese_id', as: 'Anamnese' });
};

module.exports = AnamneseRespostas;