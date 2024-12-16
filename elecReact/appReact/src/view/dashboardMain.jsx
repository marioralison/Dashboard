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
import iconChart from './icons/Chart.png';
import iconLogout from './icons/Logout.png';
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

    const navigate = useNavigate()

    //état pour suivre le composant actif
    const [activePage, setActivePage] = useState('')

    const logOut = () => {
        navigate('/')
    }

    const navigateToPrint = () => {
        setActivePage("print")
    }

    const navigateToMain = () => {
        setActivePage("main")
    }

    const navigateToClient = () => {
        setActivePage("client")
    }

    const navigateToVente = () => {
        setActivePage("vente")
    }

    const renderComponent = () => {
        if (activePage === "print") return <Print/>;
        if (activePage === "client") return <Client/>;
        if (activePage === "vente") return <Vente/>;
        return <Main />
    }

    return (
        <div className="containerDashboard">
            <nav className="navigation">
                <div className="logoSection">
                    <img src={Logo} alt='logo'/>
                </div>
                <div className="navBar">
                    <div className="containerNav">
                        <ul>
                            <li onClick={navigateToMain}><NavButton title='Tableau de bord' icon={iconDash}></NavButton></li>
                            <li onClick={navigateToPrint}><NavButton title='Liste impression' icon={iconListPrint}></NavButton></li>
                            <li onClick={navigateToClient}><NavButton title='Clients' icon={iconClient}></NavButton></li>
                            <li onClick={navigateToVente}><NavButton title='Ventes' icon={iconSell}></NavButton></li>
                            <li><NavButton title='Suivie opération' icon={iconChart}></NavButton></li>
                            <li className="logout" onClick={logOut}><NavButton title='Sortir' icon={iconLogout}></NavButton></li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="bodyDashboard">
                {/* Affichage dynamique du composant */}
                {/* {renderComponent()} */}
                <Print></Print>
            </div>
        </div>
    )
}

export default Dashboard;