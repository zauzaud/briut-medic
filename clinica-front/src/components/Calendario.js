import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import NavBar from './NavBar';
import { Calendar } from 'primereact/calendar';
import 'primeflex/primeflex.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function Calendario() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:3000/agendamentos');
            const formattedEvents = response.data.map(e => ({
                ...e,
                start: new Date(e.data_hora),
                end: new Date(e.data_hora_fim || e.data_hora),
                title: e.servico
            }));
            setEvents(formattedEvents);
        } catch (error) {
            console.error('Erro ao buscar eventos:', error);
        }
    };

    const handleDateSelect = (e) => {
        // Formatar a data e hora para garantir que está no fuso horário local correto
        const isoStart = new Date(e.value).toLocaleString('sv-SE', { timeZone: 'America/Sao_Paulo' }).replace(' ', 'T');
        const isoEnd = new Date(e.value).toLocaleString('sv-SE', { timeZone: 'America/Sao_Paulo' }).replace(' ', 'T');
        const inputs = `
            <input type="text" id="titulo" class="swal2-input" value="" placeholder="Título">
            <input type="datetime-local" id="dataInicio" class="swal2-input" value="${isoStart}">
            <input type="datetime-local" id="dataFim" class="swal2-input" value="${isoEnd}">
            <input type="number" id="usuarioId" class="swal2-input" placeholder="Usuário ID">
            <input type="text" id="servico" class="swal2-input" placeholder="Serviço">
            <select id="status" class="swal2-input">
                <option value="agendado">Agendado</option>
                <option value="concluido">Concluído</option>
                <option value="cancelado">Cancelado</option>
            </select>
        `;
    
        Swal.fire({
            title: 'Adicionar Novo Evento',
            html: inputs,
            confirmButtonText: 'Salvar',
            focusConfirm: false,
            preConfirm: () => {
                const event = {
                    titulo: document.getElementById('titulo').value,
                    data_hora: document.getElementById('dataInicio').value,
                    data_hora_fim: document.getElementById('dataFim').value,
                    usuario_id: document.getElementById('usuarioId').value,
                    servico: document.getElementById('servico').value,
                    status: document.getElementById('status').value
                };
                return event;
            }
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post('http://localhost:3000/agendamentos', result.value)
                    .then(() => {
                        fetchEvents();
                        Swal.fire('Adicionado!', 'Seu evento foi adicionado.', 'success');
                    })
                    .catch(error => {
                        console.error('Erro ao adicionar evento:', error);
                        Swal.fire('Erro!', 'Houve um erro ao adicionar o evento.', 'error');
                    });
            }
        });
    };

    return (
        <div className="flex">
            <NavBar />
            <div className='flex-1 p-10'>
                <Calendar inline selectOtherMonths={true} onSelect={handleDateSelect} />
            </div>
        </div>
    );
}

export default Calendario;
