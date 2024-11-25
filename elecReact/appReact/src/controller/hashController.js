const { argon2d } = require('argon2')
const createPassword = require('../model/hashModel.js')

async function verifyPassword(hash, password) {
    try {
        return await argon2d.verify(hash, password)
    } catch (err) {
        console.log('Erreur lors de la vérification : ', err)
        return false
    }
}
(async () => {
    const password = 'mario633'
    const hash = await createPassword.password
    console.log('Hashage généré : ', hash)
})()