const data = require('./database.js')

const getA5 = async () => {
    try{
        const db = await data.getDataBase()
        const row = await new Promise((resolve, reject) => {
            db.get(`
                SELECT 
                    SUM(nombreProduit) nombreTotalA5, 
                    SUM(nombreProduit * prixUnitaireProduit) totalPrixVenteA5
                FROM Commandes
                WHERE Commandes.produitId = '2'`, (err, result) => {
                if (err) reject(err)
                resolve(result)
            })
        })
        return row
    } catch (err) {
        console.log('Erreur de collection de donnée', err)
        throw err
    }
}

const getA4 = async () => {
    try{
        const db = await data.getDataBase()
        const row = await new Promise((resolve, reject) => {
            db.get(`
                SELECT 
                    SUM(nombreProduit) nombreTotalA4, 
                    SUM(nombreProduit * prixUnitaireProduit) totalPrixVenteA4
                FROM Commandes
                WHERE Commandes.produitId = '3'`, (err, result) => {
                if (err) reject(err)
                resolve(result)
            })
        })
        return row
    } catch (err) {
        console.log('Erreur de collection de donnée', err)
        throw err
    }
}

module.exports = {getA5, getA4}