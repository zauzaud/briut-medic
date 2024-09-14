// clinica-front/src/components/PacienteForm.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';
import Swal from 'sweetalert2';

function PacienteForm() {
    const [paciente, setPaciente] = useState({
        nome: '',
        email: '',
        telefone: '',
        data_nascimento: '',
        genero: '',
        endereco: '',
        cidade: '',
        estado: '',
        cep: ''
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetchPaciente();
        }
    }, [id]);

    const fetchPaciente = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/pacientes/${id}`);
            setPaciente(response.data);
        } catch (error) {
            console.error('Erro ao buscar paciente:', error);
            Swal.fire('Erro', 'Não foi possível carregar os dados do paciente', 'error');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaciente(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await axios.put(`http://localhost:3000/pacientes/${id}`, paciente);
            } else {
                await axios.post('http://localhost:3000/pacientes', paciente);
            }
            Swal.fire('Sucesso', 'Paciente salvo com sucesso', 'success');
            navigate('/pacientes');
        } catch (error) {
            console.error('Erro ao salvar paciente:', error);
            Swal.fire('Erro', 'Não foi possível salvar o paciente', 'error');
        }
    };

    return (
        <div className="flex">
            <NavBar />
            <div className="flex-1 p-10">
                <h1 className="text-2xl font-bold mb-4">{id ? 'Editar' : 'Adicionar'} Paciente</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
                        <input type="text" name="nome" id="nome" value={paciente.nome} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" name="email" id="email" value={paciente.email} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                    </div>
                    <div>
                        <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">Telefone</label>
                        <input type="tel" name="telefone" id="telefone" value={paciente.telefone} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                    </div>
                    <div>
                        <label htmlFor="data_nascimento" className="block text-sm font-medium text-gray-700">Data de Nascimento</label>
                        <input type="date" name="data_nascimento" id="data_nascimento" value={paciente.data_nascimento} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                    </div>
                    <div>
                        <label htmlFor="genero" className="block text-sm font-medium text-gray-700">Gênero</label>
                        <select name="genero" id="genero" value={paciente.genero} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                            <option value="">Selecione...</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Feminino">Feminino</option>
                            <option value="Outro">Outro</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="endereco" className="block text-sm font-medium text-gray-700">Endereço</label>
                        <input type="text" name="endereco" id="endereco" value={paciente.endereco} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                    </div>
                    <div>
                        <label htmlFor="cidade" className="block text-sm font-medium text-gray-700">Cidade</label>
                        <input type="text" name="cidade" id="cidade" value={paciente.cidade} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                    </div>
                    <div>
                        <label htmlFor="estado" className="block text-sm font-medium text-gray-700">Estado</label>
                        <input type="text" name="estado" id="estado" value={paciente.estado} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                    </div>
                    <div>
                        <label htmlFor="cep" className="block text-sm font-medium text-gray-700">CEP</label>
                        <input type="text" name="cep" id="cep" value={paciente.cep} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                    </div>
                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        {id ? 'Atualizar' : 'Adicionar'} Paciente
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PacienteForm;