const Agendamento = require('../models/Agendamento');
const Servico = require('../models/Servico');
const Usuario = require('../models/Usuario');
const Paciente = require('../models/Paciente');

exports.criarAgendamento = async (req, res) => {
    try {
        const novoAgendamento = await Agendamento.create(req.body);
        res.status(201).json(novoAgendamento);
    } catch (erro) {
        res.status(400).json({ mensagem: "Erro ao criar agendamento", erro: erro.message });
    }
};

exports.listarAgendamentos = async (req, res) => {
    try {
        const agendamentos = await Agendamento.findAll({
            include: [
                { model: Servico },
                { model: Usuario, as: 'Profissional' },
                { model: Paciente }
            ]
        });
        res.json(agendamentos);
    } catch (erro) {
        res.status(500).json({ mensagem: "Erro ao listar agendamentos", erro: erro.message });
    }
};

exports.buscarAgendamentoPorId = async (req, res) => {
    try {
        const agendamento = await Agendamento.findByPk(req.params.id, {
            include: [
                { model: Servico },
                { model: Usuario, as: 'Profissional' },
                { model: Paciente }
            ]
        });
        if (agendamento) {
            res.json(agendamento);
        } else {
            res.status(404).json({ mensagem: "Agendamento não encontrado" });
        }
    } catch (erro) {
        res.status(500).json({ mensagem: "Erro ao buscar agendamento", erro: erro.message });
    }
};

exports.atualizarAgendamento = async (req, res) => {
    try {
        const [atualizado] = await Agendamento.update(req.body, {
            where: { id: req.params.id }
        });
        if (atualizado) {
            const agendamentoAtualizado = await Agendamento.findByPk(req.params.id);
            res.json(agendamentoAtualizado);
        } else {
            res.status(404).json({ mensagem: "Agendamento não encontrado" });
        }
    } catch (erro) {
        res.status(500).json({ mensagem: "Erro ao atualizar agendamento", erro: erro.message });
    }
};

exports.deletarAgendamento = async (req, res) => {
    try {
        const deletado = await Agendamento.destroy({
            where: { id: req.params.id }
        });
        if (deletado) {
            res.json({ mensagem: "Agendamento deletado com sucesso" });
        } else {
            res.status(404).json({ mensagem: "Agendamento não encontrado" });
        }
    } catch (erro) {
        res.status(500).json({ mensagem: "Erro ao deletar agendamento", erro: erro.message });
    }
};