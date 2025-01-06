const data = require('../../model/database.js')
const db = data.getDataBase()

const addVente = (commande) => {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO Ventes (type_client, nom_client, nombre, categorie, format, date, montant_total)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `

        db.run(query,
            [
                commande.type_client,
                commande.nom_client,
                commande.nombre, 
                commande.categorie,
                commande.format,
                commande.date,
                commande.montant_total
            ],

            function(err) {
                if (err) {
                    reject(err)
                }
                else {
                    resolve({ id: this.lastID })
                }
            }
        )
    })
}

const getVentes = async () => {
    return new Promise ((resolve, reject) => {
        const query = `
            SELECT 
                v.id,
                v.type_client,
                v.nom_client,
                v.nombre,
                p.nom AS categorie,
                v.format,
                v.date,
                v.montant_total
            FROM 
                Ventes v
            JOIN 
                Produits p ON v.categorie = p.id
        `
        db.all(query, (err, rows) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(rows)
            }
        })
    })
}

const deleteVenteRow = async (id) => {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM Ventes WHERE id = ?', [id], (err) => {
            if (err) {
                reject({ success: false, message: err.message})
            }
            else {
                if (this.changes === 0) {
                    resolve({success: false, message: "Aucune vente associée à cet index"})
                }
                else {
                    resolve({success: true})
                }
            }
        })
    })
}

const getTotalVente = async () => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                p.id AS produit_id,
                p.nom AS produit_nom,
                v.format,
                SUM(v.nombre) AS nombre,
                SUM(v.montant_total) AS total_montant
            FROM 
                Ventes v
            JOIN 
                Produits p ON v.categorie = p.id
            GROUP BY 
                p.nom, v.format
        `
        db.all(query, (err, rows) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(rows)
            }
        })
    })
}

module.exports = {addVente, getVentes, deleteVenteRow, getTotalVente}