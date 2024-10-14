import React, { useEffect, useState } from 'react';

const Agendamento = () => {
    const [services, setServices] = useState([]);
    const [agendamentos, setAgendamentos] = useState([]);
    const [confirmedAgendamentos, setConfirmedAgendamentos] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [selectedPet, setSelectedPet] = useState('');
    const [pets, setPets] = useState([]);
    const [date, setDate] = useState('');
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const fetchServices = async () => {
            const res = await fetch('/api/services');
            const data = await res.json();
            setServices(data);
        };

        fetchServices();

        const savedPerson = JSON.parse(localStorage.getItem('person') || '{}');
        if (savedPerson.email) {
            setUserEmail(savedPerson.email);
            // Carregar agendamentos confirmados do localStorage
            const savedAgendamentos = JSON.parse(localStorage.getItem(`agendamentos_${savedPerson.email}`) || '[]');
            setConfirmedAgendamentos(savedAgendamentos);

            // Carregar pets cadastrados do localStorage
            const storedPets = JSON.parse(localStorage.getItem(`pets_${savedPerson.email}`) || '[]');
            setPets(storedPets);

            // Carregar agendamentos temporários do sessionStorage
            const storedAgendamentos = JSON.parse(sessionStorage.getItem(`agendamentos_${savedPerson.email}`) || '[]');
            setAgendamentos(storedAgendamentos);
        }
    }, []);

    const handleAgendar = (service) => {
        setSelectedService(service);
    };

    const handleSchedule = () => {
        if (selectedPet && date && selectedService) {
            const newAgendamento = {
                id: Date.now(),
                service: selectedService.nome,
                petName: selectedPet,
                date,
            };
            const updatedAgendamentos = [...agendamentos, newAgendamento];
            setAgendamentos(updatedAgendamentos);

            // Salvar agendamentos temporários no sessionStorage
            sessionStorage.setItem(`agendamentos_${userEmail}`, JSON.stringify(updatedAgendamentos));

            // Limpar os campos após adicionar
            setSelectedService(null);
            setSelectedPet('');
            setDate('');
        }
    };

    const handleConfirmAgendamentos = () => {
        const allConfirmedAgendamentos = [...confirmedAgendamentos, ...agendamentos];

        // Salvar agendamentos confirmados no localStorage
        localStorage.setItem(`agendamentos_${userEmail}`, JSON.stringify(allConfirmedAgendamentos));

        alert('Agendamentos confirmados e salvos permanentemente!');

        setConfirmedAgendamentos(allConfirmedAgendamentos);
        setAgendamentos([]);
        sessionStorage.removeItem(`agendamentos_${userEmail}`);
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
                    <select value={selectedPet} onChange={(e) => setSelectedPet(e.target.value)} required>
                        <option value="">Selecione um pet</option>
                        {pets.map(pet => (
                            <option key={pet.id} value={pet.nome}>
                                {pet.nome} ({pet.tipo})
                            </option>
                        ))}
                    </select>
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
