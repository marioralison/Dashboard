const data = require('./database.js')

//Ajout utilisateur
const addUser = (name, password, poste) => {
    return new Promise((resolve, reject) => {
        const db = data.getDataBase()
        db.run('INSERT INTO Users (name, password, role) VALUES (?, ?, ?)', [name, password, poste], function(err) {
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
            db.get('SELECT name FROM Users WHERE name = ?', [name], (err, result) => {
                if (err) reject(err)
                resolve(!!result)
            })
        })
        return row
    } catch (err) {
        console.log('Erreur d\'authentification !', err)
        throw err
    }
}

const user = async (event, name) => {
    try {
        const userName = await getUser(name)
        return {exist: userName}
    } catch (error) {
        console.log('Erreur au niveau de la gestion de collection de donnée !', error)
        return {exist: false, error: 'Erreur interne'}
    }
} 

module.exports = { addUser, user }