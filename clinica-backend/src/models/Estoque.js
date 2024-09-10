const { DataTypes } = require('sequelize');
   const sequelize = require('../config/sequelize');

   const Estoque = sequelize.define('Estoque', {
     id: {
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement: true
     },
     nome_item: {
       type: DataTypes.STRING(100),
       allowNull: false,
       field: 'nome_item'
     },
     quantidade: {
       type: DataTypes.INTEGER,
       allowNull: false
     },
     data_validade: {
       type: DataTypes.DATE,
       allowNull: true
     },
     fornecedor: {
       type: DataTypes.STRING(100),
       allowNull: true
     }
   }, {
     tableName: 'Estoque',
     timestamps: false
   });


// Método para criar estoque com transação
Estoque.criarComTransacao = async function(dadosEstoque) {
    const t = await sequelize.transaction();
    try {
        const estoque = await this.create(dadosEstoque, { transaction: t });
        await t.commit();
        return estoque;
    } catch (error) {
        await t.rollback();
        throw error; // Lançar o erro para ser capturado pelo controlador
    }
};

module.exports = Estoque;
