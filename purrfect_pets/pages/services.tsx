import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import ServiceForm from '@/components/ServiceForm';

const Services = () => {
    const [services, setServices] = useState([]);
    const [editingService, setEditingService] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            const res = await fetch('/api/services');
            const data = await res.json();
            setServices(data);
        };
        fetchServices();
    }, []);

    const handleAddOrEditService = async (service) => {
        if (editingService) {
            setServices(services.map(s => (s.id === service.id ? service : s)));
            setEditingService(null);
        } else {
            const res = await fetch('/api/services', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(service),
            });
            const newService = await res.json();
            setServices([...services, newService]);
        }
    };

    const handleEditService = (service) => {
        setEditingService(service);
    };

    const handleDeleteService = async (id) => {
        await fetch(`/api/services/${id}`, { method: 'DELETE' });
        setServices(services.filter(s => s.id !== id));
    };

    return (
        <div>
            <Navbar />
            <h1>Gerenciar Serviços</h1>
            <ServiceForm onSubmit={handleAddOrEditService} editingService={editingService} />
            <ul>
                {services.map(service => (
                    <li key={service.id}>
                        {service.nome} - R${service.preco.toFixed(2)}
                        <button onClick={() => handleEditService(service)}>Editar</button>
                        <button onClick={() => handleDeleteService(service.id)}>Remover</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Services;
