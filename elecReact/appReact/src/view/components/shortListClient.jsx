import React, { useState } from "react";
import './styles/shortType.css';

const Short = ({option1, option2, onSelect}) => {

    const [selected, setSelected] = useState('croissant')

    const handleSelection = (value) => {
        setSelected(value)
        onSelect(value)
    }

    return(
        <section className="containerShort">
            <div className="shortSelection">
                <input 
                    type="radio" 
                    id="croissant" 
                    value="croissant" 
                    name="select" 
                    checked={selected === 'croissant'}
                    onChange={(e) => handleSelection(e.target.value)}
                />
                <label className="selection" htmlFor="croissant">{option1}</label>
            </div>
            <div className="shortSelection">
                <input 
                    type="radio" 
                    id="decroissant" 
                    value="decroissant" 
                    name="select"
                    checked={selected === 'decroissant'}
                    onChange={(e) => handleSelection(e.target.value)}
                />
                <label className="selection" htmlFor="decroissant">{option2}</label>
            </div>
        </section>
    )
}

export default Short;