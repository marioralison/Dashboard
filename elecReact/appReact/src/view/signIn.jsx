import React, {useState} from 'react';
import './styles/signUp.css';
import Logo from './icons/Logo.png';
import Card from './components/card.jsx';


const SignIn = () => {

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const signIn = async () => {

        if (!userName.trim() || !password.trim()) {
            console.log('Tous les champs doivent être remplis !')
            return
        }
        
        try {
            const userData = await window.electronAPI.getUtilisateur(userName)
            const passwordVerified = await window.electronAPI.mdpVerify(userData.password, password)

            if (passwordVerified) {
                console.log('Connexion réussi !')
            } else {
                console.log('Veuillez verifier votre mot de passe !')
            }

        } catch (err) {
            console.log(`"${userName}" n'est pas encore inscrit dans la base de donnée !`)
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
                        <button className='button' onClick={signIn}>Se connecter</button>   
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default SignIn;    