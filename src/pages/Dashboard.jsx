import StatsCard from '../components/StatsCard';
import DailyAgenda from '../components/DailyAgenda';
import Notifications from '../components/Notifications';

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Área de Trabalho</h1>

      {/* Dados Estatísticos */}
      <StatsCard />

      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-6">
        {/* Agenda do Dia */}
        <DailyAgenda />
        {/* Avisos e Lembretes */}
        <Notifications />
      </div>
    </div>
  );
};

export default Dashboard;
