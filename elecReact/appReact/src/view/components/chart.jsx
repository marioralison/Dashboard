import React from "react";
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

const dataImpression = [
    {
        date: '2025-01-06',
        produit: 'Impression',
        format: 'A6',
        chiffre_affaire: 135800
    },
    {
        date: '2025-01-07',
        produit: 'Impression',
        format: 'A6',
        chiffre_affaire: 43800
    },
    {
        date: '2025-01-08',
        produit: 'Impression',
        format: 'A6',
        chiffre_affaire: 54600
    },
    {
        date: '2025-01-09',
        produit: 'Impression',
        format: 'A6',
        chiffre_affaire: 76800
    },
    {
        date: '2025-01-10',
        produit: 'Impression',
        format: 'A6',
        chiffre_affaire: 69000
    },
    {
        date: '2025-01-11',
        produit: 'Impression',
        format: 'A6',
        chiffre_affaire: 69000
    },
    {
        date: '2025-01-12',
        produit: 'Impression',
        format: 'A6',
        chiffre_affaire: 135800
    },
    {
        date: '2025-01-13',
        produit: 'Impression',
        format: 'A6',
        chiffre_affaire: 43800
    },
    {
        date: '2025-01-14',
        produit: 'Impression',
        format: 'A6',
        chiffre_affaire: 54600
    },
    {
        date: '2025-01-15',
        produit: 'Impression',
        format: 'A6',
        chiffre_affaire: 76800
    },
    {
        date: '2025-01-16',
        produit: 'Impression',
        format: 'A6',
        chiffre_affaire: 69000
    },
    {
        date: '2025-01-17',
        produit: 'Impression',
        format: 'A6',
        chiffre_affaire: 69000
    },
    {
        date: '2025-01-18',
        produit: 'Impression',
        format: 'A6',
        chiffre_affaire: 135800
    },
    {
        date: '2025-01-19',
        produit: 'Impression',
        format: 'A6',
        chiffre_affaire: 43800
    },
    {
        date: '2025-01-20',
        produit: 'Impression',
        format: 'A6',
        chiffre_affaire: 54600
    },
    {
        date: '2025-01-21',
        produit: 'Impression',
        format: 'A6',
        chiffre_affaire: 76800
    },
    {
        date: '2025-01-22',
        produit: 'Impression',
        format: 'A6',
        chiffre_affaire: 69000
    },
    {
        date: '2025-01-23',
        produit: 'Impression',
        format: 'A6',
        chiffre_affaire: 69000
    },
    {
        date: '2025-01-24',
        produit: 'Impression',
        format: 'A6',
        chiffre_affaire: 135800
    },
    {
        date: '2025-01-25',
        produit: 'Impression',
        format: 'A6',
        chiffre_affaire: 43800
    },
    {
        date: '2025-01-26',
        produit: 'Impression',
        format: 'A6',
        chiffre_affaire: 54600
    },
    {
        date: '2025-01-27',
        produit: 'Impression',
        format: 'A6',
        chiffre_affaire: 76800
    },
    {
        date: '2025-01-28',
        produit: 'Impression',
        format: 'A6',
        chiffre_affaire: 69000
    },
    {
        date: '2025-01-29',
        produit: 'Impression',
        format: 'A6',
        chiffre_affaire: 69000
    },
    {
        date: '2025-01-30',
        produit: 'Impression',
        format: 'A6',
        chiffre_affaire: 52000
    },
    {
        date: '2025-01-31',
        produit: 'Impression',
        format: 'A6',
        chiffre_affaire: 81000
    },
]

//Récupération des dates dans le donnée
const extractionDate = (date) => {
    return new Date(date).getDate()
}

const date_Data = dataImpression.map((item) => extractionDate(item.date))

//Extraction des chiffre d'affaire
const revenuJournalier = date_Data.map((day) => {
    //Filter les données correspond au jour actuel
    const dailyData = dataImpression.filter((item => extractionDate(item.date) === day))

    if (dailyData.length > 0) {
        return dailyData[0].chiffre_affaire
    }
    else {
        return 0
    }
})

const Chart = () => {

    const data = {
        labels: date_Data,
        datasets: [
            {
                label: 'Impression',
                data: revenuJournalier, // Données pour le produit A
                backgroundColor: 'rgba(75, 130, 192, 0.2)', // Couleur de remplissage
                borderColor: 'rgb(39, 148, 148)', // Couleur des bordures
                borderWidth: 1,
                borderRadius: 8
            }
        ],
    };

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
                        data={data}
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