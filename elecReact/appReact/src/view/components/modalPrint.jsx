import React, { useState, useEffect } from 'react';
import './styles/ModalPrint.css'

const ModalPrint = ({closeModal}) => {

    const [inputError, setInputError] = useState(null)
    const [inputSuccess, setInputSuccess] = useState(null)

    const [typeClient, setTypeClient] = useState('simple')
    const [nomClient, setNomClient] = useState('')
    const [matriculeClient, setMatriculeClient] = useState('')

    const [nombreImpression, setNombreImpression] = useState('')
    const [optionFormat, setOptionFormat] = useState([])
    const [impressionProduct, setImpressionProduct] = useState([])
    const [currentDate, setCurrentDate] = useState('')

    const [commande, setCommande] = useState({
        typeClient : '',
        nomClient : '',
        nombre : '',
        format : '',
        date : ''
    })

    const handleBackgroundClick = (e) => {
        if(e.target.className === 'modalBackground') {
            closeModal(false)
        }
    }

    const optionClient = [
        {label: 'Client', value: 'client'},
        {label: 'Membre', value: 'membre'}
    ]

    const handleOptionClient = (e) => {
        const value = e.target.value
        setTypeClient(value)
        setCommande((prev) => {
            const clientSimpleCommande = {...prev, typeClient: value}
            if (value === 'client') {
                clientSimpleCommande.nomClient = 'Client'
            }
            return clientSimpleCommande
        }) 
    }

    const handleNombreImpression = (e) => {
        const value = e.target.value
        if (!isNaN(value) && Number(value) >= 0) {
            setNombreImpression(value)
            setCommande((prev) => ({ ...prev, nombre: value }))
        }
    }

    const handleChangeFormat = (e) => {
        const value = e.target.value
        setCommande((prev) => ({ ...prev, format: value }))
    }

    const handleDateChange = (e) => {
        const value = e.target.value
        setCurrentDate(value)
        setCommande((prev) => ({...prev, date: value}))
    }

    //Récupérer le client
    const checkClientByMatricule = async () => {
        try {
            const client = await window.electronAPI.getClientByMatricule(matriculeClient)
            if (client) {
                setNomClient(client.nameCLient)
                setInputError(false)
                setInputSuccess(true)
                setCommande((prev) => ({...prev, nomClient: client.nameCLient}))
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

    //Envoyer les données dans la base de donnée
    const sendCommand = async () => {
        try {

            if (commande.typeClient !== '' && commande.nomClient !== '' && commande.nombre !== '' && commande.format !== '' && commande.date !== '') {
                console.log('Commande envoyé avec succès !', commande)
            } 
            else {
                console.log('Veuillez remplir tous les champs !')
            }

        } catch (error) {
            console.log("Erreur lors de l'envoie de la commande", error.message)
        }
    }

    useEffect(() => {
        const today = new Date()
        const formattedDate = today.toISOString().split('T')[0]
        setCurrentDate(formattedDate)
        setCommande((prev) => ({...prev, date: formattedDate}))
        fetchProducts()
    }, [])

    // useEffect(() => {
    //     console.log(commande.date)
    //     console.log(currentDate)
    // }, [commande.date])

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
                                <option>Selectionner le type du client</option>
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
                                disabled={typeClient === 'client' || typeClient === ''}
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
                                <select className="option" onChange={handleChangeFormat}>
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
                                onChange={handleDateChange}/>
                        </div>
                    </div>
                    <div className="footer">
                        <button className='btnAddCommand' onClick={sendCommand}>Ajouter</button>
                        <button className='btnCancel' onClick={() => closeModal(false)}>Annuler</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalPrint;