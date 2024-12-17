import { Outlet } from 'react-router-dom';
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Layout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar fixa */}
      <Sidebar />

      <div className="flex flex-col flex-1">
        {/* Topbar fixa */}
        <Topbar />

        <main className="p-6 bg-gray-100 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick theme="dark" />
    </div>
  );
};

export default Layout;
