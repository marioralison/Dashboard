const data = require('../../model/database.js')
const db = data.getDataBase()

const getProduct = async () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM Produits', (err, rows) => {
            if (err) {
                reject (err)
            }
            resolve(rows)
        })
    })
}

module.exports = {getProduct}