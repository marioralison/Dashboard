import React, {useState} from 'react';
import './styles/login.css';
import Logo from './icons/Logo.png';
import Button from './components/Button.jsx';
import Card from './components/card.jsx';


const SignIn = () => {

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

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
                            <Button title="Se connecter"></Button>   
                        </form>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default SignIn;    