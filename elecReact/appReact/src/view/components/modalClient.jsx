import React from 'react';
import './styles/modalClient.css'

const ModalClient = ({closeModal}) => {

    const handleBackgroundClick = (e) => {
        if(e.target.className === 'modalClientBackground') {
            closeModal(false)
        }
    }

    return(
        <div className='modalClientBackground' onClick={handleBackgroundClick}>
            <div className="modalClientContainer">
                <div className="modalBodyClient">
                    <div className="header">
                        <h3>Ajouter nouveau client</h3>
                    </div>
                    <div className="body">
                        <div className='photoSection'>
                            <section className='photoClient'></section>
                        </div>
                        <div className='infoClient'>
                            <div className='inputSection'>
                                <div className='inputChild'>
                                    <h6 className='subtitleInput'>Nom</h6>
                                    <input type="text" placeholder='Entrer le nom du client'/>
                                </div>
                                <div className='inputChild'>
                                    <h6 className='subtitleInput'>Matricule</h6>
                                    <input type="number" placeholder='Entrer le matricule'/>
                                </div>
                            </div>
                            <div className='inputSection'>
                                <div className='inputChild'>
                                    <h6 className='subtitleInput'>Lieu travail</h6>
                                    <input type="text" placeholder='Entrer le lieu de travail'/>
                                </div>
                                <div className='inputChild'>
                                    <h6 className='subtitleInput'>Domicile</h6>
                                    <input type="text" placeholder='Entrer le domicile'/>
                                </div>
                            </div>
                            <div className='inputModal'>
                                <h6 className='subtitleInput'>Téléphone</h6>
                                <input type="number" placeholder='Entrer le numéro de téléphone'/>
                            </div>
                        </div>
                    </div>
                    <div className="footer">
                        <button className='btnAddCommand'>Enregistrer</button>
                        <button className='btnCancel' onClick={() => closeModal(false)}>Annuler</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalClient;