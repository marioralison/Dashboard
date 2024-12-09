const { resolve } = require('path')
const data = require('../src/model/database.js')
const db = data.getDataBase()

//Récuprer le prochain matricule
const getNextMatricule = () => {
    return new Promise((resolve, reject) => {
        db.get('SELECT lastMatricule FROM MatriculeSequence', (err, row) => {
            if(err){
                reject(err)
            }
            else {
                const nextMatricule = row.lastMatricule + 1; //Incrémente le matricule initial
                resolve(nextMatricule) //Retourne le prochain matricule
            }
        })
    })
}

//Mise à jour de la séquence après la génération du matricule
const uptadeMatriculeSequence = (newMatriculeSequence) => {
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

const generateMatricule = (id, year = new Date().getFullYear()) => {
    return `${year}/${id.toString().padStart(4, '0')}`; //Formatage du matricule
}

const addClient = async (nomClient, lienPhoto, lieuTravail, totalImpression, totalDepense, historiqueCommande) => {
    try {
        //Récupération du prochain matricule
        const nextMatricule = await getNextMatricule()

        //Génération du matricule avec le format défini
        const matricule = generateMatricule(nextMatricule)

        //Insértion du client
        db.run(`
            INSERT INTO Clients (matricule ,nameClient, lienPhoto, lieuTravail, totalImpression, totalDepense, historiqueCommande)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [matricule, nomClient, lienPhoto, lieuTravail, totalImpression, totalDepense, historiqueCommande],
            function(err) {
                if (err){
                    console.log('Erreur insertion du client', err.message)
                    return
                }

                //Mise à jour de la séquence du matricule afin de l'utiliser après le prochain insertion de client
                uptadeMatriculeSequence(nextMatricule)
                    .then(() => {
                        console.log(`Le client a été ajouté avec succès. Matricule : ${matricule}`)
                    })
                    .catch((err) => {
                        console.log('Erreur lors de la mise à jour de la séquence matricule', err.message)
                    })
            }
        )
    } catch (error) {
        console.log('Erreur lors de la génération du matricule : ', err.message)
    }
}

addClient('Lion Hill', 'Lien Photo dans le galerie', 'Tamatave', 122, 2000, 0)