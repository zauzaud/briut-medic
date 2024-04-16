// src/controllers/agendamentoController.js
const Agendamento = require('../models/Agendamento');

// Cria um novo agendamento.
exports.criarAgendamento = async (req, res) => {
    try {
        const novoAgendamento = await Agendamento.create(req.body);
        res.status(201).send(novoAgendamento);
    } catch (erro) {
        res.status(500).send(erro);
    }
};

// Recupera todos os agendamentos.
exports.listarTodosAgendamentos = async (req, res) => {
    try {
        const agendamentos = await Agendamento.findAll();
        res.send(agendamentos);
    } catch (erro) {
        res.status(500).send(erro);
    }
};

// Recupera um agendamento pelo ID.
exports.buscarAgendamentoPorId = async (req, res) => {
    try {
        const agendamento = await Agendamento.findByPk(req.params.id);
        if (agendamento) {
            res.send(agendamento);
        } else {
            res.status(404).send({ mensagem: "Agendamento não encontrado!" });
        }
    } catch (erro) {
        res.status(500).send(erro);
    }
};

// Atualiza um agendamento pelo ID.
exports.atualizarAgendamento = async (req, res) => {
    try {
        const resultado = await Agendamento.update(req.body, {
            where: { id: req.params.id }
        });

        if (resultado[0] === 1) {
            res.send({ mensagem: "Agendamento atualizado com sucesso." });
        } else {
            res.status(404).send({ mensagem: "Agendamento não encontrado ou dados inválidos para atualização." });
        }
    } catch (erro) {
        res.status(500).send(erro);
    }
};

// Exclui um agendamento pelo ID.
exports.excluirAgendamento = async (req, res) => {
    try {
        const resultado = await Agendamento.destroy({
            where: { id: req.params.id }
        });

        if (resultado === 1) {
            res.send({ mensagem: "Agendamento excluído com sucesso." });
        } else {
            res.status(404).send({ mensagem: "Agendamento não encontrado." });
        }
    } catch (erro) {
        res.status(500).send(erro);
    }
};
