import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import NavBar from './NavBar';

function Calendario() {
    console.log('Renderizando Calendario component');

    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const [profissionais, setProfissionais] = useState([]);
    const [servicos, setServicos] = useState([]);
    const [selectedProfissional, setSelectedProfissional] = useState('');

    const adjustTimezone = (date) => {
        const offset = date.getTimezoneOffset();
        return new Date(date.getTime() - (offset * 60 * 1000));
    };

    const fetchEvents = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:3000/agendamentos');
            console.log('Eventos carregados:', response.data);
            const formattedEvents = response.data.map(e => ({
                id: e.id,
                title: `${e.Servico.nome} - ${e.Paciente.nome}`,
                start: new Date(e.data_hora),
                end: new Date(e.data_hora_fim),
                extendedProps: {
                    paciente_id: e.paciente_id,
                    paciente_nome: e.Paciente.nome,
                    profissional_id: e.profissional_id,
                    profissional_nome: e.Profissional.nome,
                    servico_id: e.servico_id,
                    servico_nome: e.Servico.nome,
                    status: e.status,
                    observacoes: e.observacoes
                }
            }));
            setEvents(formattedEvents);
            setFilteredEvents(formattedEvents);
        } catch (error) {
            console.error('Erro ao buscar eventos:', error);
        }
    }, []);

    const fetchPacientes = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:3000/pacientes');
            console.log('Pacientes carregados:', response.data);
            setPacientes(response.data);
        } catch (error) {
            console.error('Erro ao buscar pacientes:', error);
        }
    }, []);

    const fetchProfissionais = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:3000/usuarios');
            const filteredProfissionais = response.data.filter(u => u.tipo !== 'Admin' && u.tipo !== 'Recepcionista');
            console.log('Profissionais carregados:', filteredProfissionais);
            setProfissionais(filteredProfissionais);
        } catch (error) {
            console.error('Erro ao buscar profissionais:', error);
        }
    }, []);

    const fetchServicos = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:3000/servicos');
            console.log('Serviços carregados:', response.data);
            setServicos(response.data);
        } catch (error) {
            console.error('Erro ao buscar serviços:', error);
        }
    }, []);

    useEffect(() => {
        fetchEvents();
        fetchPacientes();
        fetchProfissionais();
        fetchServicos();
    }, [fetchEvents, fetchPacientes, fetchProfissionais, fetchServicos]);

    useEffect(() => {
        if (selectedProfissional) {
            setFilteredEvents(events.filter(event => event.extendedProps.profissional_id === selectedProfissional));
        } else {
            setFilteredEvents(events);
        }
    }, [selectedProfissional, events]);

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

    const checkOverlap = (newStart, newEnd, profissionalId, excludeEventId = null) => {
        return events.some(event => {
            if (event.id === excludeEventId) return false;
            if (event.extendedProps.profissional_id !== profissionalId) return false;
            
            const eventStart = new Date(event.start);
            const eventEnd = new Date(event.end);
            
            return (newStart < eventEnd && newEnd > eventStart);
        });
    };

    const handleAddAppointment = (date) => {
        const formattedDate = date.toISOString().slice(0, 16);
        Swal.fire({
            title: 'Adicionar Novo Agendamento',
            html: `
                <select id="paciente_id" class="swal2-select">
                    <option value="">Selecione o Paciente</option>
                    ${pacientes.map(p => `<option value="${p.id}">${p.nome}</option>`).join('')}
                </select>
                <select id="profissional_id" class="swal2-select">
                    <option value="">Selecione o Profissional</option>
                    ${profissionais.map(p => `<option value="${p.id}">${p.nome}</option>`).join('')}
                </select>
                <select id="servico_id" class="swal2-select">
                    <option value="">Selecione o Serviço</option>
                    ${servicos.map(s => `<option value="${s.id}">${s.nome}</option>`).join('')}
                </select>
                <input id="data_hora" class="swal2-input" type="datetime-local" value="${formattedDate}">
                <select id="status" class="swal2-select">
                    <option value="Agendado">Agendado</option>
                    <option value="Confirmado">Confirmado</option>
                    <option value="Concluido">Concluído</option>
                    <option value="Cancelado">Cancelado</option>
                </select>
                <textarea id="observacoes" class="swal2-textarea" placeholder="Observações"></textarea>
            `,
            focusConfirm: false,
            preConfirm: () => {
                const inputDate = new Date(document.getElementById('data_hora').value);
                const adjustedDate = adjustTimezone(inputDate);
                const servicoId = parseInt(document.getElementById('servico_id').value);
                const servico = servicos.find(s => s.id === servicoId);
                const endDate = new Date(adjustedDate.getTime() + (servico ? servico.duracao : 30) * 60000);
                const profissionalId = parseInt(document.getElementById('profissional_id').value);

                if (checkOverlap(adjustedDate, endDate, profissionalId)) {
                    Swal.showValidationMessage('Este horário já está ocupado para o profissional selecionado');
                    return false;
                }

                return {
                    paciente_id: parseInt(document.getElementById('paciente_id').value),
                    profissional_id: profissionalId,
                    servico_id: servicoId,
                    data_hora: adjustedDate.toISOString(),
                    data_hora_fim: endDate.toISOString(),
                    status: document.getElementById('status').value,
                    observacoes: document.getElementById('observacoes').value
                };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                if (!result.value.paciente_id || !result.value.profissional_id || !result.value.servico_id) {
                    Swal.fire('Erro', 'Todos os campos são obrigatórios', 'error');
                    return;
                }
                axios.post('http://localhost:3000/agendamentos', result.value)
                    .then(response => {
                        fetchEvents();
                        Swal.fire('Sucesso', 'Agendamento criado com sucesso!', 'success');
                    })
                    .catch(error => {
                        console.error('Erro ao criar agendamento:', error);
                        Swal.fire('Erro', `Não foi possível criar o agendamento: ${error.response?.data?.mensagem || error.message}`, 'error');
                    });
            }
        });
    };

    const handleEditAppointment = (event) => {
        Swal.fire({
            title: 'Editar Agendamento',
            html: `
                <select id="paciente_id" class="swal2-select">
                    ${pacientes.map(p => `<option value="${p.id}" ${p.id === event.extendedProps.paciente_id ? 'selected' : ''}>${p.nome}</option>`).join('')}
                </select>
                <select id="profissional_id" class="swal2-select">
                    ${profissionais.map(p => `<option value="${p.id}" ${p.id === event.extendedProps.profissional_id ? 'selected' : ''}>${p.nome}</option>`).join('')}
                </select>
                <select id="servico_id" class="swal2-select">
                    ${servicos.map(s => `<option value="${s.id}" ${s.id === event.extendedProps.servico_id ? 'selected' : ''}>${s.nome}</option>`).join('')}
                </select>
                <input id="data_hora" class="swal2-input" type="datetime-local" value="${event.start.toISOString().slice(0, 16)}">
                <select id="status" class="swal2-select">
                    <option value="Agendado" ${event.extendedProps.status === 'Agendado' ? 'selected' : ''}>Agendado</option>
                    <option value="Confirmado" ${event.extendedProps.status === 'Confirmado' ? 'selected' : ''}>Confirmado</option>
                    <option value="Concluido" ${event.extendedProps.status === 'Concluido' ? 'selected' : ''}>Concluído</option>
                    <option value="Cancelado" ${event.extendedProps.status === 'Cancelado' ? 'selected' : ''}>Cancelado</option>
                </select>
                <textarea id="observacoes" class="swal2-textarea" placeholder="Observações">${event.extendedProps.observacoes || ''}</textarea>
            `,
            focusConfirm: false,
            preConfirm: () => {
                const inputDate = new Date(document.getElementById('data_hora').value);
                const adjustedDate = adjustTimezone(inputDate);
                const servicoId = parseInt(document.getElementById('servico_id').value);
                const servico = servicos.find(s => s.id === servicoId);
                const endDate = new Date(adjustedDate.getTime() + (servico ? servico.duracao : 30) * 60000);
                const profissionalId = parseInt(document.getElementById('profissional_id').value);

                if (checkOverlap(adjustedDate, endDate, profissionalId, event.id)) {
                    Swal.showValidationMessage('Este horário já está ocupado para o profissional selecionado');
                    return false;
                }

                return {
                    paciente_id: parseInt(document.getElementById('paciente_id').value),
                    profissional_id: profissionalId,
                    servico_id: servicoId,
                    data_hora: adjustedDate.toISOString(),
                    data_hora_fim: endDate.toISOString(),
                    status: document.getElementById('status').value,
                    observacoes: document.getElementById('observacoes').value
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

    return (
        <div className="flex">
            <NavBar />
            <div className='flex-1 p-10'>
                <div className="mb-4">
                    <select
                        value={selectedProfissional}
                        onChange={(e) => setSelectedProfissional(e.target.value)}
                        className="p-2 border rounded"
                    >
                        <option value="">Todos os profissionais</option>
                        {profissionais.map(prof => (
                            <option key={prof.id} value={prof.id}>{prof.nome}</option>
                        ))}
                    </select>
                </div>
                <FullCalendar
                    plugins={[timeGridPlugin, interactionPlugin]}
                    initialView="timeGridWeek"
                    slotMinTime="08:00:00"
                    slotMaxTime="18:00:00"
                    allDaySlot={false}
                    weekends={true}
                    events={filteredEvents}
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
                    eventContent={renderEventContent}
                />
            </div>
        </div>
    );
}

function renderEventContent(eventInfo) {
    return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
            <div>Paciente: {eventInfo.event.extendedProps.paciente_nome}</div>
            <div>Profissional: {eventInfo.event.extendedProps.profissional_nome}</div>
            <div>Status: {eventInfo.event.extendedProps.status}</div>
        </>
    );
}

export default Calendario;