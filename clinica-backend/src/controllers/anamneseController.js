const { sequelize, Anamnese, AnamneseRespostas } = require('../models');

exports.criarAnamnese = async (req, res) => {
    const t = await sequelize.transaction();

    try {
        const { paciente_id, tipo_anamnese, respostas } = req.body;
        const anamnese = await Anamnese.create({ paciente_id, tipo_anamnese }, { transaction: t });

        for (const [pergunta, resposta] of Object.entries(respostas)) {
            await AnamneseRespostas.create({
                anamnese_id: anamnese.id,
                pergunta,
                resposta
            }, { transaction: t });
        }

        await t.commit();

        const anamneseCompleta = await Anamnese.findByPk(anamnese.id, {
            include: [{ model: AnamneseRespostas, as: 'AnamneseRespostas' }]
        });

        res.status(201).json(anamneseCompleta);
    } catch (erro) {
        await t.rollback();
        console.error('Erro ao criar anamnese:', erro);
        res.status(400).json({ mensagem: "Erro ao criar anamnese", erro: erro.message });
    }
};

exports.buscarAnamnesesPorPaciente = async (req, res) => {
    try {
        const anamneses = await Anamnese.findAll({
            where: { paciente_id: req.params.pacienteId },
            include: [{ model: AnamneseRespostas, as: 'AnamneseRespostas' }]
        });
        console.log('Anamneses do paciente encontradas:', anamneses);
        res.json(anamneses);
    } catch (erro) {
        console.error('Erro ao buscar anamneses do paciente:', erro);
        res.status(500).json({ mensagem: "Erro ao buscar anamneses", erro: erro.message });
    }
};

exports.excluirAnamnese = async (req, res) => {
    try {
        const t = await sequelize.transaction();

        try {
            
            await AnamneseRespostas.destroy({
                where: { anamnese_id: req.params.id },
                transaction: t
            });

            
            const resultado = await Anamnese.destroy({
                where: { id: req.params.id },
                transaction: t
            });

            await t.commit();

            if (resultado === 1) {
                res.json({ mensagem: "Anamnese excluída com sucesso." });
            } else {
                res.status(404).json({ mensagem: "Anamnese não encontrada." });
            }
        } catch (erro) {
            await t.rollback();
            throw erro;
        }
    } catch (erro) {
        console.error('Erro ao excluir anamnese:', erro);
        res.status(500).json({ mensagem: "Erro ao excluir anamnese", erro: erro.message });
    }
};

exports.atualizarAnamnese = async (req, res) => {
    const t = await sequelize.transaction();

    try {
        const { tipo_anamnese, respostas } = req.body;
        const [atualizado] = await Anamnese.update({ tipo_anamnese }, {
            where: { id: req.params.id },
            transaction: t
        });

        if (atualizado) {
            // Remove respostas existentes
            await AnamneseRespostas.destroy({
                where: { anamnese_id: req.params.id },
                transaction: t
            });

            // Adiciona novas respostas
            for (const [pergunta, resposta] of Object.entries(respostas)) {
                await AnamneseRespostas.create({
                    anamnese_id: req.params.id,
                    pergunta,
                    resposta
                }, { transaction: t });
            }

            await t.commit();

            const anamneseAtualizada = await Anamnese.findByPk(req.params.id, {
                include: [{ model: AnamneseRespostas }]
            });
            res.json(anamneseAtualizada);
        } else {
            await t.rollback();
            res.status(404).json({ mensagem: "Anamnese não encontrada" });
        }
    } catch (erro) {
        await t.rollback();
        console.error('Erro ao atualizar anamnese:', erro);
        res.status(500).json({ mensagem: "Erro ao atualizar anamnese", erro: erro.message });
    }
};

exports.listarTodasAnamneses = async (req, res) => {
    try {
        const anamneses = await Anamnese.findAll({
            include: [{ model: AnamneseRespostas, as: 'AnamneseRespostas' }]
        });
        console.log('Anamneses encontradas:', anamneses);
        res.json(anamneses);
    } catch (erro) {
        console.error('Erro ao listar anamneses:', erro);
        res.status(500).json({ mensagem: "Erro ao listar anamneses", erro: erro.message });
    }
};