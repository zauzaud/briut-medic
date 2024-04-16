import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">Clinica Médica</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/usuarios">Usuários</Nav.Link>
          <Nav.Link as={Link} to="/agendamentos">Agendamentos</Nav.Link>
          <Nav.Link as={Link} to="/estoque">Estoque</Nav.Link>
          <Nav.Link as={Link} to="/financeiro">Financeiro</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
