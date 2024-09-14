const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

function gerarSenhaAleatoria(tamanho = 8) {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let resultado = '';
    for (let i = 0; i < tamanho; i++) {
        resultado += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return resultado;
}

exports.criarUsuario = async (req, res) => {
    try {
        const { nome, email, tipo } = req.body;
        
        // Gera uma senha aleatória
        const senhaTemporaria = gerarSenhaAleatoria();
        
        // Hash da senha temporária
        const senhaHash = await bcrypt.hash(senhaTemporaria, 10);

        const novoUsuario = await Usuario.create({
            nome,
            email,
            senha: senhaHash,
            tipo
        });

        // Remove a senha do objeto de resposta
        const { senha, ...usuarioSemSenha } = novoUsuario.toJSON();

        // Envia a resposta com a senha temporária
        res.status(201).json({
            ...usuarioSemSenha,
            senhaTemporaria: senhaTemporaria // Inclui a senha temporária na resposta
        });
    } catch (erro) {
        console.error('Erro ao criar usuário:', erro);
        if (erro.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ mensagem: "Email já está em uso" });
        }
        res.status(500).json({ mensagem: "Erro ao criar usuário", erro: erro.message });
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
