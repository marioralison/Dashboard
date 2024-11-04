import React from "react";
import './styles/headerMain.css'

const HeaderMain = (props) => {
    return(
            <div className="header">
                <label className="titre">{props.title}</label>
                <div className="accountSection">
                    <img src={props.iconNotification} alt="iconNotification" className="icon"/>
                    <div className="user">
                        <img src={props.iconUser} alt="iconUser" className="icon"/>
                        <div className="UserInfo">
                            <h3>Mario Ralison</h3>
                            <h5>Manager du multiservice</h5>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default HeaderMain;