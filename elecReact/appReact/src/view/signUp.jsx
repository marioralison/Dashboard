import React, {useState} from 'react';
import './styles/login.css';
import Logo from './icons/Logo.png';
import Button from './components/Button.jsx';
import Card from './components/card.jsx';


const SignUp = () => {

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    //Ajouter l'user dans la base de donnée
    
    const userSubmit = async (event) => {
        event.preventDefault()
        try {
            const userId = await window.electronAPI.addUser(userName, password)
            console.log('User ajouté avec succés !')
        } catch (error) {
            console.log('Erreur lors de l\'ajout user !')
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
                            <Button title="Enregistrer"></Button>   
                        </form>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default SignUp;    