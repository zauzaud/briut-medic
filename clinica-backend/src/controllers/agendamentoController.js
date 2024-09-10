const Agendamento = require('../models/Agendamento');
const { Op } = require('sequelize');

exports.criarAgendamento = async (req, res) => {
    try {
        const { usuario_id, data_hora, data_hora_fim, servico, status } = req.body;
        
        // Validação dos dados
        if (!usuario_id || !data_hora || !data_hora_fim || !servico || !status) {
            return res.status(400).send({ mensagem: "Todos os campos são obrigatórios" });
        }

        const novoAgendamento = await Agendamento.create({
            usuario_id,
            data_hora,
            data_hora_fim,
            servico,
            status
        });

        res.status(201).send(novoAgendamento);
    } catch (erro) {
        console.error('Erro ao criar agendamento:', erro);
        res.status(500).send({ mensagem: "Erro ao criar agendamento", erro: erro.message });
    }
};

// recupera todos
exports.listarTodosAgendamentos = async (req, res) => {
    try {
        let where = {};
        if (req.query.date) {
            const startDate = new Date(req.query.date);
            const endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + 1);
            
            where = {
                data_hora: {
                    [Op.gte]: startDate,
                    [Op.lt]: endDate
                }
            };
        }
        
        const agendamentos = await Agendamento.findAll({ where });
        res.send(agendamentos);
    } catch (erro) {
        console.error('Erro ao listar agendamentos:', erro);
        res.status(500).send({ mensagem: "Erro ao listar agendamentos", erro: erro.message });
    }
};

// recupera um agendamento pelo ID
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

// atualiza um agendamento pelo ID
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

// exclui um agendamento pelo ID
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
