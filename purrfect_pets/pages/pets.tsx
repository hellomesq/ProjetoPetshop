import React, { useEffect, useState } from 'react';
import PetForm from '@/components/PetForm';

const Pets = () => {
    const [pets, setPets] = useState([]);
    const [editingPet, setEditingPet] = useState(null);
    const [person, setPerson] = useState(null);

    useEffect(() => {
        const savedPerson = JSON.parse(localStorage.getItem('person') || '{}');
        setPerson(savedPerson);
        if (savedPerson.email) {
            const storedPets = JSON.parse(localStorage.getItem(`pets_${savedPerson.email}`) || '[]');
            setPets(storedPets);
        }
    }, []);

    const handleAddOrEditPet = async (pet) => {
        const updatedPets = editingPet
            ? pets.map(p => (p.id === pet.id ? pet : p))
            : [...pets, pet];

        setPets(updatedPets);
        localStorage.setItem(`pets_${person.email}`, JSON.stringify(updatedPets));

        if (!editingPet) {
            await fetch('/api/pets', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pet),
            });
        }
        setEditingPet(null);
    };

    const handleDeletePet = (petId) => {
        const updatedPets = pets.filter(pet => pet.id !== petId);
        setPets(updatedPets);
        localStorage.setItem(`pets_${person.email}`, JSON.stringify(updatedPets));
    };

    return (
        <div className="petsContainer">
            <h1>Cadastre seu pet</h1>
            <PetForm onSubmit={handleAddOrEditPet} editingPet={editingPet} />
            <ul className="petsList">
                {pets.map(pet => (
                    <li key={pet.id} className="petItem">
                        {pet.nome} ({pet.tipo}) - {pet.idade} anos
                        <div className="petActions">
                            <button onClick={() => setEditingPet(pet)}>Editar</button>
                            <button onClick={() => handleDeletePet(pet.id)}>Remover</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Pets;
