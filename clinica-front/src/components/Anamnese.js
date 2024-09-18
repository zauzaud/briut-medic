import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Swal from 'sweetalert2';
import AnamneseForm from './AnamneseForm';

function Anamnese() {
    const [anamneses, setAnamneses] = useState([]);
    const [tipoAnamnese, setTipoAnamnese] = useState('');
    const { pacienteId } = useParams();
    const navigate = useNavigate();

    const fetchAnamneses = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:3000/anamneses/paciente/${pacienteId}`);
            console.log('Resposta da API:', response.data);
            setAnamneses(response.data);
        } catch (error) {
            console.error('Erro ao buscar anamneses:', error);
            Swal.fire('Erro', 'Falha ao buscar dados das anamneses', 'error');
        }
    }, [pacienteId]);

    useEffect(() => {
        fetchAnamneses();
    }, [fetchAnamneses]);

    const handleSaveAnamnese = async (tipoAnamnese, respostas) => {
        try {
            await axios.post('http://localhost:3000/anamneses', { paciente_id: pacienteId, tipo_anamnese: tipoAnamnese, respostas });
            Swal.fire('Sucesso', 'Anamnese salva com sucesso', 'success');
            fetchAnamneses();
            setTipoAnamnese('');
        } catch (error) {
            console.error('Erro ao salvar anamnese:', error);
            Swal.fire('Erro', 'Falha ao salvar anamnese', 'error');
        }
    };

    const handleDeleteAnamnese = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/anamneses/${id}`);
            Swal.fire('Sucesso', 'Anamnese excluída com sucesso', 'success');
            fetchAnamneses();
        } catch (error) {
            console.error('Erro ao excluir anamnese:', error);
            Swal.fire('Erro', 'Não foi possível excluir a anamnese', 'error');
        }
    };

    return (
        <div className="flex">
            <NavBar />
            <div className="flex-1 p-10">
                <h1 className="text-2xl font-bold mb-4">Anamneses do Paciente</h1>
                <select
                    value={tipoAnamnese}
                    onChange={(e) => setTipoAnamnese(e.target.value)}
                    className="mb-4 p-2 border rounded"
                >
                    <option value="">Selecione o tipo de anamnese</option>
                    <option value="estetica">Estética</option>
                    <option value="facial">Facial</option>
                    <option value="corporal">Corporal</option>
                </select>
                {tipoAnamnese && (
                    <AnamneseForm 
                        tipoAnamnese={tipoAnamnese}
                        onSave={handleSaveAnamnese}
                    />
                )}
                <h2 className="text-xl font-bold mt-8 mb-4">Anamneses Existentes</h2>
                {anamneses.map(anamnese => (
                    <div key={anamnese.id} className="mb-4 p-4 border rounded">
                        <p>Tipo: {anamnese.tipo_anamnese}</p>
                        <button onClick={() => navigate(`/editar-anamnese/${anamnese.id}`)} className="mr-2 bg-blue-500 text-white p-2 rounded">Editar</button>
                        <button onClick={() => handleDeleteAnamnese(anamnese.id)} className="bg-red-500 text-white p-2 rounded">Excluir</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Anamnese;