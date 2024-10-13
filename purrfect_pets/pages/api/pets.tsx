import { NextApiRequest, NextApiResponse } from 'next';

let pets: Array<{ id: number; nome: string; tipo: string; idade: number }> = []; // Armazenamento em memória

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        // Retornar todos os pets
        res.status(200).json(pets);
    } else if (req.method === 'POST') {
        // Adicionar um novo pet
        const newPet = req.body;
        pets.push(newPet);
        res.status(201).json(newPet);
    } else if (req.method === 'DELETE') {
        // Remover um pet pelo ID
        const { id } = req.query;
        pets = pets.filter(pet => pet.id !== parseInt(id as string)); // Converter o ID para um número
        res.status(204).end(); // No content
    } else {
        res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
