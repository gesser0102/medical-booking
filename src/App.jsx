import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Rotas com o Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          {/* Adicione outras páginas aqui */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
