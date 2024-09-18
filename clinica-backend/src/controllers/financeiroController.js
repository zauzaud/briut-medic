const Financeiro = require('../models/Financeiro');
const Agendamento = require('../models/Agendamento');
const ComissaoProfissional = require('../models/ComissaoProfissional');

exports.criarTransacao = async (req, res) => {
    try {
        const novaTransacao = await Financeiro.create(req.body);
        res.status(201).json(novaTransacao);
    } catch (erro) {
        res.status(400).json({ mensagem: "Erro ao criar transação", erro: erro.message });
    }
};

exports.listarTransacoes = async (req, res) => {
    try {
        const transacoes = await Financeiro.findAll({
            include: [
                { model: Agendamento },
                { model: Usuario, as: 'Profissional' },
                { model: Paciente }
            ]
        });
        res.json(transacoes);
    } catch (erro) {
        res.status(500).json({ mensagem: "Erro ao listar transações", erro: erro.message });
    }
};

exports.buscarTransacaoPorId = async (req, res) => {
    try {
        const transacao = await Financeiro.findByPk(req.params.id, {
            include: [
                { model: Agendamento },
                { model: Usuario, as: 'Profissional' },
                { model: Paciente }
            ]
        });
        if (transacao) {
            res.json(transacao);
        } else {
            res.status(404).json({ mensagem: "Transação não encontrada" });
        }
    } catch (erro) {
        res.status(500).json({ mensagem: "Erro ao buscar transação", erro: erro.message });
    }
};

exports.atualizarTransacao = async (req, res) => {
    try {
        const [atualizado] = await Financeiro.update(req.body, {
            where: { id: req.params.id }
        });
        if (atualizado) {
            const transacaoAtualizada = await Financeiro.findByPk(req.params.id);
            res.json(transacaoAtualizada);
        } else {
            res.status(404).json({ mensagem: "Transação não encontrada" });
        }
    } catch (erro) {
        res.status(500).json({ mensagem: "Erro ao atualizar transação", erro: erro.message });
    }
};

exports.deletarTransacao = async (req, res) => {
    try {
        const deletado = await Financeiro.destroy({
            where: { id: req.params.id }
        });
        if (deletado) {
            res.json({ mensagem: "Transação deletada com sucesso" });
        } else {
            res.status(404).json({ mensagem: "Transação não encontrada" });
        }
    } catch (erro) {
        res.status(500).json({ mensagem: "Erro ao deletar transação", erro: erro.message });
    }
};

exports.calcularComissao = async (req, res) => {
    try {
        const { agendamento_id } = req.params;
        const agendamento = await Agendamento.findByPk(agendamento_id, {
            include: [{ model: Servico }, { model: Usuario, as: 'Profissional' }]
        });

        if (!agendamento) {
            return res.status(404).json({ mensagem: "Agendamento não encontrado" });
        }

        const comissao = await ComissaoProfissional.findOne({
            where: {
                profissional_id: agendamento.profissional_id,
                servico_id: agendamento.servico_id
            }
        });

        if (!comissao) {
            return res.status(404).json({ mensagem: "Comissão não configurada para este profissional e serviço" });
        }

        const valorComissao = agendamento.Servico.preco * (comissao.percentual_comissao / 100);

        res.json({
            agendamento_id: agendamento.id,
            profissional_id: agendamento.profissional_id,
            servico_id: agendamento.servico_id,
            valor_servico: agendamento.Servico.preco,
            percentual_comissao: comissao.percentual_comissao,
            valor_comissao: valorComissao
        });
    } catch (erro) {
        res.status(500).json({ mensagem: "Erro ao calcular comissão", erro: erro.message });
    }
};