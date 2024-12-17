import { FaRegCalendarAlt, FaUser, FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="bg-gray-900 text-white w-16 md:w-20 flex flex-col items-center py-4 justify-center">
      <div className="flex flex-col space-y-6 gap-16">
        {/* Ícone 1 */}
        <Link
          to="/"
          className="flex items-center justify-center w-12 h-12 text-xl hover:text-blue-400"
          title="Agenda"
        >
          <FaRegCalendarAlt />
        </Link>

        {/* Ícone 2 */}
        <Link
          to="/agendamento"
          className="flex items-center justify-center w-12 h-12 text-xl hover:text-blue-400"
          title="Agendamento"
        >
          <FaUser />
        </Link>

        {/* Ícone 3 */}
        <Link
          to="/configuracoes"
          className="flex items-center justify-center w-12 h-12 text-xl hover:text-blue-400"
          title="Configurações"
        >
          <FaCog />
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
