const argon2 = require('argon2')

//Hashage du mot de passe
async function createPassword(password) {
    const hash = await argon2.hash(password, {
        type : argon2.argon2d,
        memoryCost : 2 ** 16,
        timeCost : 4,
        parallelism : 2
    })
    return hash
}

//Vérification du mot de passe
async function verifyPassword(hash, password){
    try {
        return await argon2.verify(hash, password)
    }
    catch (err) {
        console.log('Erreur lors de la vérification : ', err)
        return false
    }
}

(async () => {
    const password = 'matio@633'
    const hash = await createPassword(password)
    console.log('Hachage généré : ', hash)

    const isValid = await verifyPassword(hash, 'password')
    console.log(isValid ? 'Mot de passe valide' : 'Mot de passe invalide')
})()