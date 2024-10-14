// pages/dashboard.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Agendamento from './agendamento';

const Dashboard = () => {
    const [person, setPerson] = useState<{ name: string; email: string; age: string | number } | null>(null);
    const router = useRouter();

    useEffect(() => {
        const savedPerson = JSON.parse(localStorage.getItem('person') || '{}');
        if (savedPerson.name) {
            setPerson(savedPerson);
        } else {
            router.push('/login'); // Redireciona para a página de login se não houver pessoa cadastrada
        }
    }, [router]);

    const handleLogout = () => {
        alert('Você saiu com sucesso!');
        router.push('/'); // Redireciona para a página de login ao sair
    };

    return (
        <div>
            <h2>Painel de Controle</h2>
            {person && (
                <div>
                    <ul>
                        <li><strong>Nome:</strong> {person.name}</li>
                        <li><strong>Email:</strong> {person.email}</li>
                        <li><strong>Idade:</strong> {person.age}</li>
                    </ul>
                   
                </div>
            )}
           <Agendamento />
             <button onClick={handleLogout}>Sair</button>
        </div>
    );
};

export default Dashboard;
