const Anamnese = require('../models/Anamnese');

exports.criarAnamnese = async (req, res) => {
    try {
        const novaAnamnese = await Anamnese.create(req.body);
        res.status(201).json(novaAnamnese);
    } catch (erro) {
        res.status(400).json({ mensagem: "Erro ao criar anamnese", erro: erro.message });
    }
};

exports.buscarAnamnesePorPaciente = async (req, res) => {
    try {
        const anamnese = await Anamnese.findOne({ where: { paciente_id: req.params.pacienteId } });
        if (anamnese) {
            res.json(anamnese);
        } else {
            res.status(404).json({ mensagem: "Anamnese não encontrada para este paciente" });
        }
    } catch (erro) {
        res.status(500).json({ mensagem: "Erro ao buscar anamnese", erro: erro.message });
    }
};

exports.atualizarAnamnese = async (req, res) => {
    try {
        const [atualizado] = await Anamnese.update(req.body, {
            where: { id: req.params.id }
        });
        if (atualizado) {
            const anamneseAtualizada = await Anamnese.findByPk(req.params.id);
            res.json(anamneseAtualizada);
        } else {
            res.status(404).json({ mensagem: "Anamnese não encontrada" });
        }
    } catch (erro) {
        res.status(500).json({ mensagem: "Erro ao atualizar anamnese", erro: erro.message });
    }

    
};

exports.listarTodasAnamneses = async (req, res) => {
    try {
        const anamneses = await Anamnese.findAll({
            include: [{ model: Paciente, attributes: ['nome'] }]
        });
        res.json(anamneses);
    } catch (erro) {
        res.status(500).json({ mensagem: "Erro ao listar anamneses", erro: erro.message });
    }
};

