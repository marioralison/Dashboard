import React, { useState } from "react";
import './styles/shortType.css';

const Short = () => {
    return(
        <section className="containerShort">
            <div className="shortSelection">
                <input type="radio" id="client" value="Client" name="select" defaultChecked/>
                <label className="selection" htmlFor="client">Client</label>
            </div>
            <div className="shortSelection">
                <input type="radio" id="membre" value="Membre" name="select"/>
                <label className="selection" htmlFor="membre">Membre</label>
            </div>
        </section>
    )
}

export default Short;