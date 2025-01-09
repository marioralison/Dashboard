const data = require('../../model/database.js')
const db = data.getDataBase()

const getProduitStatData = () => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                p.nom AS produit_nom, 
                c.date,
                c.montant_total
            FROM 
                Commandes c 
            JOIN 
                Produits p 
            ON 
                c.produit_id = p.id

            UNION ALL

            SELECT 
                p.nom AS produit_nom, 
                v.date,
                v.montant_total
            FROM 
                Ventes v 
            JOIN 
                Produits p 
            ON 
                v.categorie = p.id;
        `
        db.all(query, (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
}

module.exports = { getProduitStatData }