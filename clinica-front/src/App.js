import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Usuarios from './components/Usuarios';
import Agendamentos from './components/Agendamentos';
import Estoque from './components/Estoque';
import Financeiro from './components/Financeiro';
import NotFound from './components/NotFound';  // Um componente para tratar rotas não encontradas
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

function App() {
  return (
    <Router>
      <div>
        <div className>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/agendamentos" element={<Agendamentos />} />
            <Route path="/estoque" element={<Estoque />} />
            <Route path="/financeiro" element={<Financeiro />} />
            <Route path="*" element={<div>Página Não Encontrada</div>} />
            <Route path="/notfound" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
