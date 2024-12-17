import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import Dashboard from './pages/Dashboard';
import AppointmentSchedule from './pages/AppointmentSchedule';
import AppointmentsPage from './pages/AppointmentsPage';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

dayjs.locale('pt-br');

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="agendamento" element={<AppointmentSchedule />} />
          <Route path="/consultas" element={<AppointmentsPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
