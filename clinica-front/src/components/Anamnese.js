import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NavBar from './NavBar';
import Swal from 'sweetalert2';

function Anamnese() {
    const [anamnese, setAnamnese] = useState({
        historia_clinica: '',
        medicacoes_atuais: '',
        alergias: '',
        habitos_vida: '',
        antecedentes_familiares: ''
    });
    const { pacienteId } = useParams();

    useEffect(() => {
        fetchAnamnese();
    }, [pacienteId]);

    const fetchAnamnese = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/anamneses/paciente/${pacienteId}`);
            setAnamnese(response.data);
        } catch (error) {
            console.error('Erro ao buscar anamnese:', error);
            if (error.response && error.response.status === 404) {
                // Anamnese não encontrada, manter o estado vazio
            } else {
                Swal.fire('Erro', 'Falha ao buscar dados da anamnese', 'error');
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAnamnese(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (anamnese.id) {
                await axios.put(`http://localhost:3000/anamneses/${anamnese.id}`, anamnese);
            } else {
                await axios.post('http://localhost:3000/anamneses', { ...anamnese, paciente_id: pacienteId });
            }
            Swal.fire('Sucesso', 'Anamnese salva com sucesso', 'success');
        } catch (error) {
            console.error('Erro ao salvar anamnese:', error);
            Swal.fire('Erro', 'Falha ao salvar anamnese', 'error');
        }
    };

    return (
        <div className="flex">
            <NavBar />
            <div className="flex-1 p-10">
                <h1 className="text-2xl font-bold mb-4">Anamnese do Paciente</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="historia_clinica" className="block text-sm font-medium text-gray-700">História Clínica:</label>
                        <textarea
                            id="historia_clinica"
                            name="historia_clinica"
                            value={anamnese.historia_clinica}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            rows="4"
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="medicacoes_atuais" className="block text-sm font-medium text-gray-700">Medicações Atuais:</label>
                        <textarea
                            id="medicacoes_atuais"
                            name="medicacoes_atuais"
                            value={anamnese.medicacoes_atuais}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            rows="3"
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="alergias" className="block text-sm font-medium text-gray-700">Alergias:</label>
                        <input
                            type="text"
                            id="alergias"
                            name="alergias"
                            value={anamnese.alergias}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label htmlFor="habitos_vida" className="block text-sm font-medium text-gray-700">Hábitos de Vida:</label>
                        <textarea
                            id="habitos_vida"
                            name="habitos_vida"
                            value={anamnese.habitos_vida}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            rows="3"
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="antecedentes_familiares" className="block text-sm font-medium text-gray-700">Antecedentes Familiares:</label>
                        <textarea
                            id="antecedentes_familiares"
                            name="antecedentes_familiares"
                            value={anamnese.antecedentes_familiares}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            rows="3"
                        ></textarea>
                    </div>
                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Salvar Anamnese
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Anamnese;