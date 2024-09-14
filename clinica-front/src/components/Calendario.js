import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Calendar } from 'primereact/calendar';
import { addLocale, locale } from 'primereact/api';
import NavBar from './NavBar';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

// Configuração do locale em português do Brasil
addLocale('pt-BR', {
    firstDayOfWeek: 0,
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    dayNamesMin: ['Do', 'Se', 'Te', 'Qa', 'Qi', 'Sx', 'Sa'],
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    today: 'Hoje',
    clear: 'Limpar'
});

// Define o locale padrão como português do Brasil
locale('pt-BR');

function Calendario() {
    const [events, setEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async (date = null) => {
        try {
            let url = 'http://localhost:3000/agendamentos';
            if (date) {
                const formattedDate = date.toISOString().split('T')[0];
                url += `?date=${formattedDate}`;
            }
            const response = await axios.get(url);
            const formattedEvents = response.data.map(e => ({
                ...e,
                start: new Date(e.data_hora),
                end: new Date(e.data_hora_fim),
                title: e.servico
            }));
            setEvents(formattedEvents);
        } catch (error) {
            console.error('Erro ao buscar eventos:', error);
        }
    };

    const handleDateSelect = (e) => {
        setSelectedDate(e.value);
        fetchEvents(e.value);
    };

    const handleAddAppointment = () => {
        if (!selectedDate) {
            Swal.fire('Erro', 'Por favor, selecione uma data primeiro', 'error');
            return;
        }
    
        Swal.fire({
            title: 'Adicionar Novo Agendamento',
            html: `
                <input id="paciente_id" class="swal2-input" placeholder="ID do Paciente">
                <input id="medico_id" class="swal2-input" placeholder="ID do Médico">
                <input id="servico" class="swal2-input" placeholder="Serviço">
                <input id="data_hora" class="swal2-input" type="time">
                <input id="data_hora_fim" class="swal2-input" type="time">
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
                const date = selectedDate.toISOString().split('T')[0];
                const startTime = document.getElementById('data_hora').value;
                const endTime = document.getElementById('data_hora_fim').value;
                return {
                    paciente_id: document.getElementById('paciente_id').value,
                    medico_id: document.getElementById('medico_id').value,
                    servico: document.getElementById('servico').value,
                    data_hora: `${date}T${startTime}:00`,
                    data_hora_fim: `${date}T${endTime}:00`,
                    status: document.getElementById('status').value,
                    observacoes: document.getElementById('observacoes').value
                };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post('http://localhost:3000/agendamentos', result.value)
                    .then(response => {
                        fetchEvents(selectedDate);
                        Swal.fire('Sucesso', 'Agendamento criado com sucesso!', 'success');
                    })
                    .catch(error => {
                        console.error('Erro ao criar agendamento:', error);
                        Swal.fire('Erro', 'Não foi possível criar o agendamento', 'error');
                    });
            }
        });
    };
    const handleEditAppointment = (event) => {
        Swal.fire({
            title: 'Editar Agendamento',
            html: `
                <input id="servico" class="swal2-input" value="${event.servico}" placeholder="Serviço">
                <input id="data_hora" class="swal2-input" type="time" value="${event.start.toTimeString().slice(0,5)}">
                <input id="data_hora_fim" class="swal2-input" type="time" value="${event.end.toTimeString().slice(0,5)}">
                <select id="status" class="swal2-select">
                    <option value="agendado" ${event.status === 'agendado' ? 'selected' : ''}>Agendado</option>
                    <option value="confirmado" ${event.status === 'confirmado' ? 'selected' : ''}>Confirmado</option>
                    <option value="concluido" ${event.status === 'concluido' ? 'selected' : ''}>Concluído</option>
                    <option value="cancelado" ${event.status === 'cancelado' ? 'selected' : ''}>Cancelado</option>
                </select>
            `,
            focusConfirm: false,
            preConfirm: () => {
                const date = event.start.toISOString().split('T')[0];
                const startTime = document.getElementById('data_hora').value;
                const endTime = document.getElementById('data_hora_fim').value;
                return {
                    servico: document.getElementById('servico').value,
                    data_hora: `${date}T${startTime}:00`,
                    data_hora_fim: `${date}T${endTime}:00`,
                    status: document.getElementById('status').value
                };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                axios.put(`http://localhost:3000/agendamentos/${event.id}`, result.value)
                    .then(response => {
                        fetchEvents(selectedDate);
                        Swal.fire('Sucesso', 'Agendamento atualizado com sucesso!', 'success');
                    })
                    .catch(error => {
                        console.error('Erro ao atualizar agendamento:', error);
                        Swal.fire('Erro', 'Não foi possível atualizar o agendamento', 'error');
                    });
            }
        });
    };

    const handleDeleteAppointment = (event) => {
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
                axios.delete(`http://localhost:3000/agendamentos/${event.id}`)
                    .then(response => {
                        fetchEvents(selectedDate);
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
                <div className="card">
                    <Calendar 
                        value={selectedDate}
                        onChange={handleDateSelect}
                        inline 
                        dateFormat="dd/mm/yy"
                        monthNavigator
                        yearNavigator
                        yearRange="2020:2030"
                        showWeek={false}
                        locale="pt-BR"
                        firstDayOfWeek={0}
                        className="custom-calendar"
                    />
                </div>
                <button onClick={handleAddAppointment} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Adicionar Agendamento
                </button>
                <div className="mt-4">
                    <h2 className="text-xl font-bold mb-2">Agendamentos do Dia</h2>
                    <ul>
                        {events.map(event => (
                            <li key={event.id} className="mb-2 p-2 border rounded flex justify-between items-center">
                                <div>
                                    <p>Data: {event.start.toLocaleDateString('pt-BR')}</p>
                                    <p>Serviço: {event.servico}</p>
                                    <p>Horário: {event.start.toLocaleTimeString('pt-BR')} - {event.end.toLocaleTimeString('pt-BR')}</p>
                                    <p>Status: {event.status}</p>
                                </div>
                                <div>
                                    <button onClick={() => handleEditAppointment(event)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2">
                                        Editar
                                    </button>
                                    <button onClick={() => handleDeleteAppointment(event)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                                        Excluir
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Calendario;