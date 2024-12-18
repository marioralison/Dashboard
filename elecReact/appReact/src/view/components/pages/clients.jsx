import '../styles/clients.css';
import React, { useState, useEffect } from "react";

import iconNotification from '../../icons/Notification.png';
import iconUser from '../../icons/Account.png';
import iconAdd from '../../icons/Add.png';

import HeaderMain from "../headerMain.jsx";
import AddButton from "../addButton.jsx";
import Short from "../shortType.jsx";
import ModalClient from "../modalClient.jsx"

const Client = () => {

    const [openModal, setOpenModal] = useState(false)
    const [client, setClient] = useState([]) //Stockage des données des clients dans un tableau
    const [clientToEdit, setClientToEdit] = useState(null)
    const [message, setMessage] = useState('')

    //Chargement du fenetre du tableau
    const fetchClient = async () => {
        try {
            const dataClient = await window.electronAPI.getClient()
            setClient(dataClient)
        } catch (error) {
            setMessage('Erreur lors de la récupération des données')
        }
    }

    //Gestion de l'état du modal, si 'null' : ajout nouveau client, si 'client' : modification info client
    const handleModal = (client = null) => {
        setClientToEdit(client)
        setOpenModal(true)
    }

    //Enregistrement client
    const handleSaveDataClient = async (matricule, nameClient, lieuTravail, numberPhone) => {
        try {
            
            //Ajout ou modification d'information client
            const result = clientToEdit
                ? await window.electronAPI.updateClient(matricule, nameClient, lieuTravail, numberPhone)
                : await window.electronAPI.addClient(matricule, nameClient, lieuTravail, numberPhone)
            
        } catch (error) {
            console.error("Erreur de la fonction de sauvegarde !", error.message)
        }
    }

    //Suppression client
    const deleteClient = async (matricule) => {
        try {   
            const result = await window.electronAPI.deleteClient(matricule)
            
            if(result.success){
                fetchClient()
                console.log('Suppression effectué !')
            }
            else{
                console.log('Erreur lors de la suppression du client !', result.message)
            }

        } catch (error) {
            console.log('Il y a une erreur au niveau de la suppression !', error.message)
        }
    }

    //Synchnorisation de l'ajout et la chargement du fenetre
    useEffect(() => {
        fetchClient()
    }, [])

    return(
        <div className="containerClient">

            <HeaderMain title='Clients enregistrés' iconUser={iconUser} iconNotification={iconNotification}></HeaderMain>

            <div className="searchSection">
                <li onClick={() => handleModal()}><AddButton icon={iconAdd} title='Nouveau client'></AddButton></li>
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
                                <th>Lieu travail</th>
                                <th>Total impression</th>
                                <th>Total Dépense</th>
                                <th>Téléphone</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {client.map((client, index) => (
                                <tr key={index}>
                                    <td>{client.matricule}</td>
                                    <td>{client.nameCLient}</td>
                                    <td>{client.lieuTravail}</td>
                                    <td>{client.totalImpression || 0}</td>
                                    <td>{client.totalDepense || 0}</td>
                                    <td>{client.numberPhone}</td>
                                    <td className="Action">

                                        <button 
                                            style={{color: 'blue',marginRight: '1.5rem'}}
                                            onClick={() => {handleModal(client)}}
                                        >Modifier</button>

                                        <button
                                            style={{color: 'red'}}
                                            onClick={() => {
                                                deleteClient(client.matricule)
                                            }}
                                        >Supprimer</button>

                                    </td>
                                </tr>
                            )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {openModal && 
                <ModalClient
                    toggleModal={() => setOpenModal(false)}
                    refreshClientTable={fetchClient}
                    clientToEdit={clientToEdit}
                    onSave={handleSaveDataClient}
                />
            }
        </div>
    )
}

export default Client;