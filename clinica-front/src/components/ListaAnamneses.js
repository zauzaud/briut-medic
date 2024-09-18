import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Swal from 'sweetalert2';

function ListaAnamneses() {
    const [anamneses, setAnamneses] = useState([]);
    const navigate = useNavigate();

    const fetchAnamneses = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:3000/anamneses');
            console.log('Resposta da API:', response.data);
            setAnamneses(response.data);
        } catch (error) {
            console.error('Erro ao buscar anamneses:', error);
            Swal.fire('Erro', 'Não foi possível carregar as anamneses', 'error');
        }
    }, []);

    useEffect(() => {
        fetchAnamneses();
    }, [fetchAnamneses]);

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
                <h1 className="text-2xl font-bold mb-4">Anamneses</h1>
                <div className="mt-4">
                    {anamneses.map(anamnese => (
                        <div key={anamnese.id} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            <p className="font-bold">Paciente ID: {anamnese.paciente_id}</p>
                            <p>Tipo: {anamnese.tipo_anamnese}</p>
                            <div className="mt-4">
                                <button onClick={() => navigate(`/editar-anamnese/${anamnese.id}`)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                                    Editar
                                </button>
                                <button onClick={() => handleDeleteAnamnese(anamnese.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                    Excluir
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ListaAnamneses;