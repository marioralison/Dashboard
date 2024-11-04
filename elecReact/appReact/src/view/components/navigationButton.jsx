import React from "react";
import './styles/navigationButton.css';

const NavButton = (props) => {
    return (
        <section className="btnNav">
            <div className="containerBtn">
                <div className="iconSection">
                    {props.icon && <span><img src={props.icon} alt="iconNavigation" className="icon"/></span>}
                </div>
                <div className="title">
                    {props.title}
                </div>
            </div>
        </section>
    )
}

export default NavButton;