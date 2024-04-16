const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Financeiro = sequelize.define('Financeiro', {
    tipo_transacao: {
        type: DataTypes.STRING,
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
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Usuario',
            key: 'id'
        }
    }
}, {
    tableName: 'Financeiro',
    timestamps: false
});

module.exports = Financeiro;