import { useSelector } from 'react-redux';

const AgendaCard = () => {
  const agenda = useSelector((state) => state.agenda.agenda);

  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
      <h2 className="text-lg font-bold mb-4">Agenda do Dia</h2>
      <ul className="list-disc pl-4">
        {agenda.map((item, index) => (
          <li key={index} className="mb-2">{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default AgendaCard;
