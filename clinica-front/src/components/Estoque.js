import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EstoqueForm from './EstoqueForm';
import NavBar from './NavBar';
import Swal from 'sweetalert2';

function Estoque() {
    const [estoque, setEstoque] = useState([]);
    const [itemEditando, setItemEditando] = useState(null);

    useEffect(() => {
        fetchEstoque();
    }, []);

    const fetchEstoque = () => {
        axios.get('http://localhost:3000/estoque')
            .then(response => {
                setEstoque(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar itens do estoque:', error);
                Swal.fire('Erro', 'Falha ao buscar dados do estoque', 'error');
            });
    };

    const handleEdit = item => {
        setItemEditando(item);
    };

    const handleAddNew = () => {
        setItemEditando({ nome_item: '', quantidade: '', data_validade: '', fornecedor: '' });
    };

    const resetForm = () => {
        setItemEditando(null);
        fetchEstoque();
    };

    const handleDelete = id => {
        Swal.fire({
            title: 'Tem certeza?',
            text: "Você não poderá reverter isso!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, delete isso!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3000/estoque/${id}`)
                    .then(() => {
                        fetchEstoque();
                        Swal.fire('Deletado!', 'O item foi removido.', 'success');
                    })
                    .catch(error => {
                        console.error('Erro ao deletar item do estoque', error);
                        Swal.fire('Erro', 'Não foi possível deletar o item', 'error');
                    });
            }
        });
    };

    return (
        <div className="flex">
            <NavBar />
            <div className="flex-1 p-10">
                <h1>Estoque</h1>
                {itemEditando ? (
                    <EstoqueForm item={itemEditando} onFormSubmit={resetForm} />
                ) : (
                    <>
                        <button onClick={handleAddNew} className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Adicionar Item
                        </button>
                        <ul className="space-y-4">
                            {estoque.map(item => (
                                <li key={item.id} className="bg-white p-3 shadow rounded-lg flex justify-between items-center">
                                    <div>
                                        <p>Nome: {item.nome_item}</p>
                                        <p>Quantidade: {item.quantidade}</p>
                                        <p>Validade: {item.data_validade ? new Date(item.data_validade).toLocaleDateString() : 'N/A'}</p>
                                        <p>Fornecedor: {item.fornecedor || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <button onClick={() => handleEdit(item)} className="ml-4 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
                                            Editar
                                        </button>
                                        <button onClick={() => handleDelete(item.id)} className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                                            Deletar
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
}

export default Estoque;