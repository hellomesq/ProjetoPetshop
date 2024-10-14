// pages/login.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Login = () => {
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        const savedPerson = JSON.parse(localStorage.getItem('person') || '{}');

        // Verifica se o email e idade coincidem com os dados salvos
        if (savedPerson.email === email && savedPerson.age === age) {
            alert('Login bem-sucedido!');
            router.push('/dashboard'); // Redireciona para o dashboard
        } else {
            setErrorMessage('Email ou idade inválidos. Tente novamente.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Idade"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                />
                <button type="submit">Entrar</button>
            </form>
            <p>
                Não tem cadastro? <a href="/cadastro">Clique aqui para se cadastrar</a>
            </p>
        </div>
    );
};

export default Login;
