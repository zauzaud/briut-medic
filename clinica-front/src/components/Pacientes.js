import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import Swal from 'sweetalert2';

function Pacientes() {
    const [pacientes, setPacientes] = useState([]);

    useEffect(() => {
        fetchPacientes();
    }, []);

    const fetchPacientes = async () => {
        try {
            const response = await axios.get('http://localhost:3000/pacientes');
            setPacientes(response.data);
        } catch (error) {
            console.error('Erro ao buscar pacientes:', error);
            Swal.fire('Erro', 'Não foi possível carregar os pacientes', 'error');
        }
    };

    const handleDelete = async (id) => {
        try {
            await Swal.fire({
                title: 'Você tem certeza?',
                text: "Esta ação não poderá ser revertida!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim, deletar!',
                cancelButtonText: 'Cancelar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await axios.delete(`http://localhost:3000/pacientes/${id}`);
                    Swal.fire('Deletado!', 'O paciente foi removido.', 'success');
                    fetchPacientes();
                }
            });
        } catch (error) {
            console.error('Erro ao deletar paciente:', error);
            Swal.fire('Erro', 'Não foi possível deletar o paciente', 'error');
        }
    };

    return (
        <div className="flex">
            <NavBar />
            <div className="flex-1 p-10">
                <h1 className="text-2xl font-bold mb-4">Pacientes</h1>
                <Link to="/pacientes/novo" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 inline-block">
                    Adicionar Novo Paciente
                </Link>
                <div className="mt-4">
                    {pacientes.map(paciente => (
                        <div key={paciente.id} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                            <div className="mb-4">
                                <p className="font-bold text-xl mb-2">{paciente.nome}</p>
                                <p>Email: {paciente.email}</p>
                                <p>Telefone: {paciente.telefone}</p>
                                <p>Data de Nascimento: {new Date(paciente.data_nascimento).toLocaleDateString()}</p>
                            </div>
                            <div className="flex justify-between">
                                <Link to={`/pacientes/editar/${paciente.id}`} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                                    Editar
                                </Link>
                                <button onClick={() => handleDelete(paciente.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                    Deletar
                                </button>
                                <Link to={`/anamnese/${paciente.id}`} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                    Ver Anamnese
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Pacientes;