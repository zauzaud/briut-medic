import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UsuarioForm({ usuario, onFormSubmit }) {
    const [nome, setNome] = useState(usuario.nome || '');
    const [tipo, setTipo] = useState(usuario.tipo || '');
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const usuarioData = { nome, tipo };
            const response = usuario.id
                ? await axios.put(`http://localhost:3000/usuarios/${usuario.id}`, usuarioData)
                : await axios.post('http://localhost:3000/usuarios', usuarioData);
            onFormSubmit();
            navigate('/usuarios');
            alert(`Usuário salvo: ${response.data.nome}`);  
        } catch (error) {
            console.error('Falha ao salvar o usuário', error);
            setError('Erro ao salvar o usuário. Por favor, tente novamente.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p className="text-red-500">{error}</p>}
            <label htmlFor="nome">Nome:</label>
            <input
                type="text"
                id="nome"
                value={nome}
                onChange={e => setNome(e.target.value)}
                required
            />
            <label htmlFor="tipo">Tipo:</label>
            <select
                id="tipo"
                value={tipo}
                onChange={e => setTipo(e.target.value)}
                required
            >
                <option value="">Selecione um tipo</option>
                <option value="Administrador">Administrador</option>
                <option value="Médico">Médico</option>
                <option value="Paciente">Paciente</option>
                <option value="Outro">Outro</option>
            </select>
            <button type="submit">Salvar</button>
        </form>
    );
}

export default UsuarioForm;
