import { FaRegCalendarAlt, FaListAlt, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="bg-gray-900 text-white w-16 md:w-20 flex flex-col items-center py-4 justify-center">
      <div className="flex flex-col space-y-6 gap-16">
        <Link
          to="/"
          className="flex items-center justify-center w-12 h-12 text-xl hover:text-blue-400"
          title="Agenda"
        >
          <FaHome />
        </Link>

        <Link
          to="/agendamento"
          className="flex items-center justify-center w-12 h-12 text-xl hover:text-blue-400"
          title="Agendamento"
        >
          <FaRegCalendarAlt />
        </Link>

        <Link
          to="/consultas"
          className="flex items-center justify-center w-12 h-12 text-xl hover:text-blue-400"
          title="Configurações"
        >
          <FaListAlt />
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
