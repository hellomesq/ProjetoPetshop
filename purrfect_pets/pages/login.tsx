import React from 'react';
import { useRouter } from 'next/router';
import PessoaForm from '@/components/PessoaForm';

const Login = () => {
    const router = useRouter();

    const handleLogin = (user) => {
        localStorage.setItem('person', JSON.stringify(user)); // Salva o usuário logado
        router.push('/dashboard'); // Redireciona para o dashboard
    };

    return (
        <div>
            <h2>Login</h2>
            <PessoaForm isLogin onSubmit={handleLogin} />
            <p>
                Não tem cadastro? <a href="/cadastro">Clique aqui para se cadastrar</a>
            </p>
        </div>
    );
};

export default Login;
