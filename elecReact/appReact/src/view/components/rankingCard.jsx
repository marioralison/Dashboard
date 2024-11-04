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
            <div className="rankingImage">
                <div className="imageContainer"></div>
            </div>
            <div className="rankingInfo">
                <h3>{props.nomClient}</h3>
                <h5>{props.lieuTravail}</h5>
                <h5>Impression : {props.nombreImpression} photo</h5>
            </div>
        </section>
    )
}

export default Ranking;