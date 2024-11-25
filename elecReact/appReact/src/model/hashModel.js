const argon2 = require('argon2')

async function createPassword(password) {
    const hash = await argon2.hash(password, {
        type : argon2.argon2id,
        memoryCost : 2 ** 16, 
        timeCost : 4,
        parallelism : 2
    })
    return hash
}

module.exports = {createPassword}