import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const StatsCard = () => {
  const stats = useSelector((state) => state.stats.stats);

  const [appointments, setAppointments] = useState(0);
  const [patients, setPatients] = useState(0);
  const [revenue, setRevenue] = useState(0);

  // Função de animação genérica
  const animateCounter = (targetValue, setter, duration = 1000) => {
    let startValue = 0;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const newValue = Math.floor(startValue + progress * (targetValue - startValue));

      setter(newValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (stats) {
      animateCounter(stats.appointments, setAppointments);
      animateCounter(stats.patients, setPatients);
      animateCounter(stats.revenue, setRevenue);
    }
  }, [stats]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Agendamentos do Dia */}
      <div className="bg-white shadow-md p-4 rounded-lg text-center">
        <h3 className="text-gray-500">Agendamentos do Dia</h3>
        <p className="text-2xl font-bold">{appointments}</p>
      </div>

      {/* Pacientes Atendidos */}
      <div className="bg-white shadow-md p-4 rounded-lg text-center">
        <h3 className="text-gray-500">Pacientes Atendidos</h3>
        <p className="text-2xl font-bold">{patients}</p>
      </div>

      {/* Faturamento do Dia */}
      <div className="bg-white shadow-md p-4 rounded-lg text-center">
        <h3 className="text-gray-500">Faturamento do Dia</h3>
        <p className="text-2xl font-bold">R$ {revenue}</p>
      </div>
    </div>
  );
};

export default StatsCard;
