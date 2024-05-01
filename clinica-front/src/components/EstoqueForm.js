import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function EstoqueForm({ item, onFormSubmit }) {
    const [produto, setProduto] = useState(item.produto || '');
    const [quantidade, setQuantidade] = useState(item.quantidade || '');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const itemData = { produto, quantidade };
            if (item.id) {
                await axios.put(`http://localhost:3000/estoque/${item.id}`, itemData);
            } else {
                await axios.post('http://localhost:3000/estoque', itemData);
            }
            onFormSubmit();
            Swal.fire('Sucesso!', 'Item atualizado no estoque.', 'success');
        } catch (error) {
            console.error('Erro ao salvar o item', error);
            Swal.fire('Erro!', 'Erro ao salvar o item. Por favor, tente novamente.', 'error');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
            <div>
                <label htmlFor="produto" className="block text-sm font-medium text-gray-700">Produto:</label>
                <input
                    type="text"
                    id="produto"
                    value={produto}
                    onChange={e => setProduto(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            <div>
                <label htmlFor="quantidade" className="block text-sm font-medium text-gray-700">Quantidade:</label>
                <input
                    type="number"
                    id="quantidade"
                    value={quantidade}
                    onChange={e => setQuantidade(parseInt(e.target.value))}
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Salvar
            </button>
        </form>
    );
}

export default EstoqueForm;
