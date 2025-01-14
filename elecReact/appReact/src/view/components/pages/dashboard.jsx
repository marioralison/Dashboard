import React, { useEffect, useState } from "react";
import '../styles/dashboard.css';

import iconNotification from '../../icons/Notification.png';
import iconUser from '../../icons/Account.png';
import iconFrame from '../../icons/Frame.png';
import iconCash from '../../icons/cash.png';
import iconGallery from '../../icons/Gallery.png';
import iconPlastification from '../../icons/plastification.png';
import iconClient from '../../icons/Workspace.png';

import CardMain from "../cardMain.jsx";
import CardProduct from "../cardProduct.jsx";
import Chart from "../chart.jsx";
import RankingCard from '../rankingCard.jsx';
import HeaderMain from "../headerMain.jsx";

const Main = () => {

    const [totalClientMembre, setTotalClientMembre] = useState(null)
    const [impressionData, setImpressionData] = useState([])
    const [venteData, setVenteData] = useState([])
    const [chiffreAffaire, setChiffreAffaire] = useState(0)
    const [clientClassement, setClientClassement] = useState([])

    //Récuperer le nombre total de client membre inscrit
    const getNombreClientMembre = async () => {
        try {
            const nombreClientMembre = await window.electronAPI.getTotalClientMembre()
            setTotalClientMembre(nombreClientMembre)
        } catch (error) {
            console.log('Erreur lors de la récupération de donnée client membre', error.message)
        }
    }

    //Récupérer les donnée des commandes 'impression'
    const getTotalCommandeImpression = async () => {
        try {
            const dataImpression = await window.electronAPI.getTotalCommandeImpression()
            setImpressionData(dataImpression)
        } catch (error) {
            console.log('Erreur lors de la récupération des données commande', error.message)
        }
    }

    //Récupérer les données des ventes
    const getTotalVente = async () => {
        try {
            const dataVente = await window.electronAPI.getTotalVente()
            setVenteData(dataVente)
        } catch (error) {
            console.log('Erreur lors de la récupération des données vente', error.message)
        }
    }

    //Récupérer le chiffre d'affaire global
    const getChiffreAffaire = async () => {
        try {
            const chiffreAffaire = await window.electronAPI.getChiffreAffaireGlobal()
            setChiffreAffaire(chiffreAffaire.chiffre_affaire_total)
        } catch (error) {
            console.log("Erreur lors de la récupération du chiffre d'affaire", error.message)
        }
    }

    //Récupérer le classement des clients
    const getDataClassementClient = async () => {
        try {
            const dataClassementClient = await window.electronAPI.getClassementClient()
            setClientClassement(dataClassementClient)
        } catch (error) {
            console.log("Erreur lors de la récupération du classement des clients", error.message)
        }
    }

    const getSuffixeClassement = (index) => {
        const suffixes = ["er", "nd"]
        return `${index + 1}${suffixes[index] || "e"}`
    }

    useEffect(() => {
        getNombreClientMembre()
        getTotalCommandeImpression()
        getTotalVente()
        getChiffreAffaire()
        getDataClassementClient()
    }, [])

    return(
        <div className="containerTableau">

            <HeaderMain title='Tableau de bord' iconNotification={iconNotification} iconUser={iconUser}></HeaderMain>

            <div className="products">
                <div className="typeProduct">
                    <CardProduct title="Chiffre d’affaire" icon={iconCash} totalProduct = {`${chiffreAffaire.toLocaleString()} Ar`}>
                    </CardProduct>
                </div>
                <div className="typeProduct">
                    <CardProduct title='Membre inscrit' icon={iconClient} totalProduct = {totalClientMembre} information={totalClientMembre ? 'Membres' : ''}>
                    </CardProduct>
                </div>

                {
                    impressionData.map((data, index) => {
                        return(
                            <div className="typeProduct" key={index}>
                                <CardProduct title={`${data.produit_nom} ${data.format}`} icon={iconGallery} totalProduct ={data.nombre} information={`${data.total_montant.toLocaleString()} Ar`}>
                                </CardProduct>
                            </div>
                        )
                    })
                }

                {
                    venteData.map((data, index) => {
                        return(
                            <div className="typeProduct" key={index}>
                                <CardProduct title={`${data.produit_nom} ${data.format}`} icon={data.produit_id === 2 ? iconFrame : iconPlastification} totalProduct ={data.nombre} information={`${data.total_montant.toLocaleString()} Ar`}>
                                </CardProduct>
                            </div>
                        )
                    })
                }
                
            </div>

            <div className="rapport">
                <Chart rapport="Hebdomadaire"></Chart>
            </div>

            <div className="rankingClient">
                {
                    clientClassement.map((data, index) => (
                        <div className="cardClassement" key={index}>
                            <RankingCard
                                classement={`${getSuffixeClassement(index)} rang`}
                                nomClient={data.nameCLient} 
                                lieuTravail={data.lieuTravail} 
                                matricule={data.matricule} 
                                nombreImpression={data.totalImpression}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Main;