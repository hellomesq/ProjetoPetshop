import { useEffect, useState } from 'react';

const PetForm = ({ onSubmit, editingPet }) => {
    const [nome, setNome] = useState('');
    const [tipo, setTipo] = useState('');
    const [idade, setIdade] = useState(0);

    useEffect(() => {
        if (editingPet) {
            setNome(editingPet.nome);
            setTipo(editingPet.tipo);
            setIdade(editingPet.idade);
        }
    }, [editingPet]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const pet = {
            id: editingPet ? editingPet.id : Date.now(), // Gera um novo ID se não estiver editando
            nome,
            tipo,
            idade
        };
        onSubmit(pet);
        // Reset form fields
        setNome('');
        setTipo('');
        setIdade(0);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{editingPet ? 'Editar Pet' : 'Cadastrar Pet'}</h2>
            <input
                type="text"
                placeholder="Nome do Pet"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Tipo de Pet"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Idade do Pet"
                value={idade}
                onChange={(e) => setIdade(Number(e.target.value))}
                required
            />
            <button type="submit">{editingPet ? 'Atualizar' : 'Cadastrar'}</button>
        </form>
    );
};

export default PetForm;
