import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import NavBar from './NavBar';

function Calendario() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:3000/agendamentos');
            setEvents(response.data.map(e => ({
                ...e,
                title: e.servico,
                start: e.data_hora,
                end: e.data_hora,
                allDay: true
            })));
        } catch (error) {
            console.error('Erro ao buscar eventos:', error);
        }
    };

    const handleDateClick = (arg) => {
        // Formatar data e hora para os inputs
        const dateStr = arg.dateStr; // Data no formato YYYY-MM-DD
        const defaultStartTime = `${dateStr}T09:00`; // Supõe um horário de início padrão
        const defaultEndTime = `${dateStr}T10:00`; // Supõe um horário de término padrão
    
        const inputs = `
            <input type="text" id="title" class="swal2-input" placeholder="Título">
            <input type="datetime-local" id="start" class="swal2-input" value="${defaultStartTime}">
            <input type="datetime-local" id="end" class="swal2-input" value="${defaultEndTime}">
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
                return {
                    title: document.getElementById('title').value,
                    start: document.getElementById('start').value,
                    end: document.getElementById('end').value,
                    usuario_id: document.getElementById('usuarioId').value,
                    servico: document.getElementById('servico').value,
                    status: document.getElementById('status').value
                }
            }
        }).then((result) => {
            if (result.isConfirmed && result.value.title) {
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
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    events={events}
                    dateClick={handleDateClick}
                    editable={true}
                    selectable={true}
                />
            </div>
        </div>
    );
}

export default Calendario;
