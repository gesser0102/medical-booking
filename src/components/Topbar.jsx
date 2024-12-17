import { Link } from 'react-router-dom';

const Topbar = () => {
    return (
      <header className="w-full bg-gray-800 text-white p-4">
        <Link to="/">
          <div className="text-center text-2xl font-bold">
            <span className="text-blue-400">Med</span>
            <span className="text-green-400">Agenda</span>
          </div>
        </Link>
      </header>
    );
  };
  
  export default Topbar;
  