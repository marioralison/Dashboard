const path = require('node:path');
const sqlite3 = require('sqlite3')

//Chemin de la base de donnée
const dbPath = path.join('./src/model/database/database.db')
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.log('Il y a une erreur lors de la connexion à la base de donnée : ', err.message)
    }
})

function getDataBase(){
    return db
}

module.exports = {getDataBase}