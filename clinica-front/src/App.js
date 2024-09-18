import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Usuarios from './components/Usuarios';
import UsuarioForm from './components/UsuarioForm';
import Pacientes from './components/Pacientes';
import PacienteForm from './components/PacienteForm';
import Calendario from './components/Calendario';
import Estoque from './components/Estoque';
import Financeiro from './components/Financeiro';
import FinanceiroForm from './components/FinanceiroForm';
import Anamnese from './components/Anamnese';
import EditarAnamnese from './components/EditarAnamnese';
import ListaAnamneses from './components/ListaAnamneses';
import NotFound from './components/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Rotas de Usuários */}
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/usuarios/novo" element={<UsuarioForm />} />
          <Route path="/usuarios/editar/:id" element={<UsuarioForm />} />
          
          {/* Rotas de Pacientes */}
          <Route path="/pacientes" element={<Pacientes />} />
          <Route path="/pacientes/novo" element={<PacienteForm />} />
          <Route path="/pacientes/editar/:id" element={<PacienteForm />} />
          
          {/* Rotas de Anamnese */}
          <Route path="/anamnese/:pacienteId" element={<Anamnese />} />
          <Route path="/anamneses" element={<ListaAnamneses />} />
          <Route path="/editar-anamnese/:id" element={<EditarAnamnese />} />


          
          {/* Outras Rotas */}
          <Route path="/agendamentos" element={<Calendario />} />
          <Route path="/estoque" element={<Estoque />} />
          <Route path="/financeiro" element={<Financeiro />} />
          <Route path="/financeiro/novo" element={<FinanceiroForm />} />
          
          {/* Rota de Erro */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;