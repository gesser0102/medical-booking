
import DoctorSchedule from '../components/DoctorSchedule';
import ScheduleModal from '../components/ScheduleModal';
import WeeklyCalendar from '../components/WeeklyCalendar';
import ConfirmModal from '../components/ConfirmModal';
const AppointmentSchedule = () => {
  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Agendamento de Consultas</h1>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 items-start">
        {/* Calendário Semanal */}
        <WeeklyCalendar />
        {/* Agenda dos médicos */}
        <DoctorSchedule />
      </div>
      {/* Modal para o agendamento */}
      <ScheduleModal />
      <ConfirmModal />
    </div>
  );
};

export default AppointmentSchedule;
