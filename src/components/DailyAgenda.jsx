import { useSelector } from 'react-redux';
import { selectAppointmentsForDay } from '../store/selectors';

const DailyAgenda = () => {
  const appointments = useSelector(selectAppointmentsForDay);

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h2 className="text-lg font-bold mb-4">Agenda do Dia</h2>
      {appointments.length > 0 ? (
        <ul className="space-y-2">
          {appointments.map((appointment, index) => (
            <li
              key={index}
              className="p-2 border-b border-gray-200 flex justify-between items-center"
            >
              <div>
                <p className="font-medium text-gray-700">
                  <strong>Horário:</strong> {appointment.time}
                </p>
                <p className="text-gray-600">
                  <strong>Médico:</strong> {appointment.doctorName}
                </p>
                <p className="text-gray-600">
                  <strong>Paciente:</strong> {appointment.patient.name}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Nenhuma consulta agendada para hoje.</p>
      )}
    </div>
  );
};

export default DailyAgenda;
