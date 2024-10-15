import React, { useState } from 'react';

const PessoaForm = ({ isLogin, onSubmit }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); // Substitui o campo de idade por senha
    const [name, setName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage(''); // Limpa mensagens de erro a cada tentativa

        if (isLogin) {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const foundUser = users.find(user => user.email === email && user.password === password);

            if (foundUser) {
                alert('Login bem-sucedido!');
                onSubmit(foundUser); // Passa o usuário encontrado para o callback
            } else {
                setErrorMessage('Email ou senha inválidos. Tente novamente.');
            }
        } else {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const existingUser = users.find(user => user.email === email);

            if (existingUser) {
                setErrorMessage('Usuário já cadastrado!');
                return;
            }

            const person = { name, email, password, pets: [], agendamentos: [] };
            users.push(person);
            localStorage.setItem('users', JSON.stringify(users));

            alert('Cadastro salvo com sucesso!');
            onSubmit(); // Redireciona após o cadastro
        }
    };

    return (
        <>
        <form onSubmit={handleSubmit}>
        <div className="formInput">
            {!isLogin && (
                <input
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            )}
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password" // Campo para senha
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            </div>
            <button className="formButton" type="submit">{isLogin ? 'Entrar' : 'Cadastrar'}</button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </form>
        </>
    );
};

export default PessoaForm;
