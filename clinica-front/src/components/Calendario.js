import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import NavBar from './NavBar';

function Calendario() {
    const [events, setEvents] = useState([]);

    const adjustTimezone = (date) => {
        const offset = date.getTimezoneOffset();
        return new Date(date.getTime() - (offset * 60 * 1000));
    };

    const fetchEvents = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:3000/agendamentos');
            const formattedEvents = response.data.map(e => {
                const start = adjustTimezone(new Date(e.data_hora));
                const end = adjustTimezone(new Date(e.data_hora_fim));
                return {
                    id: e.id,
                    title: `${e.servico} - Paciente: ${e.paciente_id}`,
                    start: start,
                    end: end,
                    extendedProps: {
                        paciente_id: e.paciente_id,
                        medico_id: e.medico_id,
                        status: e.status,
                        observacoes: e.observacoes
                    }
                };
            });
            setEvents(formattedEvents);
        } catch (error) {
            console.error('Erro ao buscar eventos:', error);
        }
    }, []);

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    const handleEventClick = (clickInfo) => {
        Swal.fire({
            title: 'Ações do Agendamento',
            text: "O que você gostaria de fazer com este agendamento?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Editar',
            cancelButtonText: 'Deletar'
        }).then((result) => {
            if (result.isConfirmed) {
                handleEditAppointment(clickInfo.event);
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                handleDeleteAppointment(clickInfo.event.id);
            }
        });
    };

    const handleDateClick = (dateClickInfo) => {
        const adjustedDate = adjustTimezone(dateClickInfo.date);
        handleAddAppointment(adjustedDate);
    };

    const handleAddAppointment = (date) => {
        const formattedDate = date.toISOString().slice(0, 16);
        Swal.fire({
            title: 'Adicionar Novo Agendamento',
            html: `
                <input id="paciente_id" class="swal2-input" placeholder="ID do Paciente">
                <input id="medico_id" class="swal2-input" placeholder="ID do Médico">
                <input id="servico" class="swal2-input" placeholder="Serviço">
                <input id="data_hora" class="swal2-input" type="datetime-local" value="${formattedDate}">
                <select id="status" class="swal2-select">
                    <option value="agendado">Agendado</option>
                    <option value="confirmado">Confirmado</option>
                    <option value="concluido">Concluído</option>
                    <option value="cancelado">Cancelado</option>
                </select>
                <textarea id="observacoes" class="swal2-textarea" placeholder="Observações"></textarea>
            `,
            focusConfirm: false,
            preConfirm: () => {
                const inputDate = new Date(document.getElementById('data_hora').value);
                const adjustedDate = adjustTimezone(inputDate);
                const endDate = new Date(adjustedDate.getTime() + 30 * 60000); // 30 minutos após o início
                return {
                    paciente_id: document.getElementById('paciente_id').value,
                    medico_id: document.getElementById('medico_id').value,
                    servico: document.getElementById('servico').value,
                    data_hora: adjustedDate.toISOString(),
                    data_hora_fim: endDate.toISOString(),
                    status: document.getElementById('status').value,
                    observacoes: document.getElementById('observacoes').value
                };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                if (checkOverlap(result.value)) {
                    Swal.fire('Erro', 'Já existe um agendamento neste horário', 'error');
                } else {
                    axios.post('http://localhost:3000/agendamentos', result.value)
                        .then(response => {
                            fetchEvents();
                            Swal.fire('Sucesso', 'Agendamento criado com sucesso!', 'success');
                        })
                        .catch(error => {
                            console.error('Erro detalhado ao criar agendamento:', error.response ? error.response.data : error.message);
                            Swal.fire('Erro', `Não foi possível criar o agendamento: ${error.response ? error.response.data : error.message}`, 'error');
                        });
                }
            }
        });
    };

    const handleEditAppointment = (event) => {
        Swal.fire({
            title: 'Editar Agendamento',
            html: `
                <input id="servico" class="swal2-input" value="${event.title.split(' - ')[0]}" placeholder="Serviço">
                <input id="data_hora" class="swal2-input" type="datetime-local" value="${event.start.toISOString().slice(0, 16)}">
                <select id="status" class="swal2-select">
                    <option value="agendado" ${event.extendedProps.status === 'agendado' ? 'selected' : ''}>Agendado</option>
                    <option value="confirmado" ${event.extendedProps.status === 'confirmado' ? 'selected' : ''}>Confirmado</option>
                    <option value="concluido" ${event.extendedProps.status === 'concluido' ? 'selected' : ''}>Concluído</option>
                    <option value="cancelado" ${event.extendedProps.status === 'cancelado' ? 'selected' : ''}>Cancelado</option>
                </select>
            `,
            focusConfirm: false,
            preConfirm: () => {
                const inputDate = new Date(document.getElementById('data_hora').value);
                const adjustedDate = adjustTimezone(inputDate);
                return {
                    servico: document.getElementById('servico').value,
                    data_hora: adjustedDate.toISOString(),
                    status: document.getElementById('status').value
                };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                axios.put(`http://localhost:3000/agendamentos/${event.id}`, result.value)
                    .then(response => {
                        fetchEvents();
                        Swal.fire('Sucesso', 'Agendamento atualizado com sucesso!', 'success');
                    })
                    .catch(error => {
                        console.error('Erro ao atualizar agendamento:', error);
                        Swal.fire('Erro', 'Não foi possível atualizar o agendamento', 'error');
                    });
            }
        });
    };

    const handleDeleteAppointment = (eventId) => {
        Swal.fire({
            title: 'Tem certeza?',
            text: "Você não poderá reverter esta ação!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, delete!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3000/agendamentos/${eventId}`)
                    .then(() => {
                        fetchEvents();
                        Swal.fire('Deletado!', 'O agendamento foi removido.', 'success');
                    })
                    .catch(error => {
                        console.error('Erro ao deletar agendamento:', error);
                        Swal.fire('Erro', 'Não foi possível deletar o agendamento', 'error');
                    });
            }
        });
    };

    const checkOverlap = (newEvent) => {
        const newStart = new Date(newEvent.data_hora);
        const newEnd = new Date(newStart.getTime() + 30 * 60000); // Assumindo consultas de 30 minutos

        return events.some(existingEvent => {
            const existingStart = new Date(existingEvent.start);
            const existingEnd = new Date(existingEvent.end);

            return (newStart < existingEnd && newEnd > existingStart);
        });
    };

    return (
        <div className="flex">
            <NavBar />
            <div className='flex-1 p-10'>
                <FullCalendar
                    plugins={[timeGridPlugin, interactionPlugin]}
                    initialView="timeGridWeek"
                    slotMinTime="08:00:00"
                    slotMaxTime="18:00:00"
                    allDaySlot={false}
                    weekends={true}
                    events={events}
                    eventClick={handleEventClick}
                    dateClick={handleDateClick}
                    eventOverlap={false}
                    slotDuration="00:30:00"
                    locale={ptBrLocale}
                    timeZone='local'
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'timeGridWeek,timeGridDay'
                    }}
                />
            </div>
        </div>
    );
}

export default Calendario;