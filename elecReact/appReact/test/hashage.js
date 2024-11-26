const { hashPassword } = require('../src/Model/hashModel.js')
const { verifyPassword } = require('../src/controller/hashController.js')

//Générer un mot de passe haché
const createPassword = async (password) => {
    const hash = await hashPassword(password)
    console.log('Hashage généré : ', hash)
}

module.exports = { createPassword }