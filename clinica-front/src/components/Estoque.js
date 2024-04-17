import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import './Estoque.css';

function Estoque() {
    const [estoque, setEstoque] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/estoque')
            .then(response => {
                setEstoque(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar estoque:', error);
            });
    }, []);

    return (
        <div>
            <NavBar />
            <div className="estoque-container">
                <h1>Estoque</h1>
                <ul>
                    {estoque.map(item => (
                        <li key={item.id}>{item.produto} - {item.quantidade}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Estoque;
