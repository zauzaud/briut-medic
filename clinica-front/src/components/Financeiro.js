import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Registro de componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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

    const chartData = {
        labels: transacoes.map(t => new Date(t.data).toLocaleDateString('pt-BR')),
        datasets: [
            {
                label: 'Valor das Transações',
                data: transacoes.map(t => t.valor),
                backgroundColor: transacoes.map(t => t.tipo_transacao === 'Receita' ? 'rgba(75, 192, 192, 0.2)' : 'rgba(255, 99, 132, 0.2)'),
                borderColor: transacoes.map(t => t.tipo_transacao === 'Receita' ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)'),
                borderWidth: 1
            }
        ]
    };

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        maintainAspectRatio: false
    };

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
                <Link to="/financeiro/novo" className="btn btn-primary mb-4">Adicionar Nova Transação</Link>
                <div style={{ height: '400px', width: '100%' }}>
                    <Bar data={chartData} options={chartOptions} />
                </div>
                {transacoes.length ? (
                    <ul>
                        {transacoes.map(transacao => (
                            <li key={transacao.id}>
                                Transação ID: {transacao.id}, Tipo: {transacao.tipo_transacao}, Valor: R$ {transacao.valor}, Data: {new Date(transacao.data).toLocaleDateString('pt-BR')}, Usuário ID: {transacao.usuario_id}
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
