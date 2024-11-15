import React from 'react';
import './styles/button.css'

const Button = (props) => {
    const onLogin = (e) => {
        e.preventDefault()
        console.log("OKOK")
    }

    return (
        <button className='button' onClick={onLogin}>
            {props.title}
        </button>
    );
}

export default Button;