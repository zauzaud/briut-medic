import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faCalendarAlt, faUsers, faMoneyBillWave, faHandPaper } from '@fortawesome/free-solid-svg-icons';

function IconWithText({ icon, text, to }) {
    return (
        <Link to={to} className="flex items-center gap-3 pr-5 mt-6 max-w-full text-sm leading-5 whitespace-nowrap text-slate-500 hover:text-slate-700">
            <FontAwesomeIcon icon={icon} className="w-5 h-5" />
            <span className="flex-1">{text}</span>
        </Link>
    );
}

function NavBar() {
    const menuItems = [
        { icon: faBox, text: "Estoque", to: "/estoque" },
        { icon: faCalendarAlt, text: "Calendário", to: "/agendamentos" },
        { icon: faUsers, text: "Usuários", to: "/usuarios" },
        { icon: faMoneyBillWave, text: "Financeiro", to: "/financeiro" },
    ];

    return (
        <div className="flex flex-col justify-between h-screen bg-white rounded-2xl shadow-2xl max-w-[280px]">
            <div>
                <header className="flex gap-2 self-start ml-6 text-xl font-semibold leading-7 text-slate-900">
                    <FontAwesomeIcon icon={faMoneyBillWave} className="shrink-0 w-8 h-8" />
                    <h1 className="my-auto">Instituto Briut</h1>
                </header>
                <nav className="mt-14 w-full">
                    {menuItems.map((item, index) => (
                        <IconWithText key={index} icon={item.icon} text={item.text} to={item.to} />
                    ))}
                </nav>
            </div>
            <div className="p-6">
                <hr className="mb-4 border-t border-slate-200" />
                <div className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faHandPaper} className="w-6 h-6 text-slate-500" />
                    <div className="flex flex-col">
                        <span className="text-xs text-slate-500">Bem-Vindo 👋</span>
                        <span className="text-sm text-slate-900">Gabriel</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
