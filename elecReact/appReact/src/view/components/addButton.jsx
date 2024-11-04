import React from "react";
import './styles/addButton.css';

const AddButton = (props) => {
    return(
        <section className="containerButton">
            <img src={props.icon} alt="icon" className="iconBtn"/>
            <h4 className="titleBtn">{props.title}</h4>
        </section>
    )
}

export default AddButton;