import { useSelector } from 'react-redux';

const StatsCard = () => {
  const stats = useSelector((state) => state.stats.stats);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white shadow-md p-4 rounded-lg text-center">
        <h3 className="text-gray-500">Agendamentos do Dia</h3>
        <p className="text-2xl font-bold">{stats.appointments}</p>
      </div>
      <div className="bg-white shadow-md p-4 rounded-lg text-center">
        <h3 className="text-gray-500">Pacientes Atendidos</h3>
        <p className="text-2xl font-bold">{stats.patients}</p>
      </div>
      <div className="bg-white shadow-md p-4 rounded-lg text-center gap-5">
        <h3 className="text-gray-500">Faturamento do Dia</h3>
        <p className="text-2xl font-bold">R$ {stats.revenue}</p>
      </div>
    </div>
  );
};

export default StatsCard;
