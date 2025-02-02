import React, { useState } from "react";
import './styles/shortType.css';

const Short = ({option1, option2, onSelect}) => {

    return(
        <section className="containerShort">
            <div className="shortSelection">
                <input 
                    type="radio" 
                    id="client" 
                    value="Client" 
                    name="select" 
                    defaultChecked
                    onSelect={(e) => e.target.value}
                />
                <label className="selection" htmlFor="client">{option1}</label>
            </div>
            <div className="shortSelection">
                <input 
                    type="radio" 
                    id="membre" 
                    value="Membre" 
                    name="select"
                    onSelect={(e) => e.target.value}
                />
                <label className="selection" htmlFor="membre">{option2}</label>
            </div>
        </section>
    )
}

export default Short;