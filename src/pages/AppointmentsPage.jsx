import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { updateAppointment } from '../store/scheduleSlice';
import { toast } from 'react-toastify';

dayjs.locale('pt-br');

const AppointmentsPage = () => {
  const appointments = useSelector((state) => state.schedule.appointments);
  const doctors = useSelector((state) => state.schedule.doctors);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]); 

  const openEditModal = (appointment) => {
    setFormData({
      ...appointment,
      date: dayjs(appointment.date).format('YYYY-MM-DD'),
      originalDate: dayjs(appointment.date).format('YYYY-MM-DD'),
      originalTime: appointment.time,
    });
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (!formData) return;

    const doctor = doctors.find((doc) => doc.name === formData.doctorName);
    if (!doctor) return;

    const times = doctor.schedule
      .filter((slot) => slot.date === formData.date && slot.available)
      .map((slot) => slot.time);

    setAvailableTimes(times);

    setFormData((prev) => {
      if (!prev) return prev;

      // Caso não haja horários disponíveis e prev.time não seja vazio, limpar time
      if (times.length === 0 && prev.time !== "") {
        return { ...prev, time: "" };
      }

      // Caso haja horários disponíveis, mas o time atual não está na lista
      if (times.length > 0 && !times.includes(prev.time)) {
        const newTime = times[0];
        if (newTime !== prev.time) {
          return { ...prev, time: newTime };
        }
      }

      return prev;
    });
  }, [formData, doctors]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      if (name === "patientName") {
        return {
          ...prev,
          patient: {
            ...prev.patient,
            name: value,
          },
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  
  const handleSave = () => {
    if (!formData) return;
    const doctor = doctors.find((doc) => doc.name === formData.doctorName);

    // Se a data e horário não foram alterados, a validação passa automaticamente
    if (formData.date === formData.originalDate && formData.time === formData.originalTime) {
      toast.success("Agendamento atualizado com sucesso!");
      dispatch(updateAppointment({ id: formData.id, updatedData: formData }));
      setIsModalOpen(false);
      return;
    }

    // Valida se a nova data e horário estão disponíveis no cronograma do médico
    const isSlotAvailable = doctor.schedule.some(
      (slot) => slot.date === formData.date && slot.time === formData.time && slot.available
    );

    if (!isSlotAvailable) {
      toast.error("A data e o horário selecionados não estão disponíveis.");
      return;
    }

    toast.success("Agendamento atualizado com sucesso!");
    dispatch(updateAppointment({ id: formData.id, updatedData: formData }));
    setIsModalOpen(false);
  };
  
  return (
    <div className="p-2 sm:p-4 bg-gray-100 min-h-screen">
      <h1 className="text-base sm:text-2xl font-bold mb-2 sm:mb-4">Consulta de Agendamentos</h1>
      <div className="bg-white p-2 w-8/12 md:w-full sm:p-4 rounded-lg shadow-md">
        {appointments.length > 0 ? (
          <div className="overflow-x-auto max-w-full">
            <table className="w-full table-auto text-xs sm:text-sm whitespace-nowrap">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-1 sm:p-2">Paciente</th>
                  <th className="p-1 sm:p-2">Médico</th>
                  <th className="p-1 sm:p-2">Data</th>
                  <th className="p-1 sm:p-2">Horário</th>
                  <th className="p-1 sm:p-2">Valor</th>
                  <th className="p-1 sm:p-2">Status</th>
                  <th className="p-1 sm:p-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment, index) => (
                  <tr key={appointment.id || `appointment-${index}`} className="border-b text-center">
                    <td className="p-1 sm:p-2">{appointment.patient.name}</td>
                    <td className="p-1 sm:p-2">{appointment.doctorName}</td>
                    <td className="p-1 sm:p-2">{dayjs(appointment.date).format('DD-MM-YYYY')}</td>
                    <td className="p-1 sm:p-2">{appointment.time}</td>
                    <td className="p-1 sm:p-2">R$ {appointment.price.toFixed(2)}</td>
                    <td className={`p-1 sm:p-2 font-bold ${appointment.status === 'Pago' ? 'text-green-600' : 'text-orange-500'}`}>
                      {appointment.status || 'Pendente'}
                    </td>
                    <td className="p-1 sm:p-2">
                      <button
                        onClick={() => openEditModal(appointment)}
                        className="bg-blue-500 text-white px-2 sm:px-3 py-1 rounded-md hover:bg-blue-600"
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center text-sm sm:text-base">Nenhuma consulta agendada.</p>
        )}
      </div>

      {isModalOpen && formData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
          <div className="bg-white p-2 sm:p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4">Editar Agendamento</h2>
            <div className="space-y-2 sm:space-y-4 text-xs sm:text-base">
              <div>
                <label className="text-gray-600 block mb-1">Nome do Paciente:</label>
                <input
                  name="patientName"
                  value={formData.patient.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="text-gray-600 block mb-1">Data:</label>
                <input
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="text-gray-600 block mb-1">Horário:</label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded text-xs sm:text-sm"
                >
                  {availableTimes.length > 0 ? (
                    availableTimes.map((time, index) => (
                      <option key={`${formData.date}-${time}-${index}`} value={time}>
                        {time}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      Nenhum Horário Disponível
                    </option>
                  )}
                </select>
              </div>
              <div>
                <label className="text-gray-600 block mb-1">Status:</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded text-xs sm:text-sm"
                >
                  <option value="Pendente">Pendente</option>
                  <option value="Pago">Pago</option>
                </select>
              </div>
            </div>
            <div className="flex justify-between mt-2 sm:mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-red-500 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-md hover:bg-red-600 text-xs sm:text-sm"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-md hover:bg-green-600 text-xs sm:text-sm"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsPage;
