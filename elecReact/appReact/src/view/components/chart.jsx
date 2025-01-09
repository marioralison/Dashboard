import React, { useEffect, useState } from "react";
import './styles/chart.css';
import { Bar } from "react-chartjs-2";
import dayjs from "dayjs";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const color = [
    '#359BC9', // Impression
    '#EFD065', // Cadre photo
    '#66E7A6'  // Plastification
];

const months = [
    'January',   'February',
    'March',     'April',
    'May',       'June',
    'July',      'August',
    'September', 'October',
    'November',  'December'
];

const Chart = () => {
    const [labels, setLabels] = useState([]);
    const [datasets, setDataSets] = useState([]);
    const [viewMode, setViewMode] = useState("1"); // Journalier par défaut
    const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD")); // Date courante par défaut

    const groupDataByViewMode = (dataStats) => {
        let filteredData = dataStats;

        // Filtrer par date sélectionnée si elle existe
        if (selectedDate) {
            filteredData = dataStats.filter(data => {
                const formattedDate = dayjs(data.date);
                if (viewMode === "1") { // Journalier
                    return formattedDate.isSame(dayjs(selectedDate), 'day');
                } else if (viewMode === "2") { // Mensuel
                    return formattedDate.isSame(dayjs(selectedDate), 'month');
                } else if (viewMode === "3") { // Annuel
                    return formattedDate.isSame(dayjs(selectedDate), 'year');
                }
                return true; // Pour Global, ne pas filtrer
            });
        }

        if (viewMode === "1") { // Journalier
            const days = Array.from(new Set(filteredData.map(data => dayjs(data.date).format("YYYY-MM-DD")))).sort();
            setLabels(days);
            return groupData(filteredData, days, "YYYY-MM-DD");
        } else if (viewMode === "2") { // Mensuel
            // Les jours du mois (1 à 31)
            const daysOfMonth = [...Array(31).keys()].map(i => (i + 1).toString());
            setLabels(daysOfMonth);
            return groupData(filteredData, daysOfMonth, "D"); // "D" pour les jours
        } else if (viewMode === "3") { // Annuel
            // Les mois (Janvier à Décembre)
            setLabels(months);
            return groupData(filteredData, months, "MMMM"); // "MMMM" pour le nom du mois complet
        } else if (viewMode === "4") { // Global
            // Les années
            const years = Array.from(new Set(filteredData.map(data => dayjs(data.date).format("YYYY")))).sort();
            setLabels(years);
            return groupData(filteredData, years, "YYYY");
        }
    };

    const groupData = (dataStats, labels, format) => {
        return Array.from(new Set(dataStats.map(data => data.produit_nom))).map((produit, index) => {
            return {
                label: produit,
                data: labels.map(label => {
                    return dataStats.filter(product => {
                        const formattedDate = dayjs(product.date).format(format);
                        return product.produit_nom === produit && formattedDate === label;
                    }).reduce((acc, item) => acc + item.montant_total, 0);
                }),
                backgroundColor: color[index],
                borderRadius: 8,
            };
        });
    };

    const getStatProducts = async () => {
        try {
            const dataStats = await window.electronAPI.getStatProduits();
            const groupedData = groupDataByViewMode(dataStats);
            setDataSets(groupedData);
        } catch (error) {
            console.log('Erreur lors de la récupération des données stats', error.message);
        }
    };

    useEffect(() => {
        getStatProducts();
    }, [viewMode, selectedDate]); // Mettre à jour les données lorsque le mode ou la date change

    const handleViewChange = (event) => {
        setViewMode(event.target.value);
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const dataStat = {
        labels: labels,
        datasets: datasets
    };

    return (
        <section className="containerRapport">
            <div className="rapportContent">
                <div className="headerChart">
                    <h3 className="titleRapport">Suivi des opérations</h3>
                    <div className="selectChart">
                        <input
                            className="select-date"
                            type="date"
                            value={selectedDate}
                            onChange={handleDateChange}
                            placeholder="Choisir une date"
                        />
                        <select onChange={handleViewChange}>
                            <option value="1">Journalier</option>
                            <option value="2">Mensuel</option>
                            <option value="3">Annuel</option>
                            <option value="4">Global</option>
                        </select>
                    </div>
                </div>
                <div className="bodyChart">
                    <Bar
                        data={dataStat}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    position: 'top',
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
                                        text: viewMode === "1" ? "Jour" : viewMode === "2" ? "Chaque jour du mois" : viewMode === "3" ? "Chaque mois" : "Global"
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
};

export default Chart;
