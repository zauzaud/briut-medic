import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UsuarioForm from './UsuarioForm';
import NavBar from './NavBar';

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
        setUsuarioEditando({ nome: '', tipo: '' }); // para novo usuário
    };

    const resetForm = () => {
        setUsuarioEditando(null);
        fetchUsuarios();
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
                        <button onClick={handleAddNew}>Adicionar Novo Usuário</button>
                        <ul>
                            {usuarios.map(usuario => (
                                <li key={usuario.id}>
                                    ID: {usuario.id}, Nome: {usuario.nome}, Tipo: {usuario.tipo}
                                    <button onClick={() => handleEdit(usuario)}>Editar</button>
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
