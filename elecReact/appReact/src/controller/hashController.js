const argon2 = require('argon2');

// Fonction pour vérifier le mot de passe
async function verifyPassword(event, hash, password) {
    try {
        return await argon2.verify(hash, password);
    } catch (err) {
        console.log('Erreur lors de la vérification :', err);
        return false;
    }
}

module.exports = { verifyPassword }