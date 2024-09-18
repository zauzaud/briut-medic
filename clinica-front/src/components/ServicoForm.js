import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function ServicoForm() {
    const [servico, setServico] = useState({ nome: '', duracao: '', preco: '', descricao: '' });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetchServico();
        }
    }, [id]);

    const fetchServico = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/servicos/${id}`);
            setServico(response.data);
        } catch (error) {
            console.error('Erro ao buscar serviço:', error);
        }
    };

    const handleChange = (e) => {
        setServico({ ...servico, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await axios.put(`http://localhost:3000/api/servicos/${id}`, servico);
            } else {
                await axios.post('http://localhost:3000/api/servicos', servico);
            }
            navigate('/servicos');
        } catch (error) {
            console.error('Erro ao salvar serviço:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="nome"
                value={servico.nome}
                onChange={handleChange}
                placeholder="Nome do Serviço"
                required
            />
            <input
                type="number"
                name="duracao"
                value={servico.duracao}
                onChange={handleChange}
                placeholder="Duração (minutos)"
                required
            />
            <input
                type="number"
                name="preco"
                value={servico.preco}
                onChange={handleChange}
                placeholder="Preço"
                step="0.01"
                required
            />
            <textarea
                name="descricao"
                value={servico.descricao}
                onChange={handleChange}
                placeholder="Descrição"
            />
            <button type="submit">{id ? 'Atualizar' : 'Criar'} Serviço</button>
        </form>
    );
}

export default ServicoForm;