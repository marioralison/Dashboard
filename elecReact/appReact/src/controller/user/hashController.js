const argon2 = require('argon2');
const data = require('../../model/database.js')

// Fonction pour vérifier le mot de passe
async function verificationMdp(event, name, inputPassword) {
    try {
        // Récupération des données de l'utilisateur depuis la base de données
        const db = data.getDataBase();
        const userData = await new Promise((resolve, reject) => {
            db.get('SELECT name, password FROM Users WHERE name = ?', [name], (err, result) => {
                if (err) {
                    console.error('Erreur SQL :', err.message);
                    return reject(err);
                }
                resolve(result);
            });
        });

        // Vérification de l'existence de l'utilisateur
        if (!userData) {
            return false;
        }

        // Vérification de l'existence du mot de passe
        if (!userData.password) {
            console.log('Mot de passe introuvable pour cet utilisateur.');
            return false;
        }

        // Vérification du mot de passe
        const verification = await argon2.verify(userData.password, inputPassword);

        if (verification) {
            return true
        }
        else {
            return false
        }

    } catch (err) {
        console.error('Erreur lors de la vérification du mot de passe :', err.message);
        return false;
    }
}

module.exports = { verificationMdp }