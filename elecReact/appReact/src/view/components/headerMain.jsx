import React from "react";
import './styles/headerMain.css'
import { useRecoilValue } from "recoil";
import { userNameState } from "../../state.jsx";

const HeaderMain = (props) => {
    
    const userName = useRecoilValue(userNameState)

    return(
            <div className="header">
                <label className="titre">{props.title}</label>
                <div className="accountSection">
                    <img src={props.iconNotification} alt="iconNotification" className="icon"/>
                    <div className="user">
                        <div className="UserInfo">
                            <h3 className="nomUser">{userName}</h3>
                            <h5 className="roleUser">Manager du multiservice</h5>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default HeaderMain;