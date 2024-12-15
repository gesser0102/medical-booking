import { FaRegCalendarAlt, FaUser, FaCog } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <aside className="bg-gray-900 text-white w-16 md:w-20 flex flex-col items-center py-4 justify-center">
      <div className="flex flex-col space-y-6 gap-16">
        {/* Icone 1 */}
        <button className="text-xl hover:text-blue-400">
          <FaRegCalendarAlt />
        </button>

        {/* Icone 2 */}
        <button className="text-xl hover:text-blue-400">
          <FaUser />
        </button>

        {/* Icone 3 */}
        <button className="text-xl hover:text-blue-400">
          <FaCog />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
