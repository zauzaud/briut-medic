const sequelize = require('../config/sequelize');
const { DataTypes} = require('sequelize');

const Usuario = sequelize.define('Usuario', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Usuario',
    timestamps: false
});

// Adicionando um método estático para criar usuário com transação
Usuario.criarComTransacao = async function(dados) {
    const t = await sequelize.transaction();
    try {
        const usuario = await this.create(dados, { transaction: t });
        await t.commit();
        return usuario;
    } catch (error) {
        await t.rollback();
        throw error; // Lançar o erro para ser capturado pelo controlador
    }
};

module.exports = Usuario;
