const { resolve } = require('path')
const data = require('../model/database.js')
const db = data.getDataBase()

//Génération du matricule
const generateMatricule = (id, year = new Date().getFullYear()) => {
    return `${year}/${id.toString().padStart(4, '0')}`; //Formatage du matricule
}

//Récuprer le prochain matricule
const getNextMatricule = () => {
    return new Promise((resolve, reject) => {
        db.get('SELECT lastMatricule FROM MatriculeSequence', (err, row) => {
            if(err){
                return reject(err)
            }
            if(!row || typeof row.lastMatricule != 'number'){
                return reject(new Error('La sequence "lastMatricule" est introuvable ou invalide'))
            }
            else {
                const nextMatricule = row.lastMatricule + 1; //Incrémente le matricule initial
                resolve(nextMatricule) //Retourne le prochain matricule
            }
        })
    })
}

//Mise à jour de la séquence après la génération du matricule
const updateMatriculeSequence = (newMatriculeSequence) => {
    return new Promise((resolve, reject) => {
        db.run('UPDATE MatriculeSequence SET lastMatricule = ?', [newMatriculeSequence], (err) => {
            if (err) {
                reject(err)
            }
            else{
                resolve(); //La séquence est mise à jour avec succès
            }
        })
    })
}

//Insertion des données du client
const insertClient = (matricule, nomClient, lieuTravail, domicile, numeroPhone) => {
    return new Promise((resolve, reject) => {
        db.run(`
            INSERT INTO Clients (matricule, nameClient, lieuTravail, domicile, numberPhone)
            VALUES (?, ?, ?, ?, ?)`,
            [matricule, nomClient, lieuTravail, domicile, numeroPhone],
            function (err){
                if (err){
                    return reject(err)
                }
                resolve()
            }
        )
    })
}

const addClient = async (event, nomClient, lieuTravail, domicile, numeroPhone) => {
    try {
        const nextMatricule = await getNextMatricule()
        const matricule = generateMatricule(nextMatricule)

        await insertClient(matricule, nomClient, lieuTravail, domicile, numeroPhone)
        await updateMatriculeSequence(nextMatricule)

        console.log('Client ajouté avec succès, Matricule : ', matricule)

    } catch (error) {
        console.log('Erreur lors de la génération du matricule : ', error.message)
        throw error
    }
}

module.exports = {addClient}