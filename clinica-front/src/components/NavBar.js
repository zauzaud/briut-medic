// src/components/NavBar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faCalendarAlt, faBox, faDollarSign } from '@fortawesome/free-solid-svg-icons';

function NavBar() {
    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => setCollapsed(!collapsed);

    return (
        <div className={`navbar ${collapsed ? 'collapsed' : ''}`} onClick={toggleNavbar}>
            <ul>
                <li><Link to="/"><FontAwesomeIcon icon={faHome} /><span className="link-text">Home</span></Link></li>
                <li><Link to="/usuarios"><FontAwesomeIcon icon={faUser} /><span className="link-text">Usuários</span></Link></li>
                <li><Link to="/agendamentos"><FontAwesomeIcon icon={faCalendarAlt} /><span className="link-text">Agendamentos</span></Link></li>
                <li><Link to="/estoque"><FontAwesomeIcon icon={faBox} /><span className="link-text">Estoque</span></Link></li>
                <li><Link to="/financeiro"><FontAwesomeIcon icon={faDollarSign} /><span className="link-text">Financeiro</span></Link></li>
            </ul>
        </div>
    );
}

export default NavBar;
