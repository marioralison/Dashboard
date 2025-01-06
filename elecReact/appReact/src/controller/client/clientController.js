const data = require('../../model/database.js')
const db = data.getDataBase()

//Insertion des données du client membre
const insertClient = (matricule, nomClient, lieuTravail, numeroPhone) => {
    return new Promise((resolve, reject) => {
        const type = 2 //Type client membre dans la base de donnée
        db.run(`
            INSERT INTO Clients (matricule, nameClient, lieuTravail, numberPhone, type_id)
            VALUES (?, ?, ?, ?, ?)`,
            [matricule, nomClient, lieuTravail, numeroPhone, type],
            function (err){
                if (err){
                    return reject(err)
                }
                resolve({success: true})
            }
        )
    })
}

const addClient = async (event, matricule, nomClient, lieuTravail, numeroPhone) => {
    try {
        await insertClient(matricule, nomClient, lieuTravail, numeroPhone)
        console.log('Client ajouté avec succès !')
    } catch (error) {
        console.log('Erreur lors de la génération du matricule : ', error.message)
        throw error
    }
}

const getClient = () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM Clients', [], (err, rows) => {
            if (err){
                reject(err)
            }
            resolve(rows)
        })
    })
}

const deleteClient = (matricule) => {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM Clients WHERE matricule = ?', [matricule], (err) => {
            if (err){
                reject({ success: false, message: err.message });
            }
            else{
                if (this.change === 0){
                    //Si aucune ligne n'a été supprimé
                    resolve({success: false, message: "Aucun client trouvé avec ce matricule"})
                }
                else{
                    resolve({success: true})
                }
            }
        })
    })
}

const updateClient = (matricule, nameClient, lieuTravail, numberPhone) => {
    return new Promise((resolve, reject) => {
        db.run(`
            UPDATE Clients
            SET nameClient = ?, lieuTravail = ?, numberPhone = ?
            WHERE matricule = ?
        `, [nameClient, lieuTravail, numberPhone, matricule],
        function (err) {
            if (err) {
                reject({success: false, message: err.message})
            }
            else {
                if (this.change === 0) {
                    //Si aucune ligne n'a été mise à jour
                    resolve({success: false, message: "Aucun client trouvé avec ce matricule"})
                }
                else {
                    resolve({success: true})
                }
            }
        }
    )})
}

const getClientByMatricule = async (matricule) => {
    const query = 'SELECT * FROM Clients WHERE matricule = ?'
    return new Promise((resolve, reject) => {
        db.get(query, [matricule], (err, row) => {
            if (err) {
                reject(err)
            }
            resolve(row)
        })
    })
}

const updateClientStat = async (matriculeClient, additionalImpression, totalDepense) => {
    const query = `
        UPDATE Clients
        SET 
            totalImpression = COALESCE(totalImpression, 0) + ?,
            totalDepense = COALESCE(totalDepense, 0) + ?
        WHERE matricule = ?
            AND type_id = (SELECT id FROM Type_clients WHERE type = 'Membre');
    `

    return new Promise((resolve, reject) => {
        db.run(query, [additionalImpression, totalDepense, matriculeClient], (err) => {
            if (err) {
                reject(err)
            }
            else {
                resolve({ changes: this.changes })
            }
        })
    })
} 

const getTotalClientMembre = async () => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT COUNT(*) AS total_membre
            FROM Clients 
            WHERE type_id = 2
        `

        db.get(query, (err, result) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(result.total_membre)
            }
        })
    })
}

const getClassementClient = async () => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                nameCLient,
                matricule,
                lieuTravail,
                totalImpression
            FROM Clients
            ORDER BY 
                totalImpression DESC
            LIMIT 4;
        `
        db.all(query, (err, rows) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(rows)
            }
        })
    })
}

module.exports = {
                    addClient,
                    getClient, 
                    deleteClient, 
                    updateClient, 
                    getClientByMatricule, 
                    updateClientStat,
                    getTotalClientMembre,
                    getClassementClient
                }