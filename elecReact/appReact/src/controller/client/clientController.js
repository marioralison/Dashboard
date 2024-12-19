const data = require('../../model/database.js')
const db = data.getDataBase()

//Insertion des données du client
const insertClient = (matricule, nomClient, lieuTravail, numeroPhone) => {
    return new Promise((resolve, reject) => {
        db.run(`
            INSERT INTO Clients (matricule, nameClient, lieuTravail, numberPhone)
            VALUES (?, ?, ?, ?)`,
            [matricule, nomClient, lieuTravail, numeroPhone],
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

const getClientByName = async (name) => {
    const query = 'SELECT * FROM Clients WHERE LOWER(nameCLient) LIKE LOWER(?)'
    return new Promise((resolve, reject) => {
        db.all(query, [`%${name}%`], (err, rows) => {
            if (err) {
                reject(err)
            }

            if (rows.length === 0){
                resolve([])
            }

            resolve(rows)
        })
    })
}

module.exports = {addClient, getClient, deleteClient, updateClient, getClientByName}