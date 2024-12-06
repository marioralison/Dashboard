import '../styles/vente.css';
import React, { useState } from "react";

import iconNotification from '../../icons/Notification.png';
import iconUser from '../../icons/Account.png';
import iconAdd from '../../icons/Add.png'

import HeaderMain from "../headerMain.jsx";
import AddButton from "../addButton.jsx";
import Short from "../shortType.jsx";
import ModalVente from '../modalVente.jsx';

const Vente = () => {

    const [openModal, setOpenModal] = useState(false)

    const handleModal = () => {
        setOpenModal(true)
    }

    return(
        <div className="containerVente">

            <HeaderMain title='Vente effectuée' iconUser={iconUser} iconNotification={iconNotification}></HeaderMain>

            <div className="searchSection">
                <li onClick={handleModal}><AddButton icon={iconAdd} title='Nouvelle vente'></AddButton></li>
                <div className="shortVente">
                    <Short option1='Cadre' option2='Papier'></Short>
                </div>
            </div>

            <div className="blackboard">
                <div className="tableauContainer">
                    <table>
                        <thead>
                            <tr>
                                <th>N°</th>
                                <th>Client</th>
                                <th>Catégorie</th>
                                <th>Nombre</th>
                                <th>Montant Total</th>
                                <th>Date vente</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>10</td>
                                <td>Razanabaovolamirana</td>
                                <td>Cadre A4</td>
                                <td>11</td>
                                <td>2000 Ar</td>
                                <td>12/11/2024</td>
                                <td className="iconAction">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {openModal && <ModalVente closeModal={setOpenModal}/>}

        </div>
    )
}

export default Vente;