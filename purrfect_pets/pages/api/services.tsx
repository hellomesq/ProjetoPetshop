import type { NextApiRequest, NextApiResponse } from 'next';
import servicesData from '../services.json'; // Importa o JSON dos serviços

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        res.status(200).json(servicesData);
    } else if (req.method === 'POST') {
        const newService = { id: Date.now(), ...req.body }; // ID único
        servicesData.push(newService);
        res.status(201).json(newService);
    } else if (req.method === 'DELETE') {
        const { id } = req.query;
        const index = servicesData.findIndex((service: { id: number }) => service.id === Number(id));
        if (index !== -1) {
            servicesData.splice(index, 1);
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Service not found' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
