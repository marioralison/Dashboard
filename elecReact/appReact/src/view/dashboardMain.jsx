import React from "react";
import './styles/dashboardMain.css';

import Logo from './icons/Logo.png';
import Card from './components/card.jsx';
import NavButton from "./components/navigationButton.jsx";
import Main from "./components/pages/dashboard.jsx";
import Print from "./components/pages/impression.jsx";

import iconDash from './icons/Panel.png';
import iconListPrint from './icons/Documents.png';
import iconClient from './icons/Workspace.png';
import iconSell from './icons/Report.png';
import iconChart from './icons/Chart.png';
import iconLogout from './icons/Logout.png';

const Dashboard = () => {
    return (
        <div className="containerDashboard">
            <nav className="navigation">
                <div className="logoSection">
                    <img src={Logo} alt='logo'/>
                </div>
                <div className="navBar">
                    <div className="containerNav">
                        <ul>
                            <li><NavButton title='Tableau de bord' icon={iconDash}></NavButton></li>
                            <li><NavButton title='Liste impression' icon={iconListPrint}></NavButton></li>
                            <li><NavButton title='Clients' icon={iconClient}></NavButton></li>
                            <li><NavButton title='Ventes' icon={iconSell}></NavButton></li>
                            <li><NavButton title='Suivie opération' icon={iconChart}></NavButton></li>
                            <li className="logout"><NavButton title='Sortir' icon={iconLogout}></NavButton></li>
                        </ul>
                    </div>
                </div>
            </nav>

            <section className="container">
                <Main></Main>
            </section>
        </div>
    )
}

export default Dashboard;