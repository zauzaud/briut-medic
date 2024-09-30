CREATE DATABASE clinicadb;
USE clinicadb;

CREATE TABLE Usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    tipo ENUM('Médico', 'Nutricionista', 'Terapeuta', 'Admin', 'Recepcionista', 'Bio Medico', 'Esteticista', 'Outros') NOT NULL,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Paciente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    telefone VARCHAR(20),
    data_nascimento DATE,
    genero VARCHAR(20),
    endereco VARCHAR(255),
    cidade VARCHAR(100),
    estado VARCHAR(50),
    cep VARCHAR(10),
    informacoes_medicas TEXT,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Servico (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    duracao INT NOT NULL,  -- duração em minutos
    preco DECIMAL(10, 2) NOT NULL,
    descricao TEXT
);

CREATE TABLE Agendamento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paciente_id INT NOT NULL,
    profissional_id INT NOT NULL,
    servico_id INT NOT NULL,
    data_hora DATETIME NOT NULL,
    data_hora_fim DATETIME NOT NULL,
    status ENUM('Agendado', 'Confirmado', 'Concluido', 'Cancelado') NOT NULL,
    observacoes TEXT,
    FOREIGN KEY (paciente_id) REFERENCES Paciente(id),
    FOREIGN KEY (profissional_id) REFERENCES Usuario(id),
    FOREIGN KEY (servico_id) REFERENCES Servico(id)
);

CREATE TABLE Anamnese (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paciente_id INT NOT NULL,
    tipo_anamnese VARCHAR(50) NOT NULL,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    ultima_atualizacao DATETIME ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (paciente_id) REFERENCES Paciente(id)
);

CREATE TABLE AnamneseRespostas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    anamnese_id INT NOT NULL,
    pergunta VARCHAR(255) NOT NULL,
    resposta TEXT,
    FOREIGN KEY (anamnese_id) REFERENCES Anamnese(id)
);

CREATE TABLE Estoque (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_item VARCHAR(100) NOT NULL,
    quantidade INT NOT NULL,
    data_validade DATE,
    fornecedor VARCHAR(100),
    preco_unitario DECIMAL(10, 2)
);

CREATE TABLE Financeiro (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo_transacao ENUM('Receita', 'Despesa') NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    data DATE NOT NULL,
    paciente_id INT,
    agendamento_id INT,
    profissional_id INT,
    descricao TEXT,
    categoria VARCHAR(100),
    FOREIGN KEY (paciente_id) REFERENCES Paciente(id),
    FOREIGN KEY (agendamento_id) REFERENCES Agendamento(id),
    FOREIGN KEY (profissional_id) REFERENCES Usuario(id)
);

CREATE TABLE ComissaoProfissional (
    id INT AUTO_INCREMENT PRIMARY KEY,
    profissional_id INT NOT NULL,
    servico_id INT NOT NULL,
    percentual_comissao DECIMAL(5, 2) NOT NULL,
    FOREIGN KEY (profissional_id) REFERENCES Usuario(id),
    FOREIGN KEY (servico_id) REFERENCES Servico(id)
);
