import React, { useEffect, useState } from "react";
import '../styles/vente.css';
import iconNotification from '../../icons/Notification.png';
import iconUser from '../../icons/Account.png';
import iconAdd from '../../icons/Add.png';
import HeaderMain from "../headerMain.jsx";
import AddButton from "../addButton.jsx";
import Short from "../shortTypeVente.jsx";
import ModalVente from '../modalVente.jsx';

const Vente = () => {

    const [openModal, setOpenModal] = useState(false)
    const [ventes, setVentes] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('Cadre')

    const handleModal = () => {
        setOpenModal(true)
    }

    const fetchVentes = async () => {
        try {
            const venteRows = await window.electronAPI.getVentes()
            setVentes(venteRows)
        } catch (error) {
            console.log('Erreur lors de la récupération des données', error.message)
        }
    }

    const deleteVenteRow = async (id) => {
        try {
            const result = await window.electronAPI.deleteVenteRow(id)
            if (result.success) {
                fetchVentes()
                console.log('Suppression effectuée avec succès !')
            } else {
                console.log('Erreur lors de la suppression de commande', error.message)
            }
        } catch (error) {
            console.log('Il y a une erreur au niveau de la suppression de commande !', error.message)
        }
    }

    // Fonction pour filtrer les ventes en fonction de la catégorie sélectionnée
    const filteredVentes = selectedCategory
        ? ventes.filter((vente) => vente.categorie.toLowerCase().includes(selectedCategory.toLowerCase()))
        : ventes;

    useEffect(() => {
        fetchVentes()
    }, [])

    return(
        <div className="containerVente">

            <HeaderMain title='Vente effectuée' iconUser={iconUser} iconNotification={iconNotification}></HeaderMain>

            <div className="searchSection">
                <li onClick={handleModal}><AddButton icon={iconAdd} title='Nouvelle vente'></AddButton></li>
                <div className="shortVente">
                    <Short 
                        option1="Cadre"  // Option 1 : Cadre
                        option2="Plastification"  // Option 2 : Plastification
                        onSelect={(category) => setSelectedCategory(category)}  // Gestion de la sélection
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
                                <th>Catégorie</th>
                                <th>Nombre</th>
                                <th>Montant Total</th>
                                <th>Date vente</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredVentes.map((vente, index) => (
                                <tr key={index}>
                                    <td>{vente.id}</td>
                                    <td>{vente.nom_client}</td>
                                    <td>{vente.categorie} - {vente.format}</td>
                                    <td>{vente.nombre}</td>
                                    <td>{vente.montant_total} Ar</td>
                                    <td>{vente.date}</td>
                                    <td className="iconAction">
                                        <button
                                            style={{color: 'red'}}
                                            onClick={ () => deleteVenteRow(vente.id) }
                                        >Supprimer</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {openModal && 
                <ModalVente 
                    closeModal={setOpenModal}
                    refreshVenteTableau={fetchVentes}
                />
            }

        </div>
    )
}

export default Vente;