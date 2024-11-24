const user = require('../model/userModel.js')

const handleAddUser = async (event, name, password) => {
    try {
        const userId = await user.addUser(name, password)
        return userId
    }
    catch{
        console.log('Il y a une erreur lors de l\'ajout de l\'utilisateur !', err.message)
        throw err
    }
}

module.exports = {handleAddUser}