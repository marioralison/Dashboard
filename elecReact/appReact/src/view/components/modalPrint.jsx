import React, { useState, useEffect } from 'react';
import './styles/ModalPrint.css'

const ModalPrint = ({closeModal}) => {

    const [inputError, setInputError] = useState(null)
    const [inputSuccess, setInputSuccess] = useState(null)

    const [typeClient, setTypeClient] = useState('')
    const [matriculeClient, setMatriculeClient] = useState('')

    const [nombreImpression, setNombreImpression] = useState('')
    const [optionFormat, setOptionFormat] = useState([])
    const [impressionProduct, setImpressionProduct] = useState([])
    const [currentDate, setCurrentDate] = useState('')

    const handleBackgroundClick = (e) => {
        if(e.target.className === 'modalBackground') {
            closeModal(false)
        }
    }

    const optionClient = [
        {label: 'Client simple', value: 'simple'},
        {label: 'Membre', value: 'membre'}
    ]

    function handleOptionClient(e){
        setTypeClient(e.target.value)
    }

    const handleNombreImpression = (e) => {
        const value = e.target.value
        if (!isNaN(value) && Number(value) >= 0) {
            setNombreImpression(value)
        }
    }

    //Récupérer le client
    const checkClientByMatricule = async () => {
        try {
            const client = await window.electronAPI.getClientByMatricule(matriculeClient)
            if (client) {
                console.log(client)
                setMatriculeClient(client.matricule)
                setInputError(false)
                setInputSuccess(true)
            }
            else{
                setInputError(true)
                setInputSuccess(false)
                console.log('Client introuvable dans la base de donnée !')
            }
        } catch (error) {
            setInputError(true)
            setInputSuccess(false)
            console.log("Erreur lors de la recherche du client", error.message)
        }
    }

    //Récupérer tous les produits
    const fetchProducts = async () => { 
        try {

            const data = await window.electronAPI.getProduct()

            const filtreImpressionProduct = data.filter((product) => product.categorie === 'Impression')
            setImpressionProduct(filtreImpressionProduct)

            const formats = [
                ...new Set(filtreImpressionProduct.map((product) => product.tailleProduit)),
            ].map((format) => ({ label: format, value: format }));
            
            setOptionFormat(formats);

        } catch (error) {
            setInputError(false)
            console.log(error.message)
        }
    }

    useEffect(() => {
        const today = new Date()
        const formattedDate = today.toISOString().split('T')[0]
        setCurrentDate(formattedDate)
        fetchProducts()
    }, [])

    return(
        <div className='modalBackground' onClick={handleBackgroundClick}>
            <div className="modalContainer">
                <div className="modalBody">
                    <div className="header">
                        <h3>Ajouter nouvelle commande</h3>
                    </div>
                    <div className="body">
                        <div className='inputModal'>
                            <h6 className='subtitleInput'>Type client</h6>
                            <select className='option' onChange={handleOptionClient}>
                                <option value="">Selectionner le type de client</option>
                                {
                                    optionClient.map(option => {
                                        return(
                                            <option key={option.value} value={option.value}>{option.label}</option>
                                        )
                                    }) 
                                }
                            </select>
                        </div>
                        <div className='inputModal'>
                            <h6 className='subtitleInput'>Matricule client</h6>
                            <input 
                                type="number"
                                className={inputError ? 'errorInput' : inputSuccess ? 'successInput' : ''}
                                placeholder='Entrer le matricule du client'
                                value={matriculeClient}
                                onChange={(e) => setMatriculeClient(e.target.value)}
                                onBlur={checkClientByMatricule}
                                disabled={typeClient === 'simple' || typeClient === ''}
                            />
                        </div>
                        <div className='inputSection'>
                            <div className='inputChild'>
                                <h6 className='subtitleInput'>Nombre</h6>
                                <input 
                                    type="number" 
                                    placeholder='Entrer le nombre'
                                    onChange={handleNombreImpression}
                                />
                            </div>
                            <div className='inputChild'>
                                <h6 className='subtitleInput'>Format</h6>
                                <select className="option">
                                    <option value="">Sélectionner un format</option>
                                    {optionFormat.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='inputModal'>
                            <h6 className='subtitleInput'>Date commande</h6>
                            <input 
                                type="date"
                                value={currentDate}
                                onChange={(e) => setCurrentDate(e.target.value)}/>
                        </div>
                    </div>
                    <div className="footer">
                        <button className='btnAddCommand'>Ajouter</button>
                        <button className='btnCancel' onClick={() => closeModal(false)}>Annuler</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalPrint;