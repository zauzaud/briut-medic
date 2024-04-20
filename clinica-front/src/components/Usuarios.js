import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar';

function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true); // Adicionando estado para controle de carregamento
    const [error, setError] = useState(''); // Adicionando estado para erro

    useEffect(() => {
        axios.get('http://localhost:3000/usuarios')
            .then(response => {
                setUsuarios(response.data);
                setLoading(false); // Desativa o estado de carregamento quando os dados são recebidos
            })
            .catch(error => {
                console.error('Erro ao buscar usuários:', error);
                setError('Falha ao buscar dados dos usuários'); // Define mensagem de erro
                setLoading(false); // Desativa o estado de carregamento em caso de erro
            });
    }, []);

    // Renderiza um spinner ou mensagem de carregamento enquanto os dados estão sendo buscados
    if (loading) {
        return <div className="flex-1 p-10">Carregando usuários...</div>;
    }

    // Renderiza uma mensagem de erro se um erro ocorrer durante a busca de dados
    if (error) {
        return <div className="flex-1 p-10 text-red-500">{error}</div>;
    }

    return (
        <div className="flex">
            <NavBar />
            <div className="flex-1 p-10">
                <h1 className="text-2xl font-bold mb-4">Usuários</h1>
                <ul>
                    {usuarios.map(usuario => (
                         <li key={usuario.id}>
                         ID: {usuario.id}, Nome: {usuario.nome}, Tipo: {usuario.tipo}
                     </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Usuarios;
