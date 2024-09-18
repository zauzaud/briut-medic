const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const ComissaoProfissional = sequelize.define('ComissaoProfissional', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    profissional_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    servico_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    percentual_comissao: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    }
}, {
    tableName: 'ComissaoProfissional',
    timestamps: false
});

ComissaoProfissional.associate = (models) => {
    ComissaoProfissional.belongsTo(models.Usuario, { foreignKey: 'profissional_id' });
    ComissaoProfissional.belongsTo(models.Servico, { foreignKey: 'servico_id' });
};

module.exports = ComissaoProfissional;