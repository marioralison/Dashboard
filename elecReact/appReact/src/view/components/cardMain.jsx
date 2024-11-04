import React from "react";
import './styles/cardMain.css'

const CardMain = ({children}) => {
    
    return (
        <section className="cardMain">
            {children}
        </section>
    );
}

export default CardMain;