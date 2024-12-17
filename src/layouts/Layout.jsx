import { Outlet } from 'react-router-dom';
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';

const Layout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar fixa */}
      <Sidebar />

      {/* Área principal com scroll no conteúdo */}
      <div className="flex flex-col flex-1">
        {/* Topbar fixa */}
        <Topbar />

        {/* Conteúdo que rola */}
        <main className="p-6 bg-gray-100 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
