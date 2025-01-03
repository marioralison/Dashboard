import React, { useState, useEffect } from 'react';
import './styles/ModalPrint.css'

const ModalPrint = ({closeModal, refreshCommandeTable}) => {

    const [inputError, setInputError] = useState(null)
    const [inputSuccess, setInputSuccess] = useState(null)

    const [typeClient, setTypeClient] = useState('1')
    const [nomClient, setNomClient] = useState('')
    const [matriculeClient, setMatriculeClient] = useState('')

    const [nombreImpression, setNombreImpression] = useState('')
    const [optionFormat, setOptionFormat] = useState([])
    const [impressionProduct, setImpressionProduct] = useState([])
    const [currentDate, setCurrentDate] = useState('')

    const [totalMontantCommande, setTotalMontantCommande] = useState(0)

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
        {label: 'Client', value: 1},
        {label: 'Membre', value: 2}
    ]

    const handleOptionClient = (e) => {
        const value = e.target.value
        setTypeClient(value)

        setCommande( (prev) => {

            const updatedCommand = {...prev, typeClient: value}

            if (value === '1') {
                updatedCommand.nomClient = 'Client'
                setMatriculeClient('')
            }
            else if (value === '2') {
                updatedCommand.nomClient = ''
            }

            return updatedCommand
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
                setCommande((prev) => ({ ...prev, nomClient: ''}))
            }
        } catch (error) {
            setInputError(true)
            setInputSuccess(false)
            console.log("Erreur lors de la recherche du client", error.message)
        }
    }

    //Récupérer le produit 'impression'
    const fetchProducts = async () => { 
        try {

            const dataImpressionData = await window.electronAPI.getImpressionData(typeClient)
            const produitImpressionData = dataImpressionData.map((produit) =>({
                taille : produit.taille,
                prix : produit.prix_unitaire
            }))
            setImpressionProduct(produitImpressionData)

            const taillesImpression = produitImpressionData.map((item) => item.taille)
            setOptionFormat(taillesImpression)

        } catch (error) {
            setInputError(false)
            console.log(error.message)
        }
    }

    //Envoyer les données dans la base de donnée
    const sendCommand = async () => {
        try {

            if (commande.typeClient !== '' && commande.nomClient !== '' && commande.nombre !== '' && commande.format !== '' && commande.date !== '' && totalMontantCommande > 0) {
                
                const newCommand = {
                    type_client: commande.typeClient === '1' ? 'Client' : 'Membre',
                    nom_client: commande.nomClient,
                    nombre: commande.nombre,
                    format: commande.format, 
                    date: commande.date,
                    montant_total: totalMontantCommande
                }

                await window.electronAPI.addCommandeImpression(newCommand)

                //Mise à jour des stats du client
                if (newCommand.type_client === 'Membre' && commande.format === 'A6') {
                    await window.electronAPI.updateClientStat(
                        matriculeClient,
                        Number(commande.nombre), //Total impression faite par le client
                        totalMontantCommande  //Total depense
                    )
                    console.log('Statistique du client mise à jour')
                }

                //Réinitialisation des champs après l'enregistrement
                setCommande({
                    typeClient: '',
                    nomClient: '',
                    nombre: '',
                    format: '',
                    date: currentDate
                })
                setNombreImpression('')
                setTotalMontantCommande(0)

                if (newCommand) {
                    setTimeout(() => {
                        refreshCommandeTable()
                        closeModal()
                    }, 1000)
                }

            }
            else {
                console.log('Veuillez remplir tous les champs correctement !')
            }

        } catch (error) {
            console.log("Erreur lors de l'envoie de la commande", error.message)
        }
    }

    //Récupération de la date et formatage après
    useEffect(() => {
        const today = new Date()
        const formattedDate = today.toISOString().split('T')[0]
        setCurrentDate(formattedDate)
        setCommande((prev) => ({...prev, date: formattedDate}))
        fetchProducts()
    }, [])

    //Calcul de la montant total de la commande
    useEffect(() => {
        if (nombreImpression && commande.format){
            const selectedProduct = impressionProduct.find(
                (product) => product.taille === commande.format
            )

            if (selectedProduct) {
                const total = Number(nombreImpression) * selectedProduct.prix
                setTotalMontantCommande(total)
            }
            else {
                setTotalMontantCommande(0)
            }
        }
        else {
            setTotalMontantCommande(0)
        }
    }, [nombreImpression, commande.format, impressionProduct])

    //Définition du nom client dans la base de donnée en fonction du choix de l'user
    useEffect(() => {
        if (typeClient === '1' && nomClient !== 'Client') {
            setNomClient('Client');
            setCommande((prev) => ({ ...prev, nomClient: 'Client' }));
        } else if (typeClient === '2') {
            if (!nomClient) {
                setNomClient('');
                setCommande((prev) => ({ ...prev, nomClient: '' }));
            }
        }
    }, [typeClient, nomClient]);

    useEffect(() => {
        setCommande((prev) => ({
            ...prev,
            typeClient,
            nomClient: typeClient === '1' ? 'Client' : '',
        }));
    }, [typeClient]);

    //Appel de la récupération de donnée de produit à chaque fois que le type de client change
    useEffect(() => {
        fetchProducts();
    }, [typeClient]);

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
                            <select className='option' value={typeClient} onChange={handleOptionClient}>
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
                                disabled={typeClient === '1' || typeClient === ''}
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
                                    {optionFormat.map((taille, index) => (
                                        <option key={index} value={taille}>
                                            {taille}
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
                        <div className="inputModal">
                            <h6 className="subtitleInput">Montant total</h6>
                            <input 
                                type="text" 
                                value={`${totalMontantCommande} Ar`} 
                                readOnly
                                className="readonlyInput" 
                            />
                        </div>
                    </div>
                    <div className="footer">
                        <button className='btnAddCommand' onClick={sendCommand}>Ajouter</button>
                        <button className='btnCancel' onClick={() => closeModal(false)}>Annuler</button>
                    </div>
                    {inputError && typeClient === '2' && (
                        <p className="errorText">Client introuvable. Veuillez vérifier le matricule.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ModalPrint;