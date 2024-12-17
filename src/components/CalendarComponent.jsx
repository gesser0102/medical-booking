import { useSelector, useDispatch } from 'react-redux';
import { setSelectedDate } from '../store/scheduleSlice';
import Calendar from 'react-calendar';

const CalendarComponent = () => {
  const dispatch = useDispatch();
  const doctors = useSelector((state) => state.schedule.doctors);

  const handleDateChange = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    dispatch(setSelectedDate(formattedDate));
  };

  const getAvailableDates = () => {
    // Coleta todas as datas disponíveis nos horários dos médicos
    const allDates = doctors.flatMap((doctor) =>
      doctor.schedule.filter((slot) => slot.available).map((slot) => slot.date)
    );
    return [...new Set(allDates)]; // Remove duplicatas
  };

  const availableDates = getAvailableDates();

  const highlightTile = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = date.toISOString().split('T')[0];
      if (availableDates.includes(formattedDate)) {
        return <div className="bg-green-300 rounded-full h-3 w-3 mx-auto mt-1"></div>;
      }
    }
    return null;
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h2 className="text-lg font-bold mb-4">Selecione uma Data</h2>
      <Calendar onChange={handleDateChange} tileContent={highlightTile} />
    </div>
  );
};

export default CalendarComponent;
