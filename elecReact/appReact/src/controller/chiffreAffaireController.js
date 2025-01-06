const data = require('../model/database.js')
const db = data.getDataBase()

const getChiffreAffaireGlobal = async () => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                SUM(total_montant) AS chiffre_affaire_total
            FROM (
                SELECT 
                    SUM(v.montant_total) AS total_montant
                FROM 
                    Ventes v
                UNION ALL
                SELECT 
                    SUM(c.montant_total) AS total_montant
                FROM 
                    Commandes c
            ) AS chiffres;
        `
        db.get(query, (err, row) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(row)
            }
        })
    })
}

module.exports = { getChiffreAffaireGlobal }