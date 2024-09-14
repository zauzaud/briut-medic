const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    tipo: {
        type: DataTypes.ENUM('admin', 'medico', 'recepcionista', 'outro'),
        allowNull: false
    },
    data_cadastro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'Usuario',
    timestamps: false
});

Usuario.criarComTransacao = async function(dados) {
    const t = await sequelize.transaction();
    try {
        const usuario = await this.create(dados, { transaction: t });
        await t.commit();
        return usuario;
    } catch (error) {
        await t.rollback();
        console.error('Erro ao criar usuário:', error);
        throw error;
    }
};

module.exports = Usuario;