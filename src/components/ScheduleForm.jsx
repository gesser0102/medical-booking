import { useSelector, useDispatch } from 'react-redux';
import { bookAppointment } from '../store/scheduleSlice';
import { toast } from 'react-toastify';

const ScheduleForm = () => {
  const doctors = useSelector((state) => state.schedule.doctors);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const doctorId = parseInt(formData.get('doctor'));
    const time = formData.get('time');
    const patient = {
      name: formData.get('name'),
      cpf: formData.get('cpf'),
      dob: formData.get('dob'),
      address: formData.get('address'),
    };

    dispatch(bookAppointment({ doctorId, time, patient }));
    toast.success('Agendamento realizado com sucesso!');
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded-lg mt-6">
      <h2 className="text-lg font-bold mb-4">Agendar Consulta</h2>
      <div className="space-y-4">
        <input
          name="name"
          type="text"
          placeholder="Nome Completo"
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          name="cpf"
          type="text"
          placeholder="CPF"
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          name="dob"
          type="date"
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          name="address"
          type="text"
          placeholder="Endereço"
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <select
          name="doctor"
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.name}
            </option>
          ))}
        </select>
        <input
          name="time"
          type="time"
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Confirmar Agendamento
        </button>
      </div>
    </form>
  );
};

export default ScheduleForm;
