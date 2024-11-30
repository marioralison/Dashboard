import './styles/signUp.css';
import './components/styles/button.css'
import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

import Logo from './icons/Logo.png';
import Card from './components/card.jsx';


const SignUp = () => {

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [role, setRole] = useState('administrateur')
    const [passwordVisibile, setPasswordVisible] = useState(false)
    
    //Navigation
    const navigate = useNavigate()
    const navigateToSignIn = () => {
        navigate("/")
    }

    //Affichage du mot de passe
    const togglePassword = () => {
        setPasswordVisible(!passwordVisibile)
    }

    //Ajouter l'user dans la base de donnée
    const userSubmit = async (event) => {
        event.preventDefault();
    
        if (!userName.trim() || !password.trim() || !role.trim()) {
            setMessage("Tous les champs doivent être remplis");
            return;
        }
    
        try {
            const passwordHashed = await window.electronAPI.mdpHash(password);
    
            // Ajout de l'utilisateur avec le mot de passe haché
            const userId = await window.electronAPI.addUser(userName, passwordHashed, role);
            setMessage("Utilisateur ajouté avec succès !");
        } catch (error) {
            setMessage("Erreur lors de l'ajout de l'utilisateur !");
        }
    };

    return (
        
        <div className='containerLogin'>
            <div className='logoImage'>
                <img src={Logo} alt='logo'/>
            </div>
            <div className='bodyLogin'>
                <Card>
                    <div className='containerForm'>
                        <div className='description'>
                            <label className='titleLog'>Bienvenue</label>
                            <p>Veuillez entrer les informations correspondantes</p>
                        </div>
                        <form className='form' onSubmit={userSubmit}>
                            <div className="inputUser">
                                <input 
                                    type="text"
                                    placeholder='Nom utilisateur'
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </div>
                            <div className="inputUser">
                                <input 
                                    type={passwordVisibile ? 'text' : 'password'}
                                    placeholder='Mot de passe'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    onClick={togglePassword}
                                    type="button"
                                    style={{
                                        cursor: "pointer",
                                        border: 'none',
                                        background: 'transparent'
                                    }}
                                >
                                    <FontAwesomeIcon icon={passwordVisibile ? faEye : faEyeSlash}/>
                                </button>
                            </div>
                            <div className='checkbox'>
                                <label className='inputCheckbox' htmlFor="admin">
                                    <input 
                                        type="radio" 
                                        id="admin" 
                                        value="administrateur" 
                                        name="singUpCheckbox" 
                                        checked={role === "administrateur"}
                                        onChange={(e) => setRole(e.target.value)}
                                    /> Administrateur
                                </label>
                                <label className='inputCheckbox' htmlFor="user">
                                    <input 
                                        type="radio" 
                                        id="user" 
                                        value="utilisateur" 
                                        name="singUpCheckbox"
                                        checked={role === "utilisateur"}
                                        onChange={(e) => setRole(e.target.value)}
                                    /> Utilisateur
                                </label>
                            </div>
                            <button className='button'>S'inscrire</button>
                        </form>
                    </div>
                    {message && (
                        <p className={`alertMessage ${message === "Utilisateur ajouté avec succès !" ? "success" : "error"}`}>
                            {message}
                        </p>
                    )}
                </Card>
                <div className='link'>
                    <button onClick={navigateToSignIn}>Se connecter</button>
                </div>
            </div>
        </div>
    );
}

export default SignUp;    