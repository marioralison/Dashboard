import '../styles/print.css';
import React, { useState } from "react";

import iconNotification from '../../icons/Notification.png';
import iconUser from '../../icons/Account.png';
import iconAdd from '../../icons/Add.png'

import HeaderMain from "../headerMain.jsx";
import AddButton from "../addButton.jsx";
import Short from "../shortType.jsx";
import ModalPrint from '../modalPrint.jsx';

const Print = () => {

    const [openModal, setOpenModal] = useState(false)

    const handleModal = () => {
        setOpenModal(true)
    }

    return(
        <div className="containerPrint">

            <HeaderMain title='Impressions' iconUser={iconUser} iconNotification={iconNotification}></HeaderMain>

            <div className="searchSection">
                <li onClick={handleModal}><AddButton icon={iconAdd} title='Nouvelle commande'></AddButton></li>
                <div className="shortImpression">
                    <Short option1='Client' option2='Membre'></Short>
                </div>
            </div>

            <div className="blackboard">
                <div className="tableauContainer">
                    <table>
                        <thead>
                            <tr>
                                <th>N°</th>
                                <th>Client</th>
                                <th>Format</th>
                                <th>Nombre</th>
                                <th>Montant Total</th>
                                <th>Date impression</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>10</td>
                                <td>Razanabaovolamirana</td>
                                <td>A4</td>
                                <td>25</td>
                                <td>30 000 Ar</td>
                                <td>12/11/2024</td>
                                <td className="iconAction">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {openModal && <ModalPrint closeModal={setOpenModal}/>}

        </div>
    )
}

export default Print;