import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import NavBar from './NavBar';

function ServicoForm() {
    const [servicos, setServicos] = useState([]);
    const [novoServico, setNovoServico] = useState({ nome: '', duracao: '', preco: '' });

    useEffect(() => {
        fetchServicos();
    }, []);

    const fetchServicos = async () => {
        try {
            const response = await axios.get('http://localhost:3000/servicos');
            setServicos(response.data);
        } catch (error) {
            console.error('Erro ao buscar serviços:', error);
            Swal.fire('Erro', 'Não foi possível carregar os serviços', 'error');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNovoServico({ ...novoServico, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/servicos', novoServico);
            Swal.fire('Sucesso', 'Serviço adicionado com sucesso', 'success');
            setNovoServico({ nome: '', duracao: '', preco: '' });
            fetchServicos();
        } catch (error) {
            console.error('Erro ao adicionar serviço:', error);
            Swal.fire('Erro', 'Não foi possível adicionar o serviço', 'error');
        }
    };

    return (
        <div className="flex">
            <NavBar />
            <div className="flex-1 p-10">
                <h1 className="text-2xl font-bold mb-4">Gerenciar Serviços</h1>
                <form onSubmit={handleSubmit} className="mb-8">
                    <input
                        type="text"
                        name="nome"
                        value={novoServico.nome}
                        onChange={handleInputChange}
                        placeholder="Nome do serviço"
                        className="mr-2 p-2 border rounded"
                    />
                    <input
                        type="number"
                        name="duracao"
                        value={novoServico.duracao}
                        onChange={handleInputChange}
                        placeholder="Duração (minutos)"
                        className="mr-2 p-2 border rounded"
                    />
                    <input
                        type="number"
                        name="preco"
                        value={novoServico.preco}
                        onChange={handleInputChange}
                        placeholder="Preço"
                        className="mr-2 p-2 border rounded"
                    />
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded">Adicionar Serviço</button>
                </form>
                <h2 className="text-xl font-bold mb-2">Serviços Existentes</h2>
                <ul>
                    {servicos.map(servico => (
                        <li key={servico.id} className="mb-2">
                            {servico.nome} - {servico.duracao} minutos - R$ {servico.preco}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ServicoForm;