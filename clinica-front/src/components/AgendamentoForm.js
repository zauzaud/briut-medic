import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function AgendamentoForm() {
    const [agendamento, setAgendamento] = useState({
        paciente_id: '',
        profissional_id: '',
        servico_id: '',
        data_hora: '',
        data_hora_fim: '',
        status: 'Agendado',
        observacoes: ''
    });
    const [pacientes, setPacientes] = useState([]);
    const [profissionais, setProfissionais] = useState([]);
    const [servicos, setServicos] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchPacientes();
        fetchProfissionais();
        fetchServicos();
        if (id) {
            fetchAgendamento();
        }
    }, [id]);

    const fetchAgendamento = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/agendamentos/${id}`);
            setAgendamento(response.data);
        } catch (error) {
            console.error('Erro ao buscar agendamento:', error);
        }
    };

    const fetchPacientes = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/pacientes');
            setPacientes(response.data);
        } catch (error) {
            console.error('Erro ao buscar pacientes:', error);
        }
    };

    const fetchProfissionais = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/usuarios');
            setProfissionais(response.data.filter(u => u.tipo !== 'Admin' && u.tipo !== 'Recepcionista'));
        } catch (error) {
            console.error('Erro ao buscar profissionais:', error);
        }
    };

    const fetchServicos = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/servicos');
            setServicos(response.data);
        } catch (error) {
            console.error('Erro ao buscar serviços:', error);
        }
    };

    const handleChange = (e) => {
        setAgendamento({ ...agendamento, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await axios.put(`http://localhost:3000/api/agendamentos/${id}`, agendamento);
            } else {
                await axios.post('http://localhost:3000/api/agendamentos', agendamento);
            }
            navigate('/agendamentos');
        } catch (error) {
            console.error('Erro ao salvar agendamento:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <select
                name="paciente_id"
                value={agendamento.paciente_id}
                onChange={handleChange}
                required
            >
                <option value="">Selecione o Paciente</option>
                {pacientes.map(paciente => (
                    <option key={paciente.id} value={paciente.id}>{paciente.nome}</option>
                ))}
            </select>
            <select
                name="profissional_id"
                value={agendamento.profissional_id}
                onChange={handleChange}
                required
            >
                <option value="">Selecione o Profissional</option>
                {profissionais.map(profissional => (
                    <option key={profissional.id} value={profissional.id}>{profissional.nome}</option>
                ))}
            </select>
            <select
                name="servico_id"
                value={agendamento.servico_id}
                onChange={handleChange}
                required
            >
                <option value="">Selecione o Serviço</option>
                {servicos.map(servico => (
                    <option key={servico.id} value={servico.id}>{servico.nome}</option>
                ))}
            </select>
            <input
                type="datetime-local"
                name="data_hora"
                value={agendamento.data_hora}
                onChange={handleChange}
                required
            />
            <input
                type="datetime-local"
                name="data_hora_fim"
                value={agendamento.data_hora_fim}
                onChange={handleChange}
                required
            />
            <select
                name="status"
                value={agendamento.status}
                onChange={handleChange}
                required
            >
                <option value="Agendado">Agendado</option>
                <option value="Confirmado">Confirmado</option>
                <option value="Concluido">Concluído</option>
                <option value="Cancelado">Cancelado</option>
            </select>
            <textarea
                name="observacoes"
                value={agendamento.observacoes}
                onChange={handleChange}
                placeholder="Observações"
            />
            <button type="submit">{id ? 'Atualizar' : 'Criar'} Agendamento</button>
        </form>
    );
}

export default AgendamentoForm;