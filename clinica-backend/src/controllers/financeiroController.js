const Financeiro = require('../models/Financeiro');

exports.adicionarTransacao = async (req, res) => {
    try {
        const { tipo_transacao, valor, data, paciente_id, descricao, categoria } = req.body;
        const novaTransacao = await Financeiro.create({
            tipo_transacao,
            valor,
            data,
            paciente_id,
            descricao,
            categoria
        });
        res.status(201).json(novaTransacao);
    } catch (erro) {
        res.status(500).json({ mensagem: "Erro ao adicionar transação", erro: erro.message });
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
