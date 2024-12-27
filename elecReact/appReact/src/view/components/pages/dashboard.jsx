import React, { useState } from "react";
import '../styles/dashboard.css';

import iconNotification from '../../icons/Notification.png';
import iconUser from '../../icons/Account.png';
import iconFrame from '../../icons/Frame.png';
import iconCash from '../../icons/cash.png';
import iconGallery from '../../icons/Gallery.png';
import iconImage from '../../icons/Image.png';
import iconClient from '../../icons/Workspace.png';

import CardMain from "../cardMain.jsx";
import CardProduct from "../cardProduct.jsx";
import Chart from "../chart.jsx";
import RankingCard from '../rankingCard.jsx';
import HeaderMain from "../headerMain.jsx";

const Main = () => {

    const [nombreTotalA5, setNombreTotalA5] = useState(null) 
    const [prixTotalA5, setPrixTotalA5] = useState(null)
    const [nombreTotalA4, setNombreTotalA4] = useState(null)
    const [prixTotalA4, setPrixTotalA4] = useState(null)

    //Contenu produit
    const products = [
        {
            nom: "A5 imprimé",
            nombre: "250",
            prix: "2500 Ar",
            icon: './src/view/icons/Gallery.png'
        },
        {
            nom: "A5 imprimé",
            nombre: "250",
            prix: "2500 Ar",
            icon: './src/view/icons/Gallery.png'
        },
        {
            nom: "A5 imprimé",
            nombre: "250",
            prix: "2500 Ar",
            icon: './src/view/icons/Gallery.png'
        },
    ]

    return(
        <div className="containerTableau">

            <HeaderMain title='Tableau de bord' iconNotification={iconNotification} iconUser={iconUser}></HeaderMain>

            <div className="short">
                <div className="shortType">
                    <CardMain>
                        <div className="shortContent">
                            <input type="radio" id="semaine" value="Semaine" name="short" defaultChecked/>
                            <label htmlFor="semaine" className="shortTitle">Semaine</label>
                        </div>
                        <div className="shortContent">
                            <input type="radio" id="mois" value="Mois" name="short"/>
                            <label htmlFor="mois" className="shortTitle">Mois</label>
                        </div>
                        <div className="shortContent">
                            <input type="radio" id="Annee" value="Annee" name="short"/>
                            <label htmlFor="Annee" className="shortTitle">Année</label>
                        </div>
                    </CardMain>
                </div>
            </div>

            <div className="products">
                {
                    products.map((product, index) => {
                        return(
                            <div className="typeProduct" key={product.id || index}>
                                <CardProduct title={product.nom} icon={product.icon} totalProduct ={product.nombre} totalPrice={product.prix}>
                                </CardProduct>
                            </div>
                        )
                    })
                }
                <div className="typeProduct">
                    <CardProduct title='Client enregistré' icon={iconClient} totalProduct = "125">
                    </CardProduct>
                </div>
                <div className="typeProduct">
                    <CardProduct title="Chiffre d’affaire" icon={iconCash} totalProduct = "125">
                    </CardProduct>
                </div>
            </div>

            <div className="rapport">
                <Chart rapport="Hebdomadaire"></Chart>
            </div>

            <div className="rankingClient">
                <div className="cardClassement">
                    <RankingCard classement="1er rang" nomClient='Mario ralison' lieuTravail='Ambalavao' matricule='256' nombreImpression='124'></RankingCard>
                </div>
                <div className="cardClassement">
                    <RankingCard classement="2nd rang" nomClient='Mario ralison' lieuTravail='Ambalavao' matricule='256' nombreImpression='110'></RankingCard>
                </div>
                <div className="cardClassement">
                    <RankingCard classement="3e rang" nomClient='Mario ralison' lieuTravail='Ambalavao' matricule='256' nombreImpression='90'></RankingCard>
                </div>
                <div className="cardClassement">
                    <RankingCard classement="4e rang" nomClient='Mario ralison' lieuTravail='Ambalavao' matricule='256' nombreImpression='80'></RankingCard>
                </div>
            </div>
        </div>
    )
}

export default Main;