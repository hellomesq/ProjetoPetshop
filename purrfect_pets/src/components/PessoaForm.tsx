import React, { useState } from 'react';

const PessoaForm = ({ isLogin, onSubmit }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const [name, setName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage(''); 

        if (isLogin) {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const foundUser = users.find(user => user.email === email && user.password === password);

            if (foundUser) {
                alert('Login bem-sucedido!');
                onSubmit(foundUser); 
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
            onSubmit(); 
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
                type="password" 
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
