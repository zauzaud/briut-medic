import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function UsuarioForm({ usuario, onFormSubmit }) {
    const [nome, setNome] = useState(usuario ? usuario.nome : '');
    const [tipo, setTipo] = useState(usuario ? usuario.tipo : '');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const usuarioData = { nome, tipo };
            if (usuario && usuario.id) {
                await axios.put(`http://localhost:3000/usuarios/${usuario.id}`, usuarioData);
            } else {
                await axios.post('http://localhost:3000/usuarios', usuarioData);
            }
            onFormSubmit();
            Swal.fire({
                title: 'Sucesso!',
                text: 'Usuário salvo com sucesso.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/usuarios');
                }
            });
        } catch (error) {
            Swal.fire({
                title: 'Erro!',
                text: 'Erro ao salvar o usuário. Por favor, tente novamente.',
                icon: 'error',
                confirmButtonText: 'Fechar'
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
            <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome:</label>
                <input
                    type="text"
                    id="nome"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            <div>
                <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">Tipo:</label>
                <select
                    id="tipo"
                    value={tipo}
                    onChange={e => setTipo(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="">Selecione um tipo</option>
                    <option value="Administrador">Administrador</option>
                    <option value="Médico">Médico</option>
                    <option value="Recepcionista">Recepcionista</option>
                    <option value="Esteticista">Esteticista</option>
                    <option value="Psicóloga">Psicologa</option>
                    <option value="Paciente">Paciente</option>
                    <option value="Outro">Outro</option>
                </select>
            </div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Salvar
            </button>
        </form>
    );
}

export default UsuarioForm;
