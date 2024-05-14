import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function CalendarioForm({ event, onEventAdded }) {
    const [titulo, setTitulo] = useState(event.title || '');
    const [dataInicio, setDataInicio] = useState(event.start || '');
    const [dataFim, setDataFim] = useState(event.end || '');
    const [usuarioId, setUsuarioId] = useState(event.usuario_id || '');
    const [servico, setServico] = useState(event.servico || '');
    const [status, setStatus] = useState(event.status || 'agendado');
    const navigate = useNavigate();

    useEffect(() => {
        if (event.id) {
            // Load existing event details if editing
            axios.get(`http://localhost:3000/agendamentos/${event.id}`)
                .then(response => {
                    const { titulo, start, end, usuario_id, servico, status } = response.data;
                    setTitulo(titulo);
                    setDataInicio(start);
                    setDataFim(end);
                    setUsuarioId(usuario_id);
                    setServico(servico);
                    setStatus(status);
                })
                .catch(error => console.error('Erro ao buscar detalhes do evento:', error));
        }
    }, [event]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newEvent = {
            titulo,
            data_hora: dataInicio,
            data_hora_fim: dataFim,
            usuario_id: usuarioId,
            servico,
            status
        };

        try {
            const url = event.id ? `http://localhost:3000/agendamentos/${event.id}` : 'http://localhost:3000/agendamentos';
            const method = event.id ? 'put' : 'post';

            const response = await axios({ method, url, data: newEvent });
            if (response.status === 200 || response.status === 201) {
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
