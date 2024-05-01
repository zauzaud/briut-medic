const Usuario = require('../models/Usuario');

// cria um novo usuário usando o método com transação
exports.criarUsuario = async (req, res) => {
    try {
        const novoUsuario = await Usuario.criarComTransacao({
            nome: req.body.nome,
            tipo: req.body.tipo
        });
        res.status(201).send(novoUsuario);
    } catch (erro) {
        res.status(500).send({ mensagem: "Erro ao criar usuário", erro });
    }
};


// lista todos os usuários
exports.listarTodosUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.send(usuarios);
    } catch (erro) {
        res.status(500).send(erro);
    }
};

// buscando um usuário por ID
exports.buscarUsuarioPorId = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (usuario) {
            res.send(usuario);
        } else {
            res.status(404).send({ mensagem: "Usuário não encontrado." });
        }
    } catch (erro) {
        res.status(500).send(erro);
    }
};

// atualiza um usuário
exports.atualizarUsuario = async (req, res) => {
    try {
        const atualizado = await Usuario.update(req.body, {
            where: { id: req.params.id }
        });
        if (atualizado[0] === 1) {
            res.send({ mensagem: "Usuário atualizado com sucesso." });
        } else {
            res.status(404).send({ mensagem: "Usuário não encontrado ou dados inválidos para atualização." });
        }
    } catch (erro) {
        res.status(500).send(erro);
    }
};

// excluindo
exports.excluirUsuario = async (req, res) => {
    try {
        const deletado = await Usuario.destroy({
            where: { id: req.params.id }
        });
        if (deletado === 1) {
            res.send({ mensagem: "Usuário excluído com sucesso." });
        } else {
            res.status(404).send({ mensagem: "Usuário não encontrado." });
        }
    } catch (erro) {
        res.status(500).send(erro);
    }
};
