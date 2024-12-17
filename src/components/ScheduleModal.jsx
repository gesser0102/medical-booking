import { useSelector, useDispatch } from 'react-redux';
import {
  toggleModal,
  toggleConfirmModal,
  setConfirmationData,
} from '../store/scheduleSlice';
import { useState } from 'react';

const ScheduleModal = () => {
  const modalOpen = useSelector((state) => state.schedule.modalOpen);
  const selectedSlot = useSelector((state) => state.schedule.selectedSlot);
  const doctors = useSelector((state) => state.schedule.doctors);
  const dispatch = useDispatch();

  const [cep, setCep] = useState('');
  const [cpf, setCpf] = useState('');

  // Máscara para o CEP
  const handleCepInput = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 8) value = value.slice(0, 8);
    value = value.replace(/^(\d{5})(\d)/, '$1-$2');
    setCep(value);
  };

  // Máscara para o CPF
  const handleCpfInput = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
    value = value.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
    setCpf(value);
  };

  // Busca o médico e o valor da consulta baseado no ID selecionado
  const selectedDoctor = doctors.find(
    (doctor) => doctor.id === selectedSlot?.doctorId
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Dados do paciente e médico
    const patientData = {
      name: formData.get('name'),
      cpf,
      date: formData.get('date'),
      address: {
        rua: formData.get('rua'),
        bairro: formData.get('bairro'),
        numero: formData.get('numero'),
        complemento: formData.get('complemento'),
        cidade: formData.get('cidade'),
        cep,
      },
    };

    dispatch(
      setConfirmationData({
        patient: patientData,
        doctorName: selectedDoctor.name,
        price: selectedDoctor.price,
        time: selectedSlot.time,
        date: selectedSlot.date,
      })
    );

    // Fecha este modal e abre o modal de confirmação
    dispatch(toggleModal(false));
    dispatch(toggleConfirmModal(true));
  };

  if (!modalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2.5">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Agendar Consulta</h2>
        <p className="text-gray-600 mb-2">
          <strong>Horário:</strong> {selectedSlot?.time}
        </p>
        <p className="text-gray-600 mb-4">
          <strong>Valor da Consulta:</strong> R$ {selectedDoctor?.price?.toFixed(2)}
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-gray-600">Nome Completo:</label>
            <input
              name="name"
              type="text"
              placeholder="Nome Completo"
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="text-gray-600">CPF:</label>
            <input
              name="cpf"
              type="text"
              placeholder="111.222.333-44"
              value={cpf}
              onInput={handleCpfInput}
              maxLength={14}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="text-gray-600">Data:</label>
            <input
              name="date"
              type="date"
              defaultValue={selectedSlot?.date}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="text-gray-600">Rua:</label>
            <input
              name="rua"
              type="text"
              placeholder="Rua"
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="text-gray-600">Número:</label>
              <input
                name="numero"
                type="text"
                placeholder="Número"
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="w-1/2">
              <label className="text-gray-600">Complemento:</label>
              <input
                name="complemento"
                type="text"
                placeholder="Complemento"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div>
            <label className="text-gray-600">Bairro:</label>
            <input
              name="bairro"
              type="text"
              placeholder="Bairro"
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="text-gray-600">Cidade:</label>
            <input
              name="cidade"
              type="text"
              placeholder="Cidade"
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="text-gray-600">CEP:</label>
            <input
              name="cep"
              type="text"
              placeholder="88.010-120"
              value={cep}
              onInput={handleCepInput}
              maxLength={9}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => dispatch(toggleModal(false))}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleModal;
