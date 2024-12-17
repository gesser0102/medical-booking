import { useSelector, useDispatch } from 'react-redux';
import { setSelectedDate } from '../store/scheduleSlice';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

dayjs.locale('pt-br'); // Configurar idioma global para português

const WeeklyCalendar = () => {
  const dispatch = useDispatch();
  const doctors = useSelector((state) => state.schedule.doctors);
  const selectedDate = useSelector((state) => state.schedule.selectedDate);

  // Gera os dias da semana com base na data selecionada
  const getWeekDays = () => {
    const startOfWeek = dayjs(selectedDate).startOf('week');
    return Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, 'day'));
  };

  // Verifica se um dia tem horários disponíveis
  const hasAvailableSlots = (date) => {
    const formattedDate = date.format('YYYY-MM-DD');
    return doctors.some((doctor) =>
      doctor.schedule.some(
        (slot) => slot.date === formattedDate && slot.available
      )
    );
  };

  const handlePrevWeek = () => {
    const newDate = dayjs(selectedDate).subtract(1, 'week').format('YYYY-MM-DD');
    dispatch(setSelectedDate(newDate));
  };

  const handleNextWeek = () => {
    const newDate = dayjs(selectedDate).add(1, 'week').format('YYYY-MM-DD');
    dispatch(setSelectedDate(newDate));
  };

  const handleToday = () => {
    const today = dayjs().format('YYYY-MM-DD');
    dispatch(setSelectedDate(today));
  };

  const handleSelectDate = (date) => {
    dispatch(setSelectedDate(date.format('YYYY-MM-DD')));
  };

  const weekDays = getWeekDays();

  return (
    <div className="bg-white p-4 md:p-6 shadow-md rounded-lg">
      {/* Cabeçalho do calendário com navegação centralizada */}
      <div className="flex flex-col items-center space-y-4 md:space-y-0 md:flex-row md:justify-between mb-6">
        <h2 className="text-lg md:text-xl font-bold text-gray-700">
          Agenda Semanal
        </h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={handlePrevWeek}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
          >
            {'<'}
          </button>
          <button
            onClick={handleToday}
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
          >
            Hoje
          </button>
          <button
            onClick={handleNextWeek}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
          >
            {'>'}
          </button>
        </div>
      </div>

      {/* Grade do calendário */}
      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-2 md:gap-4 text-center">
        {weekDays.map((day, index) => (
          <div
            key={index}
            className={`flex flex-col items-center cursor-pointer p-2 md:p-4 transition-all duration-200 ${
              day.format('YYYY-MM-DD') === selectedDate
                ? 'bg-blue-500 text-white rounded-md'
                : hasAvailableSlots(day)
                ? 'text-green-600 hover:text-green-700'
                : 'text-gray-500 hover:text-gray-600'
            }`}
            onClick={() => handleSelectDate(day)}
          >
            <span className="text-xs md:text-sm font-medium capitalize">
              {day.format('dddd')} {/* Nome completo do dia da semana */}
            </span>
            <span className="text-lg md:text-xl font-bold">
              {day.format('D')} {/* Número do dia */}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyCalendar;
