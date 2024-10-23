import React from "react";
import './styles/card.css'

const Card = ({children}) => {
    
    return (
        <section className="card">
            {children}
        </section>
    );
}

export default Card;