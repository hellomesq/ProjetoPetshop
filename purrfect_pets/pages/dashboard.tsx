import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import Agendamento from './agendamento';
import Pets from './pets';

const Dashboard = () => {
    const [person, setPerson] = useState<{ name: string; email: string; age: string | number } | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Carrega a pessoa logada do localStorage
        const savedPerson = JSON.parse(localStorage.getItem('person') || '{}');
        if (savedPerson.name) {
            setPerson(savedPerson);
        } else {
            router.push('/login'); // Redireciona para a página de login se não houver pessoa cadastrada
        }
    }, [router]);

    const handleLogout = () => {
        alert('Você saiu com sucesso!');
        localStorage.removeItem('person'); // Remove a pessoa do localStorage
        router.push('/'); // Redireciona para a página de login ao sair
    };

    return (
        <div>
            <h2>Painel de Controle</h2>
            <Navbar />
            {person && (
                <div>
                    <ul>
                        <li><strong>Nome:</strong> {person.name}</li>
                        <li><strong>Email:</strong> {person.email}</li>
                        <li><strong>Idade:</strong> {person.age}</li>
                    </ul>
                </div>
            )}
            <Pets />
            <Agendamento />
            <button onClick={handleLogout}>Sair</button>
        </div>
    );
};

export default Dashboard;
