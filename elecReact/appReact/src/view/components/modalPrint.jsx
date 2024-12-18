import React, { useState, useEffect } from 'react';
import './styles/ModalPrint.css'

const ModalPrint = ({closeModal}) => {

    const [valueClient, setValueClient] = useState('simple')
    const [clientMatch, setClientMatch] = useState([])
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

    //Récupérer le client
    const checkClientByName = async () => {
        const lowerCaseNameClient = valueClient.toLowerCase()
        try {
            const clients = await window.electronAPI.getClientByName(lowerCaseNameClient)
            console.log(clients)
        } catch (error) {
            console.log("Erreur lors de la recherche du client", error.message)
        }
    }

    //Séléction du client correspondant
    const handleClientSelection = (id) => {
        setClienId(id)
        setClientMatch([])
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
            console.log(error.message)
        }
    }

    useEffect(() => {
        const today = new Date()
        const formattedDate = today.toISOString().split('T')[0]
        setCurrentDate(formattedDate)
        fetchProducts()
    }, [])

    function handleOptionClient(e){
        setValueClient(e.target.value)
    }

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
                            <h6 className='subtitleInput'>Nom client</h6>
                            <input 
                                type="text"
                                placeholder='Entrer le nom du client'
                                value={valueClient}
                                onChange={(e) => setValueClient(e.target.value)}
                                onBlur={checkClientByName}
                                disabled={valueClient === 'simple'}
                            />
                        </div>
                        <div className='inputSection'>
                            <div className='inputChild'>
                                <h6 className='subtitleInput'>Nombre</h6>
                                <input type="number" placeholder='Entrer le nombre'/>
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