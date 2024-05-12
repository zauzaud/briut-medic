import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


function formatDate(dateString) {
    const [date, time, modifier] = dateString.split(' ');
    let [hours, minutes] = time.split(':');
    if (modifier === 'PM' && hours < 12) hours = parseInt(hours, 10) + 12;
    if (modifier === 'AM' && hours === '12') hours = '00'; // Midnight edge case
    return `${date.split('/').reverse().join('-')} ${hours}:${minutes}:00`;
}

function CalendarioForm({ event, onEventAdded }) {
    const [titulo, setTitulo] = useState(event ? event.title : '');
    const [dataInicio, setDataInicio] = useState(event ? event.start : '');
    const [dataFim, setDataFim] = useState(event ? event.end : '');
    const [usuarioId, setUsuarioId] = useState(event ? event.usuario_id : '');
    const [servico, setServico] = useState(event ? event.servico : '');
    const [status, setStatus] = useState(event ? event.status : 'agendado');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        

        const newEvent = {
            usuario_id: usuarioId,
            data_hora: formatDate(dataInicio),
            data_hora_fim: formatDate(dataFim),
            servico: servico,
            status: status
        };
    
        try {
            const url = event && event.id ? `http://localhost:3000/agendamentos/${event.id}` : 'http://localhost:3000/agendamentos';
            const method = event && event.id ? 'put' : 'post';
    
            const response = await axios({
                method: method,
                url: url,
                data: newEvent
            });
    
            if (response.status === 200 || response.status === 201) {
                Swal.fire('Sucesso!', 'Evento adicionado/atualizado com sucesso!', 'success');
                onEventAdded(newEvent);
                navigate('/agendamentos');
            } else {
                throw new Error('Resposta não esperada do servidor');
            }
        } catch (error) {
            Swal.fire('Erro!', 'Houve um problema ao adicionar/atualizar o evento.', 'error');
            console.error('Erro ao adicionar/atualizar evento:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="titulo">Título:</label>
                <input
                    type="text"
                    id="titulo"
                    value={titulo}
                    onChange={e => setTitulo(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="dataInicio">Data de Início:</label>
                <input
                    type="datetime-local"
                    id="dataInicio"
                    value={dataInicio}
                    onChange={e => setDataInicio(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="dataFim">Data de Fim:</label>
                <input
                    type="datetime-local"
                    id="dataFim"
                    value={dataFim}
                    onChange={e => setDataFim(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="usuarioId">ID do Usuário:</label>
                <input
                    type="number"
                    id="usuarioId"
                    value={usuarioId}
                    onChange={e => setUsuarioId(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="servico">Serviço:</label>
                <input
                    type="text"
                    id="servico"
                    value={servico}
                    onChange={e => setServico(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="status">Status:</label>
                <select
                    id="status"
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                    required
                >
                    <option value="agendado">Agendado</option>
                    <option value="concluido">Concluído</option>
                    <option value="cancelado">Cancelado</option>
                </select>
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Salvar</button>
        </form>
    );
}

export default CalendarioForm;
