import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

function DevLinks() {
    return (
        <div>
            <h4>Links de Desenvolvimento (remover depois)</h4>
            <ul>
                <li><Link to="/usuarios">Usuários</Link></li>
                <li><Link to="/agendamentos">Agendamentos</Link></li>
                <li><Link to="/estoque">Estoque</Link></li>
                <li><Link to="/financeiro">Financeiro</Link></li>
            </ul>
        </div>
    );
}

function Home() {
    return (
        <div className="home-container">
            <div className="login-box">
                <h1>Login</h1>
                <form>
                    <div className="input-group">
                        <label htmlFor="username">Usuário</label>
                        <input type="text" id="username" name="username" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Senha</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <button type="submit">Entrar</button>
                </form>
            </div>
            <DevLinks /> {/* Adicionando os DevLinks para facilitar a navegação durante o desenvolvimento */}
        </div>
    );
}

export default Home;
