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
    }, []);

    useEffect(() => {
        const savedPerson = JSON.parse(localStorage.getItem('person') || '{}');
        if (savedPerson.email) {
            setUserEmail(savedPerson.email);
            setPets(JSON.parse(localStorage.getItem(`pets_${savedPerson.email}`) || '[]'));
            setConfirmedAgendamentos(JSON.parse(localStorage.getItem(`agendamentos_${savedPerson.email}`) || '[]'));
            setAgendamentos(JSON.parse(sessionStorage.getItem(`agendamentos_${savedPerson.email}`) || '[]'));
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
            sessionStorage.setItem(`agendamentos_${userEmail}`, JSON.stringify(updatedAgendamentos));
            setSelectedService(null);
            setSelectedPet('');
            setDate('');
        }
    };

    const handleConfirmAgendamentos = () => {
        const allConfirmedAgendamentos = [...confirmedAgendamentos, ...agendamentos];
        localStorage.setItem(`agendamentos_${userEmail}`, JSON.stringify(allConfirmedAgendamentos));
        setConfirmedAgendamentos(allConfirmedAgendamentos);
        setAgendamentos([]);
        sessionStorage.removeItem(`agendamentos_${userEmail}`);
    };

    return (
        <div className="agendamentoContainer">
            <h1>Serviços disponíveis</h1>
            <ul className="serviceList">
                {services.map(service => (
                    <li key={service.id} className="serviceItem">
                        {service.nome} - R${service.preco.toFixed(2)}
                        <button className="schedule-button" onClick={() => handleAgendar(service)}>Agendar</button>
                    </li>
                ))}
            </ul>

            {selectedService && (
                <div className="agendarForm">
                    <h2>Agendar Serviço: {selectedService.nome}</h2>
                    <select className="pet-select" value={selectedPet} onChange={(e) => setSelectedPet(e.target.value)} required>
                        <option value="">Recarregue a página e selecione seu pet</option>
                        {pets.map(pet => (
                            <option key={pet.id} value={pet.nome}>
                                {pet.nome} ({pet.tipo})
                            </option>
                        ))}
                    </select>
                    <input
                        className="date-input"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                    <button className="add-button" onClick={handleSchedule}>Adicionar ao Agendamento</button>
                </div>
            )}

            <h2>Agendamentos Temporários</h2>
            <ul className="temporary-schedule-list agendamentosList">
                {agendamentos.map(agendamento => (
                    <li key={agendamento.id} className="temporary-schedule-item agendamentoItem">
                        {agendamento.petName} agendou {agendamento.service} para o dia {agendamento.date}
                    </li>
                ))}
            </ul>

            {agendamentos.length > 0 && (
                <button className="confirmButton" onClick={handleConfirmAgendamentos}>Confirmar Agendamentos</button>
            )}

            <h2>Agendamentos Confirmados</h2>
            <ul className="confirmed-schedule-list agendamentosList">
                {confirmedAgendamentos.map(agendamento => (
                    <li key={agendamento.id} className="confirmed-schedule-item agendamentoItem">
                        {agendamento.petName} agendou {agendamento.service} para o dia {agendamento.date}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Agendamento;
