import React, {useState} from 'react';
import './styles/signUp.css';
import Logo from './icons/Logo.png';
import Card from './components/card.jsx';
import { useNavigate } from 'react-router-dom';


const SignIn = () => {

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    //Ajouter l'user dans la base de donnée
    const OnSignIn = async (event) => {
        event.preventDefault()
        try {
            const user = await window.electronAPI.signIn(userName, password)
            console.log(user)
        } catch (error) {
            console.log('Erreur de connexion !')
        }
    }

    //Navigation vers le tableau de bord
    const handleLogin = () => {
        console.log('Ok ok')
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
                        <form className='form' onSubmit={OnSignIn}>
                            <input 
                                type="text"
                                placeholder='Nom utilisateur'
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                            <input 
                                type="password"
                                placeholder='Mot de passe'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </form>
                        <button className='button' onClick={handleLogin}>Se connecter</button>   
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default SignIn;    