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
exports.listarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (erro) {
        res.status(500).json({ mensagem: "Erro ao listar usuários", erro: erro.message });
    }
};

// buscando um usuário por ID
exports.buscarUsuarioPorId = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).json({ mensagem: "Usuário não encontrado" });
        }
    } catch (erro) {
        res.status(500).json({ mensagem: "Erro ao buscar usuário", erro: erro.message });
    }
};

// atualiza um usuário
exports.atualizarUsuario = async (req, res) => {
    try {
        const [atualizado] = await Usuario.update(req.body, {
            where: { id: req.params.id }
        });
        if (atualizado) {
            const usuarioAtualizado = await Usuario.findByPk(req.params.id);
            res.json(usuarioAtualizado);
        } else {
            res.status(404).json({ mensagem: "Usuário não encontrado" });
        }
    } catch (erro) {
        res.status(500).json({ mensagem: "Erro ao atualizar usuário", erro: erro.message });
    }
};

exports.deletarUsuario = async (req, res) => {
    try {
        const deletado = await Usuario.destroy({
            where: { id: req.params.id }
        });
        if (deletado) {
            res.json({ mensagem: "Usuário deletado com sucesso" });
        } else {
            res.status(404).json({ mensagem: "Usuário não encontrado" });
        }
    } catch (erro) {
        res.status(500).json({ mensagem: "Erro ao deletar usuário", erro: erro.message });
    }
};