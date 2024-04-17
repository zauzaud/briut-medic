// src/components/Agendamentos.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import './Agendamentos.css';

function Agendamentos() {
    const [agendamentos, setAgendamentos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/agendamentos')
            .then(response => {
                setAgendamentos(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar agendamentos:', error);
            });
    }, []);

    return (
        <div>
            <NavBar />
            <div className="agendamentos-container">
                <h1>Agendamentos</h1>
                <ul>
                    {agendamentos.map(agendamento => (
                        <li key={agendamento.id}>
                            {agendamento.data_hora} - {agendamento.servico} - {agendamento.status}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Agendamentos;
