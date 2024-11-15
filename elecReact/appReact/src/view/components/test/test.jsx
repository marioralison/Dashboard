import React from "react";
import '../styles/card.css'

const Test = () => {

    const click = () => {
        console.log('Mandeha ve izy ao')
    }
    
    return (
        <section className="card">
            <input type="text" id="noteInput"/>
            <input type="button" value="Sauvegarder" onClick={click}/>
        </section>
    );
}

export default Test;