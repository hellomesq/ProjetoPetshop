import { NextApiRequest, NextApiResponse } from 'next';

let pets: Array<{ id: number; nome: string; tipo: string; idade: number }> = [];
let nextId = 1; 

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        res.status(200).json(pets);
    } else if (req.method === 'POST') {
        const newPet = { ...req.body, id: nextId++ }; 
        pets.push(newPet);
        res.status(201).json(newPet);
    } else if (req.method === 'DELETE') {
        const { id } = req.query;
        pets = pets.filter(pet => pet.id !== parseInt(id as string)); 
        res.status(204).end(); 
    } else {
        res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
