import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Swal from 'sweetalert2';
import AnamneseForm from './AnamneseForm';

function EditarAnamnese() {
    const [anamnese, setAnamnese] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const fetchAnamnese = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:3000/anamneses/${id}`);
            setAnamnese(response.data);
        } catch (error) {
            console.error('Erro ao buscar anamnese:', error);
            Swal.fire('Erro', 'Falha ao buscar dados da anamnese', 'error');
        }
    }, [id]);

    useEffect(() => {
        fetchAnamnese();
    }, [fetchAnamnese]);

    const handleSaveAnamnese = async (tipoAnamnese, respostas) => {
        try {
            await axios.put(`http://localhost:3000/anamneses/${id}`, { tipo_anamnese: tipoAnamnese, respostas });
            Swal.fire('Sucesso', 'Anamnese atualizada com sucesso', 'success');
            navigate('/anamneses');
        } catch (error) {
            console.error('Erro ao atualizar anamnese:', error);
            Swal.fire('Erro', 'Falha ao atualizar anamnese', 'error');
        }
    };

    if (!anamnese) return <div>Carregando...</div>;

    return (
        <div className="flex">
            <NavBar />
            <div className="flex-1 p-10">
                <h1 className="text-2xl font-bold mb-4">Editar Anamnese</h1>
                <AnamneseForm 
                    anamnese={anamnese}
                    onSave={handleSaveAnamnese}
                />
            </div>
        </div>
    );
}

export default EditarAnamnese;