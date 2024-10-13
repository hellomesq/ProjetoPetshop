import { useState } from 'react';

const ServiceForm = () => {
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState(0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const service = { nome, preco };
        const services = JSON.parse(localStorage.getItem('services') || '[]');
        services.push(service);
        localStorage.setItem('services', JSON.stringify(services));

        // Limpar o formulário após o envio
        setNome('');
        setPreco(0);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Cadastro de Serviço</h2>
            <input
                type="text"
                placeholder="Nome do Serviço"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Preço do Serviço"
                value={preco}
                onChange={(e) => setPreco(Number(e.target.value))}
                required
            />
            <button type="submit">Cadastrar Serviço</button>
        </form>
    );
};

export default ServiceForm;
