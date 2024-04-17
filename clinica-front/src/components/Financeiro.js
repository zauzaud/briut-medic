import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import './Financeiro.css';

function Financeiro() {
    const [transacoes, setTransacoes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/financeiro')
            .then(response => {
                setTransacoes(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar transações financeiras:', error);
            });
    }, []);

    return (
        <div>
            <NavBar />
            <div className="financeiro-container">
                <h1>Financeiro</h1>
                <ul>
                    {transacoes.map(transacao => (
                        <li key={transacao.id}>
                            {transacao.tipo_transacao} - ${transacao.valor} - {transacao.data}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Financeiro;
