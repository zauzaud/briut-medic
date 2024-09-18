const ComissaoProfissional = require('../models/ComissaoProfissional');

exports.criarComissao = async (req, res) => {
    try {
        const novaComissao = await ComissaoProfissional.create(req.body);
        res.status(201).json(novaComissao);
    } catch (erro) {
        res.status(400).json({ mensagem: "Erro ao criar comissão", erro: erro.message });
    }
};

exports.listarComissoes = async (req, res) => {
    try {
        const comissoes = await ComissaoProfissional.findAll({
            include: [{ model: Usuario }, { model: Servico }]
        });
        res.json(comissoes);
    } catch (erro) {
        res.status(500).json({ mensagem: "Erro ao listar comissões", erro: erro.message });
    }
};

exports.buscarComissaoPorId = async (req, res) => {
    try {
        const comissao = await ComissaoProfissional.findByPk(req.params.id, {
            include: [{ model: Usuario }, { model: Servico }]
        });
        if (comissao) {
            res.json(comissao);
        } else {
            res.status(404).json({ mensagem: "Comissão não encontrada" });
        }
    } catch (erro) {
        res.status(500).json({ mensagem: "Erro ao buscar comissão", erro: erro.message });
    }
};

exports.atualizarComissao = async (req, res) => {
    try {
        const [atualizado] = await ComissaoProfissional.update(req.body, {
            where: { id: req.params.id }
        });
        if (atualizado) {
            const comissaoAtualizada = await ComissaoProfissional.findByPk(req.params.id);
            res.json(comissaoAtualizada);
        } else {
            res.status(404).json({ mensagem: "Comissão não encontrada" });
        }
    } catch (erro) {
        res.status(500).json({ mensagem: "Erro ao atualizar comissão", erro: erro.message });
    }
};

exports.deletarComissao = async (req, res) => {
    try {
        const deletado = await ComissaoProfissional.destroy({
            where: { id: req.params.id }
        });
        if (deletado) {
            res.json({ mensagem: "Comissão deletada com sucesso" });
        } else {
            res.status(404).json({ mensagem: "Comissão não encontrada" });
        }
    } catch (erro) {
        res.status(500).json({ mensagem: "Erro ao deletar comissão", erro: erro.message });
    }
};

exports.buscarComissaoPorProfissionalEServico = async (req, res) => {
    try {
        const { profissional_id, servico_id } = req.params;
        const comissao = await ComissaoProfissional.findOne({
            where: { profissional_id, servico_id },
            include: [{ model: Usuario }, { model: Servico }]
        });
        if (comissao) {
            res.json(comissao);
        } else {
            res.status(404).json({ mensagem: "Comissão não encontrada para este profissional e serviço" });
        }
    } catch (erro) {
        res.status(500).json({ mensagem: "Erro ao buscar comissão", erro: erro.message });
    }
};

exports.listarComissoesPorProfissional = async (req, res) => {
    try {
        const { profissional_id } = req.params;
        const comissoes = await ComissaoProfissional.findAll({
            where: { profissional_id },
            include: [{ model: Usuario }, { model: Servico }]
        });
        res.json(comissoes);
    } catch (erro) {
        res.status(500).json({ mensagem: "Erro ao listar comissões do profissional", erro: erro.message });
    }
};

module.exports = exports;