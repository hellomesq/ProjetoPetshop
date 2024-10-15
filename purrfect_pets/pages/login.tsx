import React from 'react';
import { useRouter } from 'next/router';
import PessoaForm from '@/components/PessoaForm';
import Navbar from '@/components/Navbar';

const Login = () => {
    const router = useRouter();

    const handleLogin = (user) => {
        localStorage.setItem('person', JSON.stringify(user)); // Salva o usuário logado
        router.push('/dashboard'); // Redireciona para o dashboard
    };

    return (
        <>
            <Navbar />
            <div className="formContainer">
                <img className="img_form" src="/pet_form.jpg" alt="Fundo do Formulário" />
                <div className="formContent">
                    <h2>Login</h2>
                    <PessoaForm isLogin onSubmit={handleLogin} />
                    <p>
                        Não tem cadastro? <a href="/cadastro">Clique aqui para se cadastrar</a>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login;
