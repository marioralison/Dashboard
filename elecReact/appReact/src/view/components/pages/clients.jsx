import '../styles/clients.css';
import React, { useState } from "react";

import iconNotification from '../../icons/Notification.png';
import iconUser from '../../icons/Account.png';
import iconAdd from '../../icons/Add.png'

import HeaderMain from "../headerMain.jsx";
import AddButton from "../addButton.jsx";
import Short from "../shortType.jsx";
import ModalClient from "../modalClient.jsx"

const Client = () => {

    const [openModal, setOpenModal] = useState(false)

    const handleModal = () => {
        setOpenModal(true)
    }

    return(
        <div className="containerClient">

            <HeaderMain title='Clients enregistrés' iconUser={iconUser} iconNotification={iconNotification}></HeaderMain>

            <div className="searchSection">
                <li onClick={handleModal}><AddButton icon={iconAdd} title='Nouveau client'></AddButton></li>
                <div className="shortClient">
                    <Short option1='Croissant' option2='Décroissant'></Short>
                </div>
            </div>

            <div className="blackboard">
                <div className="tableauContainer">
                    <table>
                        <thead>
                            <tr>
                                <th>Matricule</th>
                                <th>Client</th>
                                <th>Total photo</th>
                                <th>A4 imprimé</th>
                                <th>Lieu travail</th>
                                <th>Téléphone</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>10</td>
                                <td>Razanabaovolamirana</td>
                                <td>200</td>
                                <td>11</td>
                                <td>Antananarivo</td>
                                <td>12/11/2024</td>
                                <td className="iconAction">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {openModal && <ModalClient closeModal={setOpenModal}/>}

        </div>
    )
}

export default Client;