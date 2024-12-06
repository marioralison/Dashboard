import React, { useState } from 'react';
import './styles/modalVente.css'

const ModalPrint = ({closeModal}) => {

    const [valueClient, setValueClient] = useState('')
    const [valueCategorie, setValueCategorie] = useState('')
    const [valueFormat, setValueFormat] = useState('')

    const optionClient = [
        {label: 'Membre', value: 'clientMembre'},
        {label: 'Client simple', value: 'clientSimple'}
    ]

    const optionCategorie = [
        {label: 'Cadre photo', value: 'cadrePhoto'},
        {label: 'Cadre photo', value: 'cadrePhoto'}
    ]

    const optionFormat = [
        {label: 'A3', value: 'A3'},
        {label: 'A4', value: 'A4'},
        {label: 'A5 (10 x 15)', value: 'A5'}
    ]

    const handleBackgroundClick = (e) => {
        if(e.target.className === 'modalVenteBackground') {
            closeModal(false)
        }
    }

    function handleSelectOptionClient(e){
        setValueClient(e.target.value)
    }

    function handleSelectOptionCategorie(e){
        setValueCategorie(e.target.value)
    }

    function handleSelectOptionFormat(e){
        setValueFormat(e.target.value)
    }

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
                            <select className='option' onChange={handleSelectOptionClient}>
                                {
                                    optionClient.map(option => {
                                        return(
                                            <option value={option.value}>{option.label}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='inputModal'>
                            <h6 className='subtitleInput'>Nom client</h6>
                            <input type="text" placeholder='Entrer le nom du client'/>
                        </div>
                        <div className='inputModal'>
                            <h6 className='subtitleInput'>Catégorie</h6>
                            <select className='option' onChange={handleSelectOptionCategorie}>
                                {
                                    optionCategorie.map(option => {
                                        return(
                                            <option value={option.value}>{option.label}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='inputSection'>
                            <div className='inputChild'>
                                <h6 className='subtitleInput'>Nombre</h6>
                                <input type="number" placeholder='Entrer le nombre'/>
                            </div>
                            <div className='inputChild'>
                                <h6 className='subtitleInput'>Format</h6>
                                <select className='option' onChange={handleSelectOptionFormat}>
                                    {
                                        optionFormat.map(option => {
                                            return(
                                                <option value={option.value}>{option.label}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className='inputModal'>
                            <h6 className='subtitleInput'>Date impression</h6>
                            <input type="date" placeholder='Entrer la date impression'/>
                        </div>
                    </div>
                    <div className="footer">
                        <button className='btnAddCommand'>Effectuer</button>
                        <button className='btnCancel' onClick={() => closeModal(false)}>Annuler</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalPrint;