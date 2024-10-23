import * as React from 'react';
import './styles/login.css';
import Logo from './icons/Logo.png';
import Button from './components/Button.jsx';
import Card from './components/card.jsx';

const Home = () => {
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
                        <form className='form'>
                            <input type="text" placeholder='Nom utilisateur'/>
                            <input type="password" placeholder='Mot de passe'/>
                            <Button title="Acceder"></Button>   
                        </form>
                    </div>
                </Card>
            </div>
        </div>
    );
}



export default Home;    