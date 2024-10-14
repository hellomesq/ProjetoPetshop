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
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Nome do Pet"
                required
            />
            <input
                type="text"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                placeholder="Tipo"
                required
            />
            <input
                type="number"
                value={idade}
                onChange={(e) => setIdade(e.target.value)}
                placeholder="Idade"
                required
            />
            <button type="submit">{editingPet ? 'Atualizar' : 'Adicionar'}</button>
        </form>
    );
};

export default PetForm;
