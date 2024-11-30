import React, {useState} from 'react';
import './styles/signUp.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import Logo from './icons/Logo.png';
import Card from './components/card.jsx';
import { useNavigate } from 'react-router-dom';


const SignIn = () => {

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false)

    //Navigation
    const navigate = useNavigate()
    const navigateToMain = () => {
        navigate('/menu')
    }
    const navigateToSignUp = () => {
        navigate('/signUp')
    }

    //Affichage du mot de passe
    const togglePassword = () => {
        setPasswordVisible(!passwordVisible)
    }

    //Authentification
    const connexion = async () => {

        if (!userName.trim() || !password.trim()) {
            setMessage("Tous les champs doivent être remplis")
            return
        }
        
        try {
            const userData = await window.electronAPI.getUtilisateur(userName)
            const passwordVerified = await window.electronAPI.mdpVerify(userData.password, password)

            if (passwordVerified) {
                setMessage("Connexion réussi !")
                setTimeout(() => {
                    navigateToMain()
                }, 1000)
            } else {
                setMessage("Veuillez verifier votre mot de passe !")
            }
        } catch (err) {
            setMessage(`"${userName}" n'existe pas dans la base de donnée`)
        }
    }

    return (
        <div className='containerLogin'>
            <div className='logoImage'>
                <img src={Logo} alt='logo'/>
            </div>
            <div className='bodyLogin'>
                <Card>
                    <div className='containerForm'>
                        <div className='description'>
                            <label>Se connecter</label>
                            <p>Veuillez entrer les informations correspondantes</p>
                        </div>
                        <form className='form'>
                            <div className='inputUser'>
                                <input 
                                    type="text"
                                    placeholder='Nom utilisateur'
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </div>
                            <div className='inputUser'>
                                <input 
                                    type={passwordVisible ? 'text' : 'password'}
                                    placeholder='Mot de passe'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    onClick={togglePassword}
                                    type="button"
                                    style={{
                                        border: "none",
                                        cursor: "pointer",
                                        background: 'transparent',
                                    }}
                                >
                                    <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} />
                                </button>
                            </div>
                        </form>
                        <button className='button' onClick={connexion}>Se connecter</button>   
                    </div>
                    {message && (
                        <p className={`alertMessage ${message === "Connexion réussi !" ? "success" : "error"}`}>
                            {message}
                        </p>
                    )}
                </Card>
                <div className='link'>
                    <button onClick={navigateToSignUp}>S'inscrire</button>
                </div>
            </div>
        </div>
    );
}

export default SignIn;    