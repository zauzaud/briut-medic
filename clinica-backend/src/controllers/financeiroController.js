const Financeiro = require('../models/Financeiro');

exports.adicionarTransacao = async (req, res) => {
    try {
        const novaTransacao = await Financeiro.create({
            tipo_transacao: req.body.tipo_transacao,
            valor: req.body.valor,
            data: req.body.data,
            usuario_id: req.body.usuario_id
        });
        res.status(201).send(novaTransacao);
    } catch (erro) {
        res.status(500).send(erro);
    }
};

exports.listarTodasTransacoes = async (req, res) => {
    try {
        const transacoes = await Financeiro.findAll();
        res.send(transacoes);
    } catch (erro) {
        res.status(500).send(erro);
    }
};

exports.buscarTransacaoPorId = async (req, res) => {
    try {
        const transacao = await Financeiro.findByPk(req.params.id);
        if (transacao) {
            res.send(transacao);
        } else {
            res.status(404).send({ mensagem: "Transação não encontrada." });
        }
    } catch (erro) {
        res.status(500).send(erro);
    }
};

exports.atualizarTransacao = async (req, res) => {
    try {
        const atualizado = await Financeiro.update(req.body, {
            where: { id: req.params.id }
        });
        if (atualizado[0] === 1) {
            res.send({ mensagem: "Transação atualizada com sucesso." });
        } else {
            res.status(404).send({ mensagem: "Transação não encontrada ou dados inválidos para atualização." });
        }
    } catch (erro) {
        res.status(500).send(erro);
    }
};

exports.excluirTransacao = async (req, res) => {
    try {
        const deletado = await Financeiro.destroy({
            where: { id: req.params.id }
        });
        if (deletado === 1) {
            res.send({ mensagem: "Transação excluída com sucesso." });
        } else {
            res.status(404).send({ mensagem: "Transação não encontrada." });
        }
    } catch (erro) {
        res.status(500).send(erro);
    }
};
