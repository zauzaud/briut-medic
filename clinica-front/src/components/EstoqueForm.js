import React, { useState } from 'react';
   import axios from 'axios';
   import Swal from 'sweetalert2';

   function EstoqueForm({ item, onFormSubmit }) {
    const [nomeItem, setNomeItem] = useState(item?.nome_item || '');
    const [quantidade, setQuantidade] = useState(item?.quantidade || '');
    const [dataValidade, setDataValidade] = useState(item?.data_validade ? item.data_validade.split('T')[0] : '');
    const [fornecedor, setFornecedor] = useState(item?.fornecedor || '');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const itemData = {
                nome_item: nomeItem,
                quantidade: parseInt(quantidade),
                data_validade: dataValidade || null,
                fornecedor: fornecedor || null
            };
            if (item?.id) {
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
           <label htmlFor="nomeItem" className="block text-sm font-medium text-gray-700">Nome do Item:</label>
           <input
             type="text"
             id="nomeItem"
             value={nomeItem}
             onChange={e => setNomeItem(e.target.value)}
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
             onChange={e => setQuantidade(e.target.value)}
             required
             className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
           />
         </div>
         <div>
           <label htmlFor="dataValidade" className="block text-sm font-medium text-gray-700">Data de Validade:</label>
           <input
             type="date"
             id="dataValidade"
             value={dataValidade}
             onChange={e => setDataValidade(e.target.value)}
             className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
           />
         </div>
         <div>
           <label htmlFor="fornecedor" className="block text-sm font-medium text-gray-700">Fornecedor:</label>
           <input
             type="text"
             id="fornecedor"
             value={fornecedor}
             onChange={e => setFornecedor(e.target.value)}
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