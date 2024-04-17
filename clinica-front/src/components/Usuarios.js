import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import './Usuarios.css';

function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/usuarios')
            .then(response => {
                setUsuarios(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar usuários:', error);
            });
    }, []);

    return (
        <div>
            <NavBar />
            <div className="usuarios-container">
                <h1>Usuários</h1>
                <ul>
                    {usuarios.map(usuario => (
                        <li key={usuario.id}>{usuario.nome} - {usuario.tipo}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Usuarios;
