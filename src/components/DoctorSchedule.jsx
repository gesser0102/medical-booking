import { useSelector, useDispatch } from 'react-redux';
import { toggleModal, setSelectedSlot } from '../store/scheduleSlice';

const DoctorSchedule = () => {
  const doctors = useSelector((state) => state.schedule.doctors);
  const selectedDate = useSelector((state) => state.schedule.selectedDate);
  const dispatch = useDispatch();

  const handleOpenModal = (doctorId, time) => {
    dispatch(setSelectedSlot({ doctorId, time, date: selectedDate }));
    dispatch(toggleModal(true));
  };

  // Filtra os horários disponíveis apenas para a data selecionada
  const filteredDoctors = doctors.map((doctor) => ({
    ...doctor,
    schedule: doctor.schedule.filter((slot) => slot.available && slot.date === selectedDate),
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {filteredDoctors.map((doctor) => (
        <div key={doctor.id} className="p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-lg font-bold mb-4">{doctor.name}</h2>
          {doctor.schedule.length > 0 ? (
            <ul className="space-y-2">
              {doctor.schedule.map((slot, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center p-2 rounded-md bg-green-100"
                >
                  <span>{slot.time}</span>
                  <button
                    onClick={() => handleOpenModal(doctor.id, slot.time)}
                    className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
                  >
                    Agendar
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Nenhum horário disponível.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default DoctorSchedule;
