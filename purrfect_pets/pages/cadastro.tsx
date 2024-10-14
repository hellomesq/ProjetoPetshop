import React from 'react';
import { useRouter } from 'next/router';
import PessoaForm from '@/components/PessoaForm';

const Cadastro = () => {
    const router = useRouter();

    const handleCadastro = () => {
        router.push('/dashboard'); // Redireciona para a página do dashboard
    };

    return (
        <div>
            <h2>Cadastro de Pessoa</h2>
            <PessoaForm onSubmit={handleCadastro} />
            <p>
                Já tem cadastro? <a href="/login">Clique aqui para fazer login</a>
            </p>
        </div>
    );
};

export default Cadastro;
