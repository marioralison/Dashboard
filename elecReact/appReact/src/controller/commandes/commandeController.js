const data = require('../../model/database.js')
const db = data.getDataBase()

const addCommand = (commande) => {
    return new Promise((resolve, reject) => {
        const id_produit = 1
        const query = `
            INSERT INTO Commandes (type_client, nom_client, produit_id, nombre, format, date, montant_total)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `

        db.run(query, 
            [
                commande.type_client,
                commande.nom_client,
                id_produit,
                commande.nombre,
                commande.format,
                commande.date,
                commande.montant_total
            ],

            function (err) {
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

const getCommands = async () => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM Commandes`, (err, rows) => {
            if (err) {
                reject (err)
            }
            else {
                resolve(rows)
            }
        })
    })
}

const deleteCommande = async (id) => {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM Commandes WHERE id = ?', [id], function (err) {
            if (err) {
                reject({ success: false, message: err.message })
            } else {
                if (this.changes === 0) {
                    resolve({ success: false, message: "Aucune commande associée à cet index" })
                } else {
                    resolve({ success: true })
                }
            }
        })
    })
}

const getTotalCommandeImpression = async () => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                p.nom AS produit_nom,
                Commandes.format,
                SUM(Commandes.nombre) AS nombre,
                SUM(Commandes.montant_total) AS total_montant
            FROM 
                Commandes
            JOIN 
                Produits p ON Commandes.produit_id = p.id
            GROUP BY 
                Commandes.format
            ORDER BY 
                Commandes.format DESC;
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

module.exports = {addCommand, getCommands, deleteCommande, getTotalCommandeImpression}