import '../styles/print.css';
import React, { useEffect, useState } from "react";
import dayjs from 'dayjs';

import iconNotification from '../../icons/Notification.png';
import iconUser from '../../icons/Account.png';
import iconAdd from '../../icons/Add.png'

import HeaderMain from "../headerMain.jsx";
import AddButton from "../addButton.jsx";
import Short from "../shortTypeImpression.jsx";
import ModalPrint from '../modalPrint.jsx';

const Print = () => {

    const [openModal, setOpenModal] = useState(false)
    const [commands, setCommands] = useState([])
    const [filtredCommands, setFiltredCommands] = useState([])
    const [selectedClientType, setSelectedTypeClient] = useState('Client')

    const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD")); //date courante

    const handleModal = () => {
        setOpenModal(true)
    }

    const fetchProduitImpression = async () => {
        try {
            const commandRows = await window.electronAPI.getCommandesImpression()
            setCommands(commandRows)
            setFiltredCommands(commandRows)
        } catch (error) {
            console.log('Erreur lors de la récupération des commandes', error.message)
        }
    }

    const deleteCommande = async (id_command) => {
        try {
            const result = await window.electronAPI.deleteCommande(id_command)

            if(result.success){
                fetchProduitImpression()
                console.log('Suppression de la commande !')
            }
            else {
                console.log('Erreur lors de la suppression de la commande !', result.message)
            }

        } catch (error) {
            console.log('Il y a une erreur au niveau de la suppression de commande !', error.message)
        }
    }

    const handleClientTypeChange = (type) => {
        setSelectedTypeClient(type)
    }

    const handleDateChange = (date) => {
        setSelectedDate(date)
    }

    //Filtrage des commandes selon le type de client séléctionné et la date
    useEffect(() => {
        let filtered = commands

        if (selectedClientType) {
            filtered = filtered.filter(commande => 
                commande.type_client.toLowerCase() === selectedClientType.toLocaleLowerCase()
            )
        }

        if (selectedDate) {
            filtered = filtered.filter(commande => 
                new Date(commande.date).toISOString().split('T')[0] === selectedDate
            )
        }

        setFiltredCommands(filtered)
    }, [selectedClientType, selectedDate, commands])

    useEffect(() => {
        fetchProduitImpression()
    },[])

    return(
        <div className="containerPrint">

            <HeaderMain title='Impressions' iconUser={iconUser} iconNotification={iconNotification}></HeaderMain>

            <div className="searchSection">
                <li onClick={handleModal}><AddButton icon={iconAdd} title='Nouvelle commande'></AddButton></li>
                <div className="shortImpression">
                    <Short 
                        option1='Client' 
                        option2='Membre'
                        handleSelect={handleClientTypeChange}
                    />
                </div>
                <div className='date-section'>
                    <input 
                        className='select-date'
                        type="date"
                        value={selectedDate}
                        onChange={(e) => handleDateChange(e.target.value)}
                    />
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
                            {filtredCommands.map((commands, index) => (
                                <tr key={index}>
                                    <td>{commands.id}</td>
                                    <td>{commands.nom_client}</td>
                                    <td>{commands.format}</td>
                                    <td>{commands.nombre}</td>
                                    <td>{commands.montant_total} Ar</td>
                                    <td>{commands.date}</td>
                                    <td className="Action">

                                        <button
                                            style={{color: '#E84030'}}
                                            onClick={() => {
                                                deleteCommande(commands.id)
                                            }}
                                        >Supprimer</button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {openModal && 
                <ModalPrint 
                    closeModal={setOpenModal}
                    refreshCommandeTable={fetchProduitImpression}
                />
            }

        </div>
    )
}

export default Print;