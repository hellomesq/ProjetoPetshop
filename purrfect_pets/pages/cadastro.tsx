import React from 'react';
import { useRouter } from 'next/router';
import PessoaForm from '@/components/PessoaForm';
import Navbar from '@/components/Navbar';

const Cadastro = () => {
    const router = useRouter();

    const handleCadastro = () => {
        router.push('/dashboard'); // Redireciona para a página do dashboard
    };

    return (
        <>
            <Navbar />
            <div className="formContainer">
                <img className="img_form" src="/pet_form.jpg" alt="Fundo do Formulário" />
                <div className="formContent">
                    <h2>Cadastro</h2>
                    <PessoaForm onSubmit={handleCadastro} /> {/* Aqui chamamos o form */}
                    <p>
                        Já tem cadastro? <a href="/login">Clique aqui para fazer login</a>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Cadastro;
