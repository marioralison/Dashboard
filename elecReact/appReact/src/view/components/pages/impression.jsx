import React from "react";
import '../styles/print.css';
import iconNotification from '../../icons/Notification.png';
import iconUser from '../../icons/Account.png';
import iconAdd from '../../icons/Add.png'

import HeaderMain from "../headerMain.jsx";
import AddButton from "../addButton.jsx";
import Short from "../shortType.jsx";

const Print = () => {
    return(
        <div className="containerPrint">

            <div className="headerPrint">
                <HeaderMain title='Impressions' iconUser={iconUser} iconNotification={iconNotification}></HeaderMain>
            </div>

            <div className="searchSection">
                <AddButton icon={iconAdd} title='Nouvelle commande'></AddButton>
                <div className="shortImpression">
                    <Short></Short>
                    <h3>Total : 250</h3>
                </div>
            </div>

            <div className="printTableau"></div>

        </div>
    )
}

export default Print;