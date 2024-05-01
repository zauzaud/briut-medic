import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UsuarioForm from './UsuarioForm';
import NavBar from './NavBar';
import Swal from 'sweetalert2';

function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioEditando, setUsuarioEditando] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const fetchUsuarios = () => {
        axios.get('http://localhost:3000/usuarios')
            .then(response => {
                setUsuarios(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao buscar usuários:', error);
                setError('Falha ao buscar dados dos usuários');
                setLoading(false);
            });
    };

    const handleEdit = usuario => {
        setUsuarioEditando(usuario);
    };

    const handleAddNew = () => {
        setUsuarioEditando({ nome: '', tipo: '' });
    };

    const resetForm = () => {
        setUsuarioEditando(null);
        fetchUsuarios();
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
                axios.delete(`http://localhost:3000/usuarios/${id}`)
                    .then(() => {
                        fetchUsuarios();
                        Swal.fire('Deletado!', 'O usuário foi removido.', 'success');
                    })
                    .catch(error => {
                        console.error('Erro ao deletar usuário', error);
                        Swal.fire('Erro', 'Não foi possível deletar o usuário', 'error');
                    });
            }
        });
    };

    if (loading) return <div className="flex-1 p-10">Carregando usuários...</div>;
    if (error) return <div className="flex-1 p-10 text-red-500">{error}</div>;

    return (
        <div className="flex">
            <NavBar />
            <div className="flex-1 p-10">
                <h1>Usuários</h1>
                {usuarioEditando ? (
                    <UsuarioForm usuario={usuarioEditando} onFormSubmit={resetForm} />
                ) : (
                    <>
                        <button onClick={handleAddNew} className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Adicionar Usuário
                        </button>
                        <ul className="space-y-4">
                            {usuarios.map(usuario => (
                                <li key={usuario.id} className="bg-white p-3 shadow rounded-lg flex justify-between items-center">
                                    ID: {usuario.id}, Nome: {usuario.nome}, Tipo: {usuario.tipo}
                                    <div>
                                        <button onClick={() => handleEdit(usuario)} className="ml-4 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
                                            Editar
                                        </button>
                                        <button onClick={() => handleDelete(usuario.id)} className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
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

export default Usuarios;
