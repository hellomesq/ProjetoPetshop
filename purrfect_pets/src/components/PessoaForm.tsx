import React, { useState } from 'react';

const PessoaForm = ({ isLogin, onSubmit }) => {
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [name, setName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage(''); // Limpa mensagens de erro a cada tentativa

        if (isLogin) {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const foundUser = users.find(user => user.email === email && user.age === age);

            if (foundUser) {
                alert('Login bem-sucedido!');
                onSubmit(foundUser); // Passa o usuário encontrado para o callback
            } else {
                setErrorMessage('Email ou idade inválidos. Tente novamente.');
            }
        } else {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const existingUser = users.find(user => user.email === email);

            if (existingUser) {
                setErrorMessage('Usuário já cadastrado!');
                return;
            }

            const person = { name, email, age, pets: [], agendamentos: [] };
            users.push(person);
            localStorage.setItem('users', JSON.stringify(users));

            alert('Cadastro salvo com sucesso!');
            onSubmit(); // Redireciona após o cadastro
        }
    };

    return (
        <form onSubmit={handleSubmit}>
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
                type="number"
                placeholder="Idade"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
            />
            <button type="submit">{isLogin ? 'Entrar' : 'Cadastrar'}</button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </form>
    );
};

export default PessoaForm;
