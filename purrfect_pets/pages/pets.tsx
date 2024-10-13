import React, { useEffect, useState } from 'react';
import PetForm from '@/components/PetForm';
import Navbar from '@/components/Navbar';

const Pets = () => {
    const [pets, setPets] = useState([]);
    const [editingPet, setEditingPet] = useState(null);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const res = await fetch('/api/pets');
                if (!res.ok) {
                    throw new Error('Erro ao buscar os pets');
                }
                const data = await res.json();
                setPets(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPets();
    }, []);

    const handleAddOrEditPet = async (pet) => {
        try {
            if (editingPet) {
                setPets(pets.map(p => (p.id === pet.id ? pet : p)));
                setEditingPet(null);
            } else {
                const res = await fetch('/api/pets', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(pet),
                });
                if (!res.ok) {
                    throw new Error('Erro ao adicionar o pet');
                }
                const newPet = await res.json();
                setPets([...pets, newPet]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditPet = (pet) => {
        setEditingPet(pet);
    };

    const handleDeletePet = async (id) => {
        try {
            const res = await fetch(`/api/pets/${id}`, { method: 'DELETE' });
            if (!res.ok) {
                throw new Error('Erro ao remover o pet');
            }
            setPets(pets.filter(pet => pet.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Navbar />
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
