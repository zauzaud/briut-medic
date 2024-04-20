import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar';

function Financeiro() {
    const [transacoes, setTransacoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3000/financeiro')
            .then(response => {
                setTransacoes(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao buscar transações:', error);
                setError('Falha ao buscar dados financeiros');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Carregando dados financeiros...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="flex">
            <NavBar />
            <div className="flex-1 p-10">
                <h1>Financeiro</h1>
                {transacoes.length ? (
                    <ul>
                        {transacoes.map(transacao => (
                            <li key={transacao.id}>
                            Transação ID: {transacao.id}, Tipo: {transacao.tipo_transacao}, Valor: R$ {transacao.valor}, Data: {new Date(transacao.data).toLocaleDateString()}, Usuário ID: {transacao.usuario_id}
                        </li>
                        ))}
                    </ul>
                ) : (
                    <div>Não há transações registradas.</div>
                )}
            </div>
        </div>
    );
}

export default Financeiro;

