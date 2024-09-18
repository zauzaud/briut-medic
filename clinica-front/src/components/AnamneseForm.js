import React, { useState, useEffect } from 'react';

const questoesAnamnese = {
    estetica: [
        { id: 'diabetes', texto: 'Tem diabetes, hipertensão ou problemas renais?' },
        { id: 'tireoide', texto: 'Tem problemas na tireoide?' },
        { id: 'anemia', texto: 'Já teve/tem anemia?' },
        // Adicione mais perguntas conforme necessário
    ],
    facial: [
        { id: 'biotipoFacial', texto: 'Biotipo Cutâneo:', 
          opcoes: ['Eudérmica', 'Lipídica', 'Atípica', 'Mista'] },
        { id: 'estadoCutaneo', texto: 'Estado Cutâneo:', 
          opcoes: ['Normal', 'Desidratado', 'Sensibilizado', 'Acneico', 'Seborreico'] },
        // Adicione mais perguntas conforme necessário
    ],
    corporal: [
        { id: 'peso', texto: 'Peso Atual:' },
        { id: 'altura', texto: 'Altura:' },
        { id: 'biotipo', texto: 'Biotipo:', 
          opcoes: ['Ginóide', 'Andróide', 'Normolíneo'] },
        // Adicione mais perguntas conforme necessário
    ]
};

function AnamneseForm({ anamnese, onSave }) {
    const [tipoAnamnese, setTipoAnamnese] = useState(anamnese?.tipo_anamnese || 'estetica');
    const [respostas, setRespostas] = useState({});

    useEffect(() => {
        if (anamnese && anamnese.AnamneseRespostas) {
            const respostasIniciais = {};
            anamnese.AnamneseRespostas.forEach(resposta => {
                respostasIniciais[resposta.pergunta] = resposta.resposta;
            });
            setRespostas(respostasIniciais);
        }
    }, [anamnese]);

    const handleChange = (pergunta, valor) => {
        setRespostas(prev => ({ ...prev, [pergunta]: valor }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedRespostas = {};
        questoesAnamnese[tipoAnamnese].forEach(questao => {
            formattedRespostas[questao.id] = respostas[questao.id] || '';
        });
        onSave(tipoAnamnese, formattedRespostas);
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Tipo de Anamnese</label>
                <select
                    value={tipoAnamnese}
                    onChange={(e) => setTipoAnamnese(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                    <option value="estetica">Estética</option>
                    <option value="facial">Facial</option>
                    <option value="corporal">Corporal</option>
                </select>
            </div>

            {questoesAnamnese[tipoAnamnese].map(questao => (
                <div key={questao.id}>
                    <label className="block text-sm font-medium text-gray-700">{questao.texto}</label>
                    {questao.opcoes ? (
                        <select
                            value={respostas[questao.id] || ''}
                            onChange={(e) => handleChange(questao.id, e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            <option value="">Selecione uma opção</option>
                            {questao.opcoes.map(opcao => (
                                <option key={opcao} value={opcao}>{opcao}</option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type="text"
                            value={respostas[questao.id] || ''}
                            onChange={(e) => handleChange(questao.id, e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    )}
                </div>
            ))}

            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Salvar Anamnese
            </button>
        </form>
    );
}

export default AnamneseForm;