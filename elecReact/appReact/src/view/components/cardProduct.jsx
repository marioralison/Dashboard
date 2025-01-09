import React from "react";
import './styles/cardProduct.css';

const CardProduct = (props) => {
    
    return (
        <section className="cardProduct">
            <div className="headerCard">
                <div className="iconSection">
                    {props.icon && <span><img src={props.icon} alt="iconProduct" className="iconProduct"/></span>}
                </div>
                <div className="titleProduct">
                    {props.title}
                </div>
            </div>
            <div className="bodyCard">
                <h3 className="totalProduct">{props.totalProduct}</h3>
                <h5 className="information">{props.information}</h5>
            </div>
        </section>
    );
}

export default CardProduct;