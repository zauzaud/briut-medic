const Estoque = require('../models/Estoque');

exports.adicionarItem = async (req, res) => {
    try {
        const novoItem = await Estoque.create({
            produto: req.body.produto,
            quantidade: req.body.quantidade
        });
        res.status(201).send(novoItem);
    } catch (erro) {
        res.status(500).send(erro.toString());
    }
};

exports.listarTodosItens = async (req, res) => {
    try {
        const itens = await Estoque.findAll();
        res.send(itens);
    } catch (erro) {
        res.status(500).send(erro.toString());
    }
};

exports.buscarItemPorId = async (req, res) => {
    try {
        const item = await Estoque.findByPk(req.params.id);
        if (item) {
            res.send(item);
        } else {
            res.status(404).send({ mensagem: "Item não encontrado." });
        }
    } catch (erro) {
        res.status(500).send(erro.toString());
    }
};

exports.atualizarItem = async (req, res) => {
    try {
        const atualizado = await Estoque.update(req.body, {
            where: { id: req.params.id }
        });
        if (atualizado[0] === 1) {
            res.send({ mensagem: "Item atualizado com sucesso." });
        } else {
            res.status(404).send({ mensagem: "Item não encontrado ou dados inválidos para atualização." });
        }
    } catch (erro) {
        res.status(500).send(erro.toString());
    }
};

exports.excluirItem = async (req, res) => {
    try {
        const deletado = await Estoque.destroy({
            where: { id: req.params.id }
        });
        if (deletado === 1) {
            res.send({ mensagem: "Item excluído com sucesso." });
        } else {
            res.status(404).send({ mensagem: "Item não encontrado." });
        }
    } catch (erro) {
        res.status(500).send(erro.toString());
    }
};
