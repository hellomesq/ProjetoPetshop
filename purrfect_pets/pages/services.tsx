import React, { useEffect, useState } from 'react';
import Link from 'next/link'; 

const Services = () => {
    const [services, setServices] = useState([]); 

    useEffect(() => {
        const fetchServices = async () => {
            const res = await fetch('/api/services'); 
            const data = await res.json();
            setServices(data);
        };

        fetchServices();
    }, []);

    return (
        <div className="servicesContainer">
            <h1>Serviços Disponíveis</h1>
            <div className="cardsContainer">
                {services.map((service) => (
                    <div className="card" key={service.id}>
                        <h2>{service.nome}</h2>
                        <Link href="/login">
                            <button>Agendar</button> 
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;
