import React, { useState } from "react";
import './styles/shortType.css';

const Short = () => {

    const [value, setValue] = useState('')
    const option = [
        {label: 'Selection 1', value: 1},
        {label: 'Selection 2', value: 2},
        {label: 'Selection 3', value: 3}
    ]

    function handleSelect(event){
        setValue(event.target.value)
    }

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