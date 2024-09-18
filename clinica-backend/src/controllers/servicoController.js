const Servico = require('../models/Servico');

exports.criarServico = async (req, res) => {
    try {
        const novoServico = await Servico.create(req.body);
        res.status(201).json(novoServico);
    } catch (erro) {
        res.status(400).json({ mensagem: "Erro ao criar serviço", erro: erro.message });
    }
};

exports.listarServicos = async (req, res) => {
    try {
        const servicos = await Servico.findAll();
        res.json(servicos);
    } catch (erro) {
        res.status(500).json({ mensagem: "Erro ao listar serviços", erro: erro.message });
    }
};

exports.buscarServicoPorId = async (req, res) => {
    try {
        const servico = await Servico.findByPk(req.params.id);
        if (servico) {
            res.json(servico);
        } else {
            res.status(404).json({ mensagem: "Serviço não encontrado" });
        }
    } catch (erro) {
        res.status(500).json({ mensagem: "Erro ao buscar serviço", erro: erro.message });
    }
};

exports.atualizarServico = async (req, res) => {
    try {
        const [atualizado] = await Servico.update(req.body, {
            where: { id: req.params.id }
        });
        if (atualizado) {
            const servicoAtualizado = await Servico.findByPk(req.params.id);
            res.json(servicoAtualizado);
        } else {
            res.status(404).json({ mensagem: "Serviço não encontrado" });
        }
    } catch (erro) {
        res.status(500).json({ mensagem: "Erro ao atualizar serviço", erro: erro.message });
    }
};

exports.deletarServico = async (req, res) => {
    try {
        const deletado = await Servico.destroy({
            where: { id: req.params.id }
        });
        if (deletado) {
            res.json({ mensagem: "Serviço deletado com sucesso" });
        } else {
            res.status(404).json({ mensagem: "Serviço não encontrado" });
        }
    } catch (erro) {
        res.status(500).json({ mensagem: "Erro ao deletar serviço", erro: erro.message });
    }
};