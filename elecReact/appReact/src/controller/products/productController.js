const data = require('../../model/database.js')
const db = data.getDataBase()

const getImpressionClientMembre = async () => {
    const query = `
        SELECT t.taille AS taille, pr.prix_unitaire AS prix_unitaire
        FROM Prix pr
        JOIN Produits p ON pr.produit_id = p.id
        JOIN Tailles t ON pr.taille_id = t.id
        JOIN Type_Clients tc ON pr.type_client_id = tc.id
        WHERE p.nom = 'Impression' AND tc.type = 'Membre';
    `
    return new Promise((resolve, reject) => {
        db.all(query, (err, rows) => {
            if (err) {
                reject (err)
            }
            resolve(rows)
        })
    })
}

module.exports = {getImpressionClientMembre}