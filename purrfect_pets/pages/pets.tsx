// Pets.tsx
import React, { useEffect, useState } from 'react';
import PetForm from '@/components/PetForm';

const Pets = () => {
    const [pets, setPets] = useState([]);
    const [editingPet, setEditingPet] = useState(null);
    const [person, setPerson] = useState(null);

    useEffect(() => {
        const savedPerson = JSON.parse(localStorage.getItem('person') || '{}');
        setPerson(savedPerson);

        // Carregar pets associados ao usuário logado
        if (savedPerson.email) {
            const storedPets = JSON.parse(localStorage.getItem(`pets_${savedPerson.email}`) || '[]');
            setPets(storedPets);

            // Fetch pets from the API to ensure up-to-date data
            const fetchPets = async () => {
                const res = await fetch('/api/pets');
                const apiPets = await res.json();
                const userPets = apiPets.filter(pet => pet.ownerEmail === savedPerson.email);
                setPets(userPets);
            };
            fetchPets();
        }
    }, []);

    const savePetsToLocalStorage = (updatedPets) => {
        if (person) {
            localStorage.setItem(`pets_${person.email}`, JSON.stringify(updatedPets)); // Salva os pets para o usuário específico
        }
    };

    const handleAddOrEditPet = async (pet) => {
        const updatedPets = editingPet
            ? pets.map(p => (p.id === pet.id ? pet : p))
            : [...pets, pet];

        setPets(updatedPets);
        savePetsToLocalStorage(updatedPets);

        // Enviar o novo pet para a API se for um novo pet
        if (!editingPet) {
            await fetch('/api/pets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...pet, ownerEmail: person.email }), // Adiciona o email do proprietário
            });
        }

        setEditingPet(null);
    };

    const handleEditPet = (pet) => {
        setEditingPet(pet);
    };

    const handleDeletePet = async (petId) => {
        const updatedPets = pets.filter(pet => pet.id !== petId);
        setPets(updatedPets);
        savePetsToLocalStorage(updatedPets);

        // Opcional: Remover o pet do arquivo JSON também, se necessário
        await fetch('/api/pets', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: petId, ownerEmail: person.email }), // Adiciona o email do proprietário
        });
    };

    return (
        <div>
            <h1>Gerenciar Pets</h1>
            <PetForm onSubmit={handleAddOrEditPet} editingPet={editingPet} />
            <ul>
                {pets.map(pet => (
                    <li key={pet.id}>
                        {pet.nome} ({pet.tipo}) - {pet.idade} anos
                        <button onClick={() => handleEditPet(pet)}>Editar</button>
                        <button onClick={() => handleDeletePet(pet.id)}>Remover</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Pets;
