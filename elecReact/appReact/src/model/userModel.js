const data = require('./database.js')

//Ajout utilisateur
const addUser = (name, password) => {
    return new Promise((resolve, reject) => {
        const db = data.getDataBase()
        db.run('INSERT INTO Users (name, password) VALUES (?, ?)', [name, password], function(err) {
            if (err) {
                return reject(err)
            }
            resolve(this.lastID);
        })
    })
}

//Authentification de l'user
const getUser = async (name) => {
    try{
        const db = await data.getDataBase()
        const row = await new Promise((resolve, reject) => {
            db.get('SELECT name, password FROM Users WHERE name = ?', [name], (err, result) => {
                if (err) reject(err)
                resolve(result)
            })
        })
        return row
    } catch (err) {
        console.log('Erreur d\'authentification !', err)
        throw err
    }
}

const userData = async (event, name) => {
    try {
        const userDonnee = await getUser(name)
        return userDonnee
    } catch (error) {
        console.log('Erreur au niveau de la gestion de collection de donnée !', err)
        return null
    }
} 

module.exports = { addUser, userData }