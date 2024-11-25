import React, {useState} from 'react';
import './styles/signUp.css';
import './components/styles/button.css'
import Logo from './icons/Logo.png';
import Card from './components/card.jsx';


const SignUp = () => {

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    //Ajouter l'user dans la base de donnée
    
    const userSubmit = async (event) => {
        event.preventDefault()

        if (!userName.trim() || !password.trim()){
            setMessage("Tous les champs doivent être remplis")
            return
        }

        try {
            const userId = await window.electronAPI.addUser(userName, password)
            setMessage("Utilisateur ajouté avec succès !")
        } catch (error) {
            setMessage("Erreur lors de l\'ajout user !")
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
                            <label>Bienvenue</label>
                            <p>Veuillez entrer les informations correspondantes</p>
                        </div>
                        <form className='form' onSubmit={userSubmit}>
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
                            <button className='button'>Se connecter</button>
                        </form>
                    </div>
                    {message && <p className='alertMessage'>{message}</p>}
                </Card>
            </div>
        </div>
    );
}

export default SignUp;    