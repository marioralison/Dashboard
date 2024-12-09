import React, { useState } from 'react';
import './styles/modalClient.css'

const ModalClient = ({closeModal}) => {

    const [clientName, setClientName] = useState('')
    const [workPlace, setWorkPlace] = useState('')
    const [localClient, setLocalClient] = useState('')
    const [numberPhone, setNumberPhone] = useState('')
    const [message, setMessage] = useState('')
    const [imagePath, setImagePath] = useState(null)

    const handleBackgroundClick = (e) => {
        if(e.target.className === 'modalClientBackground') {
            closeModal(false)
        }
    }

    //Ajout de client
    const addClient = async () => {
        if (!clientName.trim() || !workPlace.trim() || !localClient.trim() || !numberPhone.trim()){
            setMessage('Tous les champs doivent être remplis')
            return
        }

        try {
            const clientData = await window.electronAPI.addClient(clientName, workPlace, localClient, numberPhone)
            setMessage('Client ajouté avec succès !')
        } catch (error) {
            setMessage("Erreur lors de l'ajout du client")
        }
    }

    //Ajout image client
    const handleSelectImage = async () => {

        const selectedImage = await window.electronAPI.selectImage()

        if (selectedImage) {
            setImagePath(selectedImage)
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
                            {imagePath && (
                                <img 
                                    className='photoClient'
                                    alt='Image sélectionné'
                                    src={`file://${imagePath}`}>
                                </img>
                            )}
                            <button onClick={handleSelectImage}>Importer image</button>
                            {imagePath}
                        </div>
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
                                    <h6 className='subtitleInput'>Domicile</h6>
                                    <input 
                                        type="text" 
                                        placeholder='Entrer le domicile'
                                        value={localClient}
                                        onChange={(e) => setLocalClient(e.target.value)}
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
                        <button className='btnAddCommand' onClick={addClient}>Enregistrer</button>
                        <button className='btnCancel' onClick={() => closeModal(false)}>Annuler</button>
                    </div>
                    <div className='messageError'>
                        {message && (
                            <p className={`alertMessage ${message === "Client ajouté avec succès !" ? "success" : "error"}`}>
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