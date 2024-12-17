import { useSelector, useDispatch } from 'react-redux';
import { toggleConfirmModal, bookAppointment } from '../store/scheduleSlice';
import { toast } from 'react-toastify';

const ConfirmModal = () => {
  const confirmModalOpen = useSelector((state) => state.schedule.confirmModalOpen);
  const confirmationData = useSelector((state) => state.schedule.confirmationData);
  const dispatch = useDispatch();

  const handlePayment = () => {
    // Adiciona o status "Pago" ao agendamento
    const updatedData = {
      ...confirmationData,
      status: 'Pago', // Define o status como "Pago"
    };

    dispatch(bookAppointment(updatedData)); // Despacha o agendamento atualizado
    dispatch(toggleConfirmModal(false)); // Fecha o modal

    toast.success('Pagamento realizado com sucesso!');
  };

  if (!confirmModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2.5">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Confirmação do Agendamento</h2>
        <p><strong>Nome do Paciente:</strong> {confirmationData?.patient.name}</p>
        <p><strong>Nome do Médico:</strong> {confirmationData?.doctorName}</p>
        <p><strong>Data:</strong> {confirmationData?.date}</p>
        <p><strong>Horário:</strong> {confirmationData?.time}</p>
        <p><strong>Valor da Consulta:</strong> R$ {confirmationData?.price.toFixed(2)}</p>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => dispatch(toggleConfirmModal(false))}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Cancelar
          </button>
          <button
            onClick={handlePayment}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Realizar Pagamento
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
