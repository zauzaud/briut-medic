import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import Swal from 'sweetalert2';

function ListaAnamneses() {
    const [anamneses, setAnamneses] = useState([]);

    useEffect(() => {
        fetchAnamneses();
    }, []);

    const fetchAnamneses = async () => {
        try {
            const response = await axios.get('http://localhost:3000/anamneses');
            setAnamneses(response.data);
        } catch (error) {
            console.error('Erro ao buscar anamneses:', error);
            Swal.fire('Erro', 'Não foi possível carregar as anamneses', 'error');
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
                            <p className="font-bold">Paciente: {anamnese.Paciente?.nome}</p>
                            <p>História Clínica: {anamnese.historia_clinica}</p>
                            <Link to={`/anamnese/${anamnese.paciente_id}`} className="text-blue-500 hover:text-blue-700">
                                Ver detalhes
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ListaAnamneses;