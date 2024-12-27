import React, { useState } from "react";
import './styles/shortType.css';

const Short = ({option1, option2, onSelect}) => {

    const handleChange = (event) => {
        onSelect(event.target.value)
    }

    return(
        <section className="containerShort">
            <div className="shortSelection">
                <input 
                    type="radio" 
                    id="client" 
                    value="Client" 
                    name="select" 
                    defaultChecked
                    onChange={handleChange}
                />
                <label className="selection" htmlFor="client">{option1}</label>
            </div>
            <div className="shortSelection">
                <input 
                    type="radio" 
                    id="membre" 
                    value="Membre" 
                    name="select"
                    onChange={handleChange}
                />
                <label className="selection" htmlFor="membre">{option2}</label>
            </div>
        </section>
    )
}

export default Short;