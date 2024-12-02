const data = require('../src/model/database')
const argon2 = require('argon2')



const collecterUser = async (name, newPassword) => {
    try {
        const db = await data.getDataBase()
        const userData = await new Promise((resolve, reject) => {
            db.get('SELECT name, password FROM Users WHERE name = ?', [name], (err, result) => {
                if (err) reject(err)
                resolve(result)
            })
        })
    
        const verification = await argon2.verify(userData.password, newPassword)
        
        if (verification) {
            return true
        }
        else {
            return false
        }

    } catch (error) {
        console.log('Erreur lors de la collection de donnée User', err)
    }
}

collecterUser('deen', '0496')
    .then((result) => {
        console.log(result)
    })
    .catch((err) => {
        console.log('Utilisateur invalide !')
    })