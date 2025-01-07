import React, { useEffect, useState } from "react";
import './styles/chart.css';
import { Bar } from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Enregistrement des composants nécessaires
ChartJS.register(
    CategoryScale, // Échelle pour l'axe X
    LinearScale,   // Échelle pour l'axe Y
    BarElement,    // Barres pour les graphiques en barres
    Title,         // Titre du graphique
    Tooltip,       // Infobulles
    Legend         // Légende
);

// const dataImpression = [
//     {
//         date: '2025-01-06',
//         produit: 'Impression',
//         format: 'A6',
//         chiffre_affaire: 135800
//     },
//     {
//         date: '2025-01-07',
//         produit: 'Impression',
//         format: 'A6',
//         chiffre_affaire: 43800
//     },
//     {
//         date: '2025-01-08',
//         produit: 'Impression',
//         format: 'A6',
//         chiffre_affaire: 54600
//     },
//     {
//         date: '2025-01-09',
//         produit: 'Impression',
//         format: 'A6',
//         chiffre_affaire: 76800
//     },
//     {
//         date: '2025-01-10',
//         produit: 'Impression',
//         format: 'A6',
//         chiffre_affaire: 69000
//     },
//     {
//         date: '2025-01-11',
//         produit: 'Impression',
//         format: 'A6',
//         chiffre_affaire: 69000
//     },
//     {
//         date: '2025-01-12',
//         produit: 'Impression',
//         format: 'A6',
//         chiffre_affaire: 135800
//     },
//     {
//         date: '2025-01-13',
//         produit: 'Impression',
//         format: 'A6',
//         chiffre_affaire: 43800
//     },
//     {
//         date: '2025-01-14',
//         produit: 'Impression',
//         format: 'A6',
//         chiffre_affaire: 54600
//     },
//     {
//         date: '2025-01-15',
//         produit: 'Impression',
//         format: 'A6',
//         chiffre_affaire: 76800
//     },
//     {
//         date: '2025-01-16',
//         produit: 'Impression',
//         format: 'A6',
//         chiffre_affaire: 69000
//     },
//     {
//         date: '2025-01-17',
//         produit: 'Impression',
//         format: 'A6',
//         chiffre_affaire: 69000
//     },
//     {
//         date: '2025-01-18',
//         produit: 'Impression',
//         format: 'A6',
//         chiffre_affaire: 135800
//     },
//     {
//         date: '2025-01-19',
//         produit: 'Impression',
//         format: 'A6',
//         chiffre_affaire: 43800
//     },
//     {
//         date: '2025-01-20',
//         produit: 'Impression',
//         format: 'A6',
//         chiffre_affaire: 54600
//     },
//     {
//         date: '2025-01-21',
//         produit: 'Impression',
//         format: 'A6',
//         chiffre_affaire: 76800
//     },
//     {
//         date: '2025-01-22',
//         produit: 'Impression',
//         format: 'A6',
//         chiffre_affaire: 69000
//     },
//     {
//         date: '2025-01-23',
//         produit: 'Impression',
//         format: 'A6',
//         chiffre_affaire: 69000
//     },
//     {
//         date: '2025-01-24',
//         produit: 'Impression',
//         format: 'A6',
//         chiffre_affaire: 135800
//     },
//     {
//         date: '2025-01-25',
//         produit: 'Impression',
//         format: 'A6',
//         chiffre_affaire: 43800
//     },
//     {
//         date: '2025-01-26',
//         produit: 'Impression',
//         format: 'A6',
//         chiffre_affaire: 54600
//     },
//     {
//         date: '2025-01-27',
//         produit: 'Impression',
//         format: 'A6',
//         chiffre_affaire: 76800
//     },
//     {
//         date: '2025-01-28',
//         produit: 'Impression',
//         format: 'A6',
//         chiffre_affaire: 69000
//     },
//     {
//         date: '2025-01-29',
//         produit: 'Impression',
//         format: 'A6',
//         chiffre_affaire: 69000
//     },
//     {
//         date: '2025-01-30',
//         produit: 'Impression',
//         format: 'A6',
//         chiffre_affaire: 52000
//     },
//     {
//         date: '2025-01-31',
//         produit: 'Impression',
//         format: 'A6',
//         chiffre_affaire: 81000
//     },
// ]

// //Récupération des dates dans le donnée
// const extractionDate = (date) => {
//     return new Date(date).getDate()
// }

// const date_Data = dataImpression.map((item) => extractionDate(item.date))

// //Extraction des chiffre d'affaire
// const revenuJournalier = date_Data.map((day) => {
//     //Filter les données correspond au jour actuel
//     const dailyData = dataImpression.filter((item => extractionDate(item.date) === day))

//     if (dailyData.length > 0) {
//         return dailyData[0].chiffre_affaire
//     }
//     else {
//         return 0
//     }
// })
const color = [
    'red',
    'green',
    'orange'
]

const Chart = () => {

    const [dataProduit, setDataProduit] = useState([])
    const [labels, setLabels] = useState([])
    const [datasets, setDataSets] = useState([])

    //Récupération de la stat produit
    const getStatProducts = async () => {
        try {
            const dataStats = await window.electronAPI.getStatProduits()
            const minDate = dataStats.map(data => data.date).sort().shift()
            const maxDate = dataStats.map(data => data.date).sort().pop()
            
            const dateData = Array.from(new Set(dataStats.map(data => data.date.substr(0, 7)).sort()))
            setLabels(dateData)
            
            const nomProduit = Array.from(new Set (dataStats.map(data => data.produit_nom))).map((produit, index) => {
                return {
                    label: produit,
                    data: dateData.map(date => {
                        return dataStats.filter(product => product.produit_nom === produit && product.date.substr(0, 7) === date)
                                .reduce((acc, item) => {
                                    acc = item.montant_total + acc
                                    return acc
                                }, 0)
                    }),
                    backgroundColor: color[index],
                    borderColor: 'black',
                    borderWidth: 2,
                    borderRadius: 1,
                    borderSkipped: false,
                }
            })

            setDataSets(nomProduit)

        } catch (error) {
            console.log('Erreur lors de la récupération des données stats', error.message)
        }
    }

    const donnee = {
        labels: labels,
        datasets: datasets
    };

    //Configuration graphs
    // const config = {
    //     type: 'bar',
    //     data: donnee,
    //     options: {
    //         responsive: true,
    //         plugins: {
    //                 legend: {
    //                 position: 'top',
    //             },
    //             title: {
    //                 display: true,
    //                 text: 'Chart.js Bar Chart'
    //             }
    //         }
    //     },
    // };

    useEffect(() => {
        getStatProducts()
    }, [])

    return(
        <section className="containerRapport">
            <div className="rapportContent">
                <div className="headerChart">
                    <h3 className="titleRapport">Suivi des opérations</h3>
                    <div className="selectChart">
                        <select>
                            <option value="1">Mensuel</option>
                            <option value="2">Annuel</option>
                        </select>
                    </div>
                </div>
                <div className="bodyChart">
                    <Bar
                        data={donnee}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    position: 'top', // Position de la légende
                                },
                                tooltip: {
                                    mode: 'index',
                                    intersect: false,
                                },
                            },
                            scales: {
                                x: {
                                    beginAtZero: true,
                                    title: {
                                        display: true,
                                        text: 'Jour du Mois'
                                    }
                                },
                                y: {
                                    beginAtZero: true,
                                    title: {
                                        display: true,
                                        text: "Chiffre d'affaire (Ar)"
                                    }
                                },
                            },
                        }}
                    />
                </div>
            </div>
        </section>
    );
}

export default Chart;