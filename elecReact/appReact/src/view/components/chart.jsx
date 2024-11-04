import React from "react";
import './styles/chart.css'

const Chart = (props) => {
    return(
        <section className="containerRapport">
            <div className="rapportContent">
                <div className="headerChart">
                    <h3 className="titleRapport">Rapport {props.rapport}</h3>
                </div>
                <div className="bodyChart"></div>
            </div>
        </section>
    )
}

export default Chart;