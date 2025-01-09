import React, { useState } from "react";
import './styles/dashboardMain.css';

import Logo from './icons/Logo.png';
import NavButton from "./components/navigationButton.jsx";
import Main from "./components/pages/dashboard.jsx";
import Print from "./components/pages/impression.jsx";
import Client from "./components/pages/clients.jsx";
import Vente from "./components/pages/vente.jsx";

import iconDash from './icons/Panel.png';
import iconListPrint from './icons/Documents.png';
import iconClient from './icons/Workspace.png';
import iconSell from './icons/Report.png';
import iconLogout from './icons/Logout.png';
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    const [activePage, setActivePage] = useState('main'); // Initialise avec la page par défaut

    const logOut = () => {
        navigate('/');
    };

    const navigateToPage = (page) => {
        setActivePage(page); // Définit la page active
    };

    const renderComponent = () => {
        if (activePage === "print") return <Print />;
        if (activePage === "client") return <Client />;
        if (activePage === "vente") return <Vente />;
        return <Main />;
    };

    return (
        <div className="containerDashboard">
            <nav className="navigation">
                <div className="logoSection">
                    <img src={Logo} alt='logo' />
                </div>
                <div className="navBar">
                    <div className="containerNav">
                        <ul>
                            <li
                                onClick={() => navigateToPage("main")}
                                className={activePage === "main" ? "active" : ""}
                            >
                                <NavButton title="Tableau de bord" icon={iconDash}></NavButton>
                            </li>
                            <li
                                onClick={() => navigateToPage("print")}
                                className={activePage === "print" ? "active" : ""}
                            >
                                <NavButton title="Impression" icon={iconListPrint}></NavButton>
                            </li>
                            <li
                                onClick={() => navigateToPage("vente")}
                                className={activePage === "vente" ? "active" : ""}
                            >
                                <NavButton title="Ventes" icon={iconSell}></NavButton>
                            </li>
                            <li
                                onClick={() => navigateToPage("client")}
                                className={activePage === "client" ? "active" : ""}
                            >
                                <NavButton title="Clients" icon={iconClient}></NavButton>
                            </li>
                            <li
                                className={`logout ${activePage === "logout" ? "active" : ""}`}
                                onClick={() => logOut()}
                            >
                                <NavButton title="Sortir" icon={iconLogout}></NavButton>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="bodyDashboard">
                {renderComponent()}
            </div>
        </div>
    );
};

export default Dashboard;
