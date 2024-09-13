// clinica-backend/src/controllers/pacienteController.js
const Paciente = require('../models/Paciente');

exports.criarPaciente = async (req, res) => {
    try {
        const novoPaciente = await Paciente.create(req.body);
        res.status(201).json(novoPaciente);
    } catch (erro) {
        res.status(400).json({ mensagem: "Erro ao criar paciente", erro: erro.message });
    }
};

exports.listarPacientes = async (req, res) => {
    try {
        const pacientes = await Paciente.findAll();
        res.json(pacientes);
    } catch (erro) {
        res.status(500).json({ mensagem: "Erro ao listar pacientes", erro: erro.message });
    }
};

exports.buscarPacientePorId = async (req, res) => {
    try {
        const paciente = await Paciente.findByPk(req.params.id);
        if (paciente) {
            res.json(paciente);
        } else {
            res.status(404).json({ mensagem: "Paciente não encontrado" });
        }
    } catch (erro) {
        res.status(500).json({ mensagem: "Erro ao buscar paciente", erro: erro.message });
    }
};

exports.atualizarPaciente = async (req, res) => {
    try {
        const [atualizado] = await Paciente.update(req.body, {
            where: { id: req.params.id }
        });
        if (atualizado) {
            const pacienteAtualizado = await Paciente.findByPk(req.params.id);
            res.json(pacienteAtualizado);
        } else {
            res.status(404).json({ mensagem: "Paciente não encontrado" });
        }
    } catch (erro) {
        res.status(500).json({ mensagem: "Erro ao atualizar paciente", erro: erro.message });
    }
};

exports.deletarPaciente = async (req, res) => {
    try {
        const deletado = await Paciente.destroy({
            where: { id: req.params.id }
        });
        if (deletado) {
            res.json({ mensagem: "Paciente deletado com sucesso" });
        } else {
            res.status(404).json({ mensagem: "Paciente não encontrado" });
        }
    } catch (erro) {
        res.status(500).json({ mensagem: "Erro ao deletar paciente", erro: erro.message });
    }
};