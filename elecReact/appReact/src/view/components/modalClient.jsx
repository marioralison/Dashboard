import React, { useEffect, useState } from 'react';
import './styles/modalClient.css'

const ModalClient = ({toggleModal, clientToEdit, onSave, refreshClientTable}) => {

    const [matricule, setMatricule] = useState('')
    const [clientName, setClientName] = useState('')
    const [workPlace, setWorkPlace] = useState('')
    const [numberPhone, setNumberPhone] = useState('')
    const [message, setMessage] = useState('')

    const handleBackgroundClick = (e) => {
        if(e.target.className === 'modalClientBackground') {
            toggleModal(true)
        }
    }

    //Modification informations client

    //On pré-remplie les champs du formulaire
    useEffect(() => {
        if (clientToEdit){
            setMatricule(clientToEdit.matricule)
            setClientName(clientToEdit.nameCLient)
            setWorkPlace(clientToEdit.lieuTravail)
            setNumberPhone(clientToEdit.numberPhone)
        }
    }, [clientToEdit])

    //Enregistrement client
    const handleSave = async () => {
        if (!matricule.trim() || !clientName.trim() || !workPlace.trim() || !numberPhone.trim()) {
            setMessage('Veuillez remplir tous les champs obligatoires.');
            return;
        }

        if (onSave) {
            await onSave(matricule, clientName, workPlace, numberPhone)
            clientToEdit ?  setMessage('Modification effectuée') : setMessage('Client enregistré')

            // Délai pour afficher le message avant de fermer
            setTimeout(() => {
                refreshClientTable();
                toggleModal(false);
                setMessage(''); // Réinitialiser le message
            }, 1500); // Afficher le message pendant 2 secondes
        }
    }

    return(
        <div className='modalClientBackground' onClick={handleBackgroundClick}>
            <div className="modalClientContainer">
                <div className="modalBodyClient">
                    <div className="header">
                        <h3>{clientToEdit ? 'Modification information client' : 'Ajouter nouveau client'}</h3>
                    </div>
                    <div className="body">
                        <div className='infoClient'>
                            <div className='inputSection'>
                                <div className='inputChild'>
                                    <h6 className='subtitleInput'>Nom</h6>
                                    <input
                                        type="text" 
                                        placeholder='Entrer le nom du client'
                                        value={clientName}
                                        onChange={(e) => setClientName(e.target.value)}
                                    />
                                </div>
                                <div className='inputChild'>
                                    <h6 className='subtitleInput'>Lieu Travail</h6>
                                    <input 
                                        type="text" 
                                        placeholder='Entrer le lieu de travail'
                                        value={workPlace}
                                        onChange={(e) => setWorkPlace(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='inputSection'>
                                <div className='inputChild'>
                                    <h6 className='subtitleInput'>Matricule</h6>
                                    <input 
                                        type="number" 
                                        placeholder='Entrer le matricule'
                                        value={matricule}
                                        onChange={(e) => setMatricule(e.target.value)}
                                        disabled={!!clientToEdit}
                                    />
                                </div>
                                <div className='inputChild'>
                                    <h6 className='subtitleInput'>Téléphone</h6>
                                    <input 
                                        type="number" 
                                        placeholder='Entrer le numéro téléphone'
                                        value={numberPhone}
                                        onChange={(e) => setNumberPhone(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer">
                        <button className='btnAddCommand' onClick={handleSave}>{clientToEdit ? 'Modifier' : 'Enregistrer'}</button>
                        <button className='btnCancel' onClick={() => toggleModal(false)}>Annuler</button>
                    </div>
                    <div className='messageError'>
                        {message && (
                            <p className={`alertMessage ${(message === 'Client enregistré' || message === 'Modification effectuée') ? "success" : "error"}`}>
                                {message}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalClient;