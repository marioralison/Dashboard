const data = require('../../model/database.js')

const handleAddUser = async (event, name, password, role) => {
    try {
        const userId = await user.addUser(name, password, role)
        return userId
    }
    catch (error){
        console.log('Il y a une erreur lors de l\'ajout de l\'utilisateur !', error)
    }
}

module.exports = {handleAddUser}