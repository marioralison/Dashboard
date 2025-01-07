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
    }
]

//Gestion des dates
const extractionDateMensuelle = (date) => {
    return new Date(date).getDate() //Extration du jour à partir de la date
}

const labels = dataImpression.map((item) => extractionDateMensuelle(item.date))

//Extraction des données du chiffre d'affaire
const chiffre_affaire_journalier = dataImpression.map((item) => item.chiffre_affaire)

console.log(chiffre_affaire_journalier)