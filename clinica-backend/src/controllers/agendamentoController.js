const Agendamento = require('../models/Agendamento');
const Servico = require('../models/Servico');
const Usuario = require('../models/Usuario');
const Paciente = require('../models/Paciente');

exports.criarAgendamento = async (req, res) => {
    try {
        const { paciente_id, profissional_id, servico_id, data_hora, data_hora_fim, status, observacoes } = req.body;
        
        if (!paciente_id || !profissional_id || !servico_id || !data_hora || !data_hora_fim || !status) {
            return res.status(400).json({ mensagem: "Todos os campos obrigatórios devem ser preenchidos" });
        }

        const novoAgendamento = await Agendamento.create({
            paciente_id,
            profissional_id,
            servico_id,
            data_hora,
            data_hora_fim,
            status,
            observacoes
        });

        res.status(201).json(novoAgendamento);
    } catch (erro) {
        console.error('Erro ao criar agendamento:', erro);
        res.status(500).json({ mensagem: "Erro ao criar agendamento", erro: erro.message });
    }
};

exports.listarAgendamentos = async (req, res) => {
    try {
        const agendamentos = await Agendamento.findAll({
            include: [
                { model: Servico },
                { model: Usuario, as: 'Profissional', attributes: ['id', 'nome'] },
                { model: Paciente, attributes: ['id', 'nome'] }
            ]
        });
        const formattedAgendamentos = agendamentos.map(a => ({
            id: a.id,
            title: `${a.Servico.nome} - ${a.Paciente.nome}`,
            start: a.data_hora,
            end: a.data_hora_fim,
            extendedProps: {
                paciente_id: a.paciente_id,
                paciente_nome: a.Paciente.nome,
                profissional_id: a.profissional_id,
                profissional_nome: a.Profissional.nome,
                servico_id: a.servico_id,
                servico_nome: a.Servico.nome,
                status: a.status,
                observacoes: a.observacoes
            }
        }));
        res.json(formattedAgendamentos);
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