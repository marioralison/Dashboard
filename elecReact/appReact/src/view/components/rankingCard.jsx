import React from "react";
import './styles/rankingCard.css'

const Ranking = (props) => {
    return(
        <section className="containerRanking">
            <div className="containerText">
                <div className="classement">
                    <h3 className="rankingText">{props.classement}</h3>
                </div>
            </div>
            <div className="rankingInfo">
                <h3 className="nomClient">{props.nomClient}</h3>
                <h5>Matricule : {props.matricule}</h5>
                <h5>Lieu Travail : {props.lieuTravail}</h5>
                <h5>Impression A6 : {props.nombreImpression} photos</h5>
            </div>
        </section>
    )
}

export default Ranking;