import React, { useState } from 'react';
import './styles/ModalPrint.css'

const ModalPrint = ({closeModal}) => {

    const [valueClient, setValueClient] = useState('')
    const [valueFormat, setValueFormat] = useState('')

    const optionClient = [
        {label: 'Membre', value: 'clientMembre'},
        {label: 'Client Simple', value: 'clientSimple'}
    ]

    const optionFormat = [
        {label: 'A3', value: 'A3'},
        {label: 'A4', value: 'A4'},
        {label: 'A5 (10 x 15)', value: 'A5'}
    ]

    function handleOptionClient(e){
        setValueClient(e.target.value)
    }

    function handleOptionFormat(e){
        setValueFormat(e.target.value)
    }

    const handleBackgroundClick = (e) => {
        if(e.target.className === 'modalBackground') {
            closeModal(false)
        }
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
                        <div className='inputSection'>
                            <div className='inputChild'>
                                <h6 className='subtitleInput'>Nombre</h6>
                                <input type="number" placeholder='Entrer le nombre'/>
                            </div>
                            <div className='inputChild'>
                                <h6 className='subtitleInput'>Format</h6>
                                <select className='option' onChange={handleOptionFormat}>
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
                        <button className='btnAddCommand'>Ajouter</button>
                        <button className='btnCancel' onClick={() => closeModal(false)}>Annuler</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalPrint;