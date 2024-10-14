// pages/cadastro.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Cadastro = () => {
    const [person, setPerson] = useState<{ name: string; email: string; age: string | number }>({ name: '', email: '', age: '' });
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Salva os dados no localStorage
        localStorage.setItem('person', JSON.stringify(person));
        alert('Cadastro salvo com sucesso!');
        router.push('/dashboard'); // Redireciona para a página do dashboard
    };

    return (
        <div>
            <h2>Cadastro de Pessoa</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nome"
                    value={person.name}
                    onChange={(e) => setPerson({ ...person, name: e.target.value })}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={person.email}
                    onChange={(e) => setPerson({ ...person, email: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Idade"
                    value={person.age}
                    onChange={(e) => setPerson({ ...person, age: e.target.value })}
                    required
                />
                <button type="submit">Cadastrar</button>
            </form>
            <p>
                Já tem cadastro? <a href="/login">Clique aqui para fazer login</a>
            </p>
        </div>
    );
};

export default Cadastro;
