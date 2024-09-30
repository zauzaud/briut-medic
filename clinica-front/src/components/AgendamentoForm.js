import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function AgendamentoForm() {
    const [agendamento, setAgendamento] = useState({
        paciente_id: '',
        profissional_id: '',
        servico_id: '',
        data_hora: '',
        status: 'Agendado',
        observacoes: ''
    });
    const [pacientes, setPacientes] = useState([]);
    const [profissionais, setProfissionais] = useState([]);
    const [servicos, setServicos] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Componente montado. ID:', id);
        fetchPacientes();
        fetchProfissionais();
        fetchServicos();
        if (id) {
            fetchAgendamento();
        }
    }, [id]);

    const fetchPacientes = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/pacientes');
            console.log('Pacientes carregados:', response.data);
            setPacientes(response.data);
        } catch (error) {
            console.error('Erro ao buscar pacientes:', error);
        }
    };

    const fetchProfissionais = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/usuarios');
            const filteredProfissionais = response.data.filter(u => u.tipo !== 'Admin' && u.tipo !== 'Recepcionista');
            console.log('Profissionais carregados:', filteredProfissionais);
            setProfissionais(filteredProfissionais);
        } catch (error) {
            console.error('Erro ao buscar profissionais:', error);
        }
    };

    const fetchServicos = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/servicos');
            console.log('Serviços carregados:', response.data);
            setServicos(response.data);
        } catch (error) {
            console.error('Erro ao buscar serviços:', error);
        }
    };

    const fetchAgendamento = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/agendamentos/${id}`);
            console.log('Agendamento carregado:', response.data);
            setAgendamento(response.data);
        } catch (error) {
            console.error('Erro ao buscar agendamento:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAgendamento(prev => {
            const updated = { ...prev, [name]: value };
            console.log(`Campo ${name} atualizado para:`, value);
            console.log('Estado do agendamento atualizado:', updated);
            return updated;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Dados do agendamento antes do envio:', agendamento);

        // Verificação adicional antes do envio
        if (!agendamento.profissional_id || !agendamento.servico_id) {
            console.error('profissional_id ou servico_id estão vazios');
            Swal.fire('Erro', 'Por favor, selecione um profissional e um serviço', 'error');
            return;
        }

        try {
            const dataToSend = {
                ...agendamento,
                paciente_id: parseInt(agendamento.paciente_id),
                profissional_id: parseInt(agendamento.profissional_id),
                servico_id: parseInt(agendamento.servico_id)
            };
            console.log('Dados sendo enviados para o servidor:', dataToSend);
            
            const url = id 
                ? `http://localhost:3000/api/agendamentos/${id}`
                : 'http://localhost:3000/api/agendamentos';
            
            const method = id ? 'put' : 'post';
            
            const response = await axios[method](url, dataToSend);
            
            console.log('Resposta do servidor:', response.data);
            Swal.fire('Sucesso', `Agendamento ${id ? 'atualizado' : 'criado'} com sucesso!`, 'success');
            navigate('/agendamentos');
        } catch (error) {
            console.error('Erro detalhado:', error.response?.data);
            Swal.fire('Erro', `Não foi possível ${id ? 'atualizar' : 'criar'} o agendamento: ${error.response?.data?.mensagem || error.message}`, 'error');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto mt-10">
            <div>
                <label htmlFor="paciente_id" className="block text-sm font-medium text-gray-700">Paciente</label>
                <select
                    id="paciente_id"
                    name="paciente_id"
                    value={agendamento.paciente_id}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                    <option value="">Selecione o Paciente</option>
                    {pacientes.map(paciente => (
                        <option key={paciente.id} value={paciente.id}>{paciente.nome}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="profissional_id" className="block text-sm font-medium text-gray-700">Profissional</label>
                <select
                    id="profissional_id"
                    name="profissional_id"
                    value={agendamento.profissional_id}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                    <option value="">Selecione o Profissional</option>
                    {profissionais.map(profissional => (
                        <option key={profissional.id} value={profissional.id}>{profissional.nome} ({profissional.tipo})</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="servico_id" className="block text-sm font-medium text-gray-700">Serviço</label>
                <select
                    id="servico_id"
                    name="servico_id"
                    value={agendamento.servico_id}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                    <option value="">Selecione o Serviço</option>
                    {servicos.map(servico => (
                        <option key={servico.id} value={servico.id}>{servico.nome}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="data_hora" className="block text-sm font-medium text-gray-700">Data e Hora</label>
                <input
                    type="datetime-local"
                    id="data_hora"
                    name="data_hora"
                    value={agendamento.data_hora}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>

            <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                <select
                    id="status"
                    name="status"
                    value={agendamento.status}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                    <option value="Agendado">Agendado</option>
                    <option value="Confirmado">Confirmado</option>
                    <option value="Concluido">Concluído</option>
                    <option value="Cancelado">Cancelado</option>
                </select>
            </div>

            <div>
                <label htmlFor="observacoes" className="block text-sm font-medium text-gray-700">Observações</label>
                <textarea
                    id="observacoes"
                    name="observacoes"
                    value={agendamento.observacoes}
                    onChange={handleChange}
                    rows="3"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Observações adicionais"
                />
            </div>

            <div>
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {id ? 'Atualizar' : 'Criar'} Agendamento
                </button>
            </div>
        </form>
    );
}

export default AgendamentoForm;