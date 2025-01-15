import '../styles/clients.css';
import React, { useState, useEffect } from "react";

import iconNotification from '../../icons/Notification.png';
import iconUser from '../../icons/Account.png';
import iconAdd from '../../icons/Add.png';

import HeaderMain from "../headerMain.jsx";
import AddButton from "../addButton.jsx";
import Short from "../shortListClient.jsx";
import ModalClient from "../modalClient.jsx"

const Client = () => {

    const [openModal, setOpenModal] = useState(false)
    const [client, setClient] = useState([]) //Stockage des données des clients dans un tableau
    const [clientToEdit, setClientToEdit] = useState(null)
    const [ordreTri, setOrdreTri] = useState('croissant')
    const [message, setMessage] = useState('')

    //Chargement du fenetre du tableau
    const fetchClient = async (ordre = 'ASC') => {
        try {
            const dataClient = await window.electronAPI.getClient(ordre)
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
            console.log('Il y a une erreur au niveau de la suppression de client !', error.message)
        }
    }

    const handleSortClientList = (order) => {
        const orderQuery = order === 'croissant' ? 'ASC' : 'DESC'
        setOrdreTri(order)
        fetchClient(orderQuery)
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
                
                <div className="searchBar">
                    
                </div>
                
                <div className="shortClient">
                    <Short 
                        option1='Croissant' 
                        option2='Décroissant'
                        onSelect={handleSortClientList}
                    />
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
                                <th>Total impression A6</th>
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
                                    <td>{client.totalDepense || 0} Ar</td>
                                    <td>{client.numberPhone}</td>
                                    <td className="Action">

                                        <button 
                                            style={{color: '#6D92C2',marginRight: '1.5rem'}}
                                            onClick={() => {handleModal(client)}}
                                        >Modifier</button>

                                        <button
                                            style={{color: '#E84030'}}
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