const argon = require('argon2')

async function hashmdp(password) {
    return await argon.hash(password, {
        type: argon.argon2id,
        memoryCost: 2 ** 16,
        timeCost: 4,
        parallelism: 2
    })
}

const mot = 'mario'

hashmdp(mot)
    .then( async (result) => {
        const newMdp = 'mario'
        try{
            const verification = await argon.verify(result, newMdp)

            if (verification){
                console.log('Mot de passe valide !')
            }
            else {
                console.log('Oupss, mot de passe invalide !')
            }

        } catch (err) {
            console.log('Erreur lors de la verification de mot de passe !')
        }
    })
    .catch((err) => {
        console.log('Erreur ! ',err)
    })