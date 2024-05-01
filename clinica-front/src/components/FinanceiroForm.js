import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Swal from 'sweetalert2';

function FinanceiroForm() {
    const [tipo, setTipo] = useState('');
    const [valor, setValor] = useState('');
    const [data, setData] = useState('');
    const [usuarioId, setUsuarioId] = useState(''); // Estado para o ID do usuário
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const novaTransacao = {
                tipo_transacao: tipo,
                valor: parseFloat(valor),
                data,
                usuario_id: usuarioId  // Adicionando o ID do usuário enviado
            };
            const response = await axios.post('http://localhost:3000/financeiro', novaTransacao);
            if (response.status === 201) {
                Swal.fire({
                    title: 'Sucesso!',
                    text: 'Transação adicionada com sucesso!',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
                navigate('/financeiro');
            } else {
                throw new Error('Resposta não esperada do servidor');
            }
        } catch (error) {
            console.error('Erro ao adicionar transação:', error);
            Swal.fire({
                title: 'Erro!',
                text: 'Não foi possível adicionar a transação.',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
    };

    return (
        <div className="flex">
            <NavBar />
            <div className="flex-1 p-10">
                <h1>Adicionar Nova Transação</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">Tipo:</label>
                        <select
                            id="tipo"
                            value={tipo}
                            onChange={e => setTipo(e.target.value)}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="">Selecione o tipo</option>
                            <option value="Receita">Receita</option>
                            <option value="Despesa">Despesa</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="valor" className="block text-sm font-medium text-gray-700">Valor:</label>
                        <input
                            type="number"
                            id="valor"
                            value={valor}
                            onChange={e => setValor(e.target.value)}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="data" className="block text-sm font-medium text-gray-700">Data:</label>
                        <input
                            type="date"
                            id="data"
                            value={data}
                            onChange={e => setData(e.target.value)}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="usuarioId" className="block text-sm font-medium text-gray-700">ID do Usuário:</label>
                        <input
                            type="text"
                            id="usuarioId"
                            value={usuarioId}
                            onChange={e => setUsuarioId(e.target.value)}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Adicionar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default FinanceiroForm;
