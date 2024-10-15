import React, { useState, useEffect } from 'react';

const PetForm = ({ onSubmit, editingPet }) => {
    const [nome, setNome] = useState('');
    const [tipo, setTipo] = useState('');
    const [idade, setIdade] = useState('');

    useEffect(() => {
        if (editingPet) {
            setNome(editingPet.nome);
            setTipo(editingPet.tipo);
            setIdade(editingPet.idade);
        } else {
            setNome('');
            setTipo('');
            setIdade('');
        }
    }, [editingPet]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const petData = {
            id: editingPet ? editingPet.id : Date.now(),
            nome,
            tipo,
            idade,
        };
        onSubmit(petData);
    };

    return (
        <form className="petForm" onSubmit={handleSubmit}>
            <div className="formGroup">
                <label htmlFor="nome">Nome do Pet:</label>
                <input
                    type="text"
                    id="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Nome do Pet"
                    required
                />
            </div>

            <div className="formGroup">
                <label htmlFor="tipo">Tipo:</label>
                <input
                    type="text"
                    id="tipo"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    placeholder="Tipo"
                    required
                />
            </div>

            <div className="formGroup">
                <label htmlFor="idade">Idade:</label>
                <input
                    type="number"
                    id="idade"
                    value={idade}
                    onChange={(e) => setIdade(e.target.value)}
                    placeholder="Idade"
                    required
                />
            </div>

            <button className="submitButton" type="submit">
                {editingPet ? 'Atualizar' : 'Adicionar'}
            </button>
        </form>
    );
};

export default PetForm;
