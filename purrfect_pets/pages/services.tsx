import React, { useEffect, useState } from 'react';
import Link from 'next/link'; 
const Services = () => {
    const [services, setServices] = useState([]); // Lista de serviços

    // Carregar os serviços ao montar o componente
    useEffect(() => {
        const fetchServices = async () => {
            const res = await fetch('/api/services'); // Obtendo os serviços da API
            const data = await res.json();
            setServices(data);
        };

        fetchServices();

    }, []);

    return (
        <div>
            <h1>Serviços Disponíveis</h1>
            <ul>
                {services.map((service) => (
                    <li key={service.id}>
                        {service.nome}
                        <Link href="/login">
                                <button>Agendar</button> {/* Redireciona diretamente para a página de login */}
                            </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default Services;
