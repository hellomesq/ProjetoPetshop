import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import Agendamento from './agendamento';
import Pets from './pets';

const Dashboard = () => {
    const [person, setPerson] = useState<{ name: string; email: string; password: string } | null>(null);
    const router = useRouter();

    useEffect(() => {
        const savedPerson = JSON.parse(localStorage.getItem('person') || '{}');
        if (savedPerson.name) {
            setPerson(savedPerson);
        } else {
            router.push('/login');
        }
    }, [router]);

    const handleLogout = () => {
        alert('Você saiu com sucesso!');
        localStorage.removeItem('person');
        router.push('/');
    };

    return (
        <div className="dashboardContainer">
            <Navbar />
            {person && (
                <div className="dashboardHeader">
                    <h2>Olá, @{person.name}</h2>
                    <button className="button" onClick={handleLogout}>Sair</button>
                </div>
            )}

            <div className="dashboardContent">
                <div className="section">
                    <Pets />
                </div>
                <div className="section">
                    <Agendamento />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
