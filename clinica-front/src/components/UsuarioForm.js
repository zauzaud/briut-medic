import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

function UsuarioForm({ usuarioInicial, onSubmit }) {
  const [usuario, setUsuario] = useState(usuarioInicial || { nome: '', tipo: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUsuario(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(usuario);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formNome">
        <Form.Label>Nome</Form.Label>
        <Form.Control
          type="text"
          name="nome"
          value={usuario.nome}
          onChange={handleChange}
          placeholder="Digite o nome do usuário"
        />
      </Form.Group>
      <Form.Group controlId="formTipo">
        <Form.Label>Tipo</Form.Label>
        <Form.Control
          type="text"
          name="tipo"
          value={usuario.tipo}
          onChange={handleChange}
          placeholder="Digite o tipo do usuário"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Salvar
      </Button>
    </Form>
  );
}

export default UsuarioForm;
