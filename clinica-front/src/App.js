import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Usuarios from './components/Usuarios';
import UsuarioForm from './components/UsuarioForm';
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/usuarios/novo" element={<UsuarioForm />} />
          <Route path="/usuarios/editar/:id" element={<UsuarioForm />} />
          <Route path="/agendamentos" element={<Agendamentos />} />
          <Route path="/estoque" element={<Estoque />} />
          <Route path="/financeiro" element={<Financeiro />} />
          <Route path="/notfound" element={<NotFound />} />
          <Route path="*" element={<div>Página Não Encontrada</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
