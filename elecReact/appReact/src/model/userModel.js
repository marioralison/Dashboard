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

module.exports = { addUser }