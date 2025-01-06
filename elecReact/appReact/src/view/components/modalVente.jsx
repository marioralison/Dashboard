import React, { useState, useEffect } from 'react';
import './styles/modalVente.css'

const ModalPrint = ({closeModal, refreshVenteTableau}) => {

    const [currentDate, setCurrentDate] = useState('')
    const [inputError, setInputError] = useState(null)
    const [inputSuccess, setInputSuccess] = useState(null)

    const [typeClient, setTypeClient] = useState('1')
    const [matriculeClient, setMatriculeClient] = useState('')
    const [nomClient, setNomClient] = useState('')

    const [valueCategorie, setValueCategorie] = useState('')
    const [formats, setFormats] = useState([])
    const [products, setProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [selectedFormat, setSelectedFormat] = useState('')
    const [nombre, setNombre] = useState('')

    const [prixTotal, setPrixTotal] = useState(0)

    const [commande, setCommande] = useState({
        typeClient: '',
        nomClient: '',
        categorie: '',
        nombre: '',
        format: '',
        date: ''
    })

    const optionClient = [
        {label: 'Client simple', value: 1},
        {label: 'Membre', value: 2},
    ]

    //Récupérer le client
    const checkClientByMatricule = async () => {
        try {
            const client = await window.electronAPI.getClientByMatricule(matriculeClient)
            
            if (client) {
                setNomClient(client.nameCLient)
                setInputError(false)
                setInputSuccess(true)
                setCommande((prev) => ({...prev, nomClient: client.nameCLient}))
            } else {
                setInputError(true)
                setInputSuccess(false)
                console.log('Client introuvable dans la base de donnée')
                setCommande((prev) => ({...prev, nomClient: ''}))
            }
        } catch (error) {
            setInputError(true)
            setInputSuccess(false)
            console.log('Erreur lors de la recherche du client', error.message)
        }
    }

    const handleSelectedOptionClient = (e) => {
        const value = e.target.value
        setTypeClient(value)

        setCommande((prev) => {
            const updatedCommande = {...prev, typeClient: value}

            if (value === '1') {
                updatedCommande.nomClient = 'Client'
                setMatriculeClient('')
            }
            else if (value === '2') {
                updatedCommande.nomClient = ''
            }

            return updatedCommande
        })
    }

    //Récupérer tous les produits
    const fetchProducts = async () => {
        try {
            
            const produitsData = await window.electronAPI.getProduct()
            const produit = produitsData.map((produit) => ({
                id : produit.id,
                nom : produit.nom
            }))
            setProducts(produit)

        } catch (error) {
            console.log('Erreur lors de la récupération des produits', error.message)
        }
    }

    //Récupérer les produits en fonction de l'id
    const fetchProductById = async (productId) => {
        try {
            
            const dataProduit = await window.electronAPI.getProductById(productId)

            const formats = dataProduit.map((produit) => ({
                label: produit.taille,
                value: produit.taille,
                prix_unitaire: produit.prix_unitaire
            }))

            setFormats(formats)
            setSelectedProduct(dataProduit)

        } catch (error) {
            console.log('Erreur lors de la récupération des produits', error.message)
            setFormats([])
        }
    }

    const handleBackgroundClick = (e) => {
        if(e.target.className === 'modalVenteBackground') {
            closeModal(false)
        }
    }

    function handleSelectCategorie(e) {
        const productId = e.target.value;
        setValueCategorie(productId);
        
        // Vérification du produit sélectionné
        if (productId) {
            const selectedProduct = products.find((produit) => produit.id === Number(productId));
            
            if (selectedProduct) {
                const idProduitSelected = selectedProduct.id;

                setCommande((prev) => ({
                    ...prev,
                    categorie: idProduitSelected,
                }));
    
                fetchProductById(productId);
            } else {
                console.error('Produit non trouvé dans la liste des produits', productId); // Log si le produit n'existe pas
            }
        } else {
            setFormats([]);
            setSelectedProduct(null);
            setPrixTotal(0);
            setCommande((prev) => ({
                ...prev,
                categorie: '',
            }));
        }
    }

    const handleNombreChange = (e) => {
        const value = e.target.value
        if (!isNaN(value) && Number(value) >= 0) {
            setNombre(value)
            setCommande((prev) => ({...prev, nombre: value}))
        }
        else {
            console.log('Veuillez entrer un nombre valide !')
        }
    }

    const handleChangeFormat = (e) => {
        const value = e.target.value
        setSelectedFormat(value)
        setCommande((prev) => ({...prev, format: value}))
    }

    function handleChangeDate(e) {
        const value = e.target.value
        setCurrentDate(value)
        setCommande((prev) => ({...prev, date: value}))
    }

    //Calcul de la montant total de la commande
    const calculMontantTotal = () => {
        if (selectedFormat && nombre > 0) {
            const formatDetails = formats.find((format) => format.value === selectedFormat)
            const prixUnitaire = formatDetails?.prix_unitaire || 0
            setPrixTotal(prixUnitaire * nombre)
        }
        else {
            setPrixTotal(0)
        }
    }

    //Envoyer les données dans la base de donnée
    const sendCommand = async () => {
        try {
            
            if (commande.typeClient !== '' && 
                commande.nomClient !== '' && 
                commande.nombre !== '' && 
                commande.categorie !== '' && 
                commande.format !== '' && 
                commande.date !== '' && 
                prixTotal > 0) {

                const newCommand = {
                    type_client: commande.typeClient === '1' ? 'Client' : 'Membre',
                    nom_client: commande.nomClient,
                    nombre: commande.nombre,
                    categorie: commande.categorie,
                    format: commande.format,
                    date: commande.date,
                    montant_total: prixTotal
                }

                await window.electronAPI.addVente(newCommand)

                //Réinitialisation des champs après l'enregistrement
                setCommande({
                    typeClient: '',
                    nomClient: '',
                    nombre: '',
                    categorie: '',
                    format: '',
                    date: currentDate
                })

                setNombre('')
                setPrixTotal(0)

                if (newCommand) {
                    setTimeout(() => {
                        refreshVenteTableau()
                        closeModal()
                    })
                }
            }

        } catch (error) {
            console.log("Erreur lors de l'envoie de la commande", error.message)
        }
    }

    //Chargée la récupération des produits au moment de l'ouverture du modal
    useEffect(() => {
        fetchProductById(selectedProduct)
        fetchProducts()
    }, [])

    //Récupération de la date et formatage après
    useEffect(() => {
        const today = new Date()
        const formattedDate = today.toISOString().split('T')[0]
        setCurrentDate(formattedDate)
        setCommande((prev) => ({...prev, date: formattedDate}))
        fetchProducts()
    }, [])

    //Définition du nom du client dans la base de donnée en fonction du choix de l'user
    useEffect(() => {
        if (typeClient === '1' && nomClient !== 'Client') {
            setNomClient('Client')
            setCommande((prev) => ({
                ...prev,
                nomClient: 'Client'
            }))
        }
        else if (typeClient === '2') {
            if (!nomClient) {
                setNomClient('')
                setCommande((prev) => ({...prev, nomClient: ''}))
            }
        }
    }, [typeClient, nomClient])

    useEffect(() => {
        setCommande((prev) => ({
            ...prev,
            typeClient,
            nomClient: typeClient === '1' ? 'Client' : ''
        }))
    }, [typeClient])

    useEffect(() => {
        fetchProducts()
    }, [typeClient])

    //Recalculer le montant total si le format change ou la quantité change
    useEffect(() => {
        calculMontantTotal()
    }, [selectedFormat, nombre])

    return(
        <div className='modalVenteBackground' onClick={handleBackgroundClick}>
            <div className="modalVenteContainer">
                <div className="modalVenteBody">
                    <div className="header">
                        <h3>Effectuer nouvelle vente</h3>
                    </div>
                    <div className="body">
                        <div className='inputModal'>
                            <h6 className='subtitleInput'>Type client</h6>
                            <select className='option' onChange={handleSelectedOptionClient}>
                                {
                                    optionClient.map((option, index) => {
                                        return(
                                            <option key={index} value={option.value}>{option.label}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='inputModal'>
                            <h6 className='subtitleInput'>Matricule du client</h6>
                            <input 
                                type="numbre" 
                                placeholder='Entrer le nom du client'
                                className={inputError ? 'errorInput' : inputSuccess ? 'successInput' : ''}
                                value={matriculeClient}
                                onChange={(e) => setMatriculeClient(e.target.value)}
                                onBlur={checkClientByMatricule}
                                disabled={typeClient === '1' || typeClient === ''}
                            />
                        </div>
                        <div className='inputModal'>
                            <h6 className='subtitleInput'>Nom produit</h6>
                            <select className='option' onChange={handleSelectCategorie}>
                                <option value="" key="">Sélectionner un produit</option>
                                {
                                    products.map((produit, index) => {
                                        return(
                                            <option key={index} value={produit.id}>{produit.nom}</option>
                                        )
                                    })
                                }
                                {commande.categorie}
                            </select>
                        </div>
                        <div className='inputSection'>
                            <div className='inputChild'>
                                <h6 className='subtitleInput'>Nombre</h6>
                                <input 
                                    type="number" 
                                    placeholder='Entrer le nombre'
                                    value={nombre}
                                    onChange={handleNombreChange}
                                />
                            </div>
                            <div className='inputChild'>
                                <h6 className='subtitleInput'>Format</h6>
                                <select 
                                    className='option'
                                    onChange={handleChangeFormat}
                                >
                                    <option value="" key="">Sélectionner un format</option>
                                    {
                                        formats.map((format, index) => {
                                            return(
                                                <option key={index} value={format.value}>{format.label}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className='inputModal'>
                            <h6 className='subtitleInput'>Date impression</h6>
                            <input 
                                type="date" 
                                value={currentDate}
                                onChange={handleChangeDate}
                            />
                        </div>
                        <div className='inputModal'>
                            <h6 className='subtitleInput'>Total</h6>
                            <input type="text" value={`${prixTotal} Ar`} readOnly />
                        </div>
                    </div>
                    <div className="footer">
                        <button className='btnAddCommand' onClick={sendCommand}>Effectuer</button>
                        <button className='btnCancel' onClick={() => closeModal(false)}>Annuler</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalPrint;