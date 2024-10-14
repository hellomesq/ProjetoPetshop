import React, { useEffect, useState } from 'react';

const Agendamento = () => {
    const [services, setServices] = useState([]); // Lista de serviços
    const [agendamentos, setAgendamentos] = useState([]); // Lista de agendamentos temporários
    const [confirmedAgendamentos, setConfirmedAgendamentos] = useState([]); // Lista de agendamentos confirmados
    const [selectedService, setSelectedService] = useState(null); // Serviço selecionado para agendamento
    const [petName, setPetName] = useState(''); // Nome do pet
    const [date, setDate] = useState(''); // Data do agendamento

    // Carregar os serviços e os agendamentos ao carregar o componente
    useEffect(() => {
        const fetchServices = async () => {
            const res = await fetch('/api/services');
            const data = await res.json();
            setServices(data);
        };
        fetchServices();
        
        // Carregar agendamentos do sessionStorage ao iniciar
        const storedAgendamentos = JSON.parse(sessionStorage.getItem('agendamentos') || '[]');
        setAgendamentos(storedAgendamentos);

        // Carregar agendamentos confirmados do localStorage
        const savedAgendamentos = JSON.parse(localStorage.getItem('agendamentos') || '[]');
        setConfirmedAgendamentos(savedAgendamentos);
    }, []);

    // Função para selecionar um serviço para agendamento
    const handleAgendar = (service) => {
        setSelectedService(service);
    };

    // Função para adicionar o serviço ao agendamento
    const handleSchedule = () => {
        if (petName && date && selectedService) {
            const newAgendamento = {
                id: Date.now(),
                service: selectedService.nome,
                petName,
                date,
            };
            const updatedAgendamentos = [...agendamentos, newAgendamento];
            setAgendamentos(updatedAgendamentos);
            
            // Salvar agendamentos no sessionStorage
            sessionStorage.setItem('agendamentos', JSON.stringify(updatedAgendamentos));

            // Limpar os campos após o agendamento
            setSelectedService(null);
            setPetName('');
            setDate('');
        }
    };

    // Função para confirmar agendamentos e salvar no localStorage
    const handleConfirmAgendamentos = () => {
        // Combine agendamentos confirmados anteriores com os novos agendamentos
        const allConfirmedAgendamentos = [...confirmedAgendamentos, ...agendamentos];
        
        localStorage.setItem('agendamentos', JSON.stringify(allConfirmedAgendamentos));
        alert('Agendamentos confirmados e salvos permanentemente!');
        setConfirmedAgendamentos(allConfirmedAgendamentos); // Atualiza a lista de agendamentos confirmados
        setAgendamentos([]); // Limpar agendamentos após confirmação
        sessionStorage.removeItem('agendamentos'); // Limpar sessionStorage
    };

    return (
        <div>
            <h1>Gerenciar Serviços</h1>
            <ul>
                {services.map(service => (
                    <li key={service.id}>
                        {service.nome} - R${service.preco.toFixed(2)}
                        <button onClick={() => handleAgendar(service)}>Agendar</button>
                    </li>
                ))}
            </ul>

            {selectedService && (
                <div>
                    <h2>Agendar Serviço: {selectedService.nome}</h2>
                    <input
                        type="text"
                        placeholder="Nome do Pet"
                        value={petName}
                        onChange={(e) => setPetName(e.target.value)}
                        required
                    />
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                    <button onClick={handleSchedule}>Adicionar ao Agendamento</button>
                </div>
            )}

            <h2>Agendamentos Temporários</h2>
            <ul>
                {agendamentos.map(agendamento => (
                    <li key={agendamento.id}>
                        {agendamento.petName} agendou {agendamento.service} para o dia {agendamento.date}
                    </li>
                ))}
            </ul>

            {agendamentos.length > 0 && (
                <button onClick={handleConfirmAgendamentos}>Confirmar Agendamentos</button>
            )}

            <h2>Agendamentos Confirmados</h2>
            <ul>
                {confirmedAgendamentos.map(agendamento => (
                    <li key={agendamento.id}>
                        {agendamento.petName} agendou {agendamento.service} para o dia {agendamento.date}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Agendamento;
