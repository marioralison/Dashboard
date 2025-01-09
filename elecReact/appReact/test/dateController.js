const dataStats = [
    {
        date: '2025-01-06',
        produit: 'Cadre photo',
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
        produit: 'Plastification',
        format: 'A6',
        chiffre_affaire: 54600
    },
    {
        date: '2025-02-09',
        produit: 'Impression',
        format: 'A6',
        chiffre_affaire: 76800
    },
    {
        date: '2025-02-10',
        produit: 'Plastification',
        format: 'A6',
        chiffre_affaire: 69000
    },
    {
        date: '2025-02-11',
        produit: 'Cadre photo',
        format: 'A6',
        chiffre_affaire: 69000
    }
]

const dataDate = Array.from(new Set(dataStats.map(data => data.date.substr(0, 7)).sort()))


const nomsProduit = Array.from(new Set(dataStats.map(data => data.produit)))

const statsProduit = nomsProduit.map((nom) => {
    return {
        nom_produit : nom,
        montant_total: dataDate.map(date => {
            return dataStats.filter(product => product.produit === nom && product.date.substr(0, 7) === date)
                .reduce((acc, item) => {
                    return acc = item.chiffre_affaire + acc
                }, 0)
        })
    }
})