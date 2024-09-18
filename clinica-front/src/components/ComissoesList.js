import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ComissoesList() {
    const [comissoes, setComissoes] = useState([]);

    useEffect(() => {
        fetchComissoes();
    }, []);

    const fetchComissoes = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/comissoes');
            setComissoes(response.data);
        } catch (error) {
            console.error('Erro ao buscar comissões:', error);
        }
    };

    return (
        <div>
            <h2>Lista de Comissões</h2>
            <table>
                <thead>
                    <tr>
                        <th>Profissional</th>
                        <th>Serviço</th>
                        <th>Percentual de Comissão</th>
                    </tr>
                </thead>
                <tbody>
                    {comissoes.map(comissao => (
                        <tr key={comissao.id}>
                            <td>{comissao.Usuario.nome}</td>
                            <td>{comissao.Servico.nome}</td>
                            <td>{comissao.percentual_comissao}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ComissoesList;