// //Récupérer les données de la base
// ipcMain.handle('db:getUsers', (event) => {
//   return new Promise((resolve, reject) => {
//       db.all('SELECT * FROM users', [], (err, rows) => {
//           if (err) reject(err);
//           else resolve(rows);
//       });
//   });
// });

// //Ajouter un utilisateur dans la base de donnée
// ipcMain.handle('db:addUser', (event, name, password) => {
//   return new Promise((resolve, reject) => {
//     db.run('INSERT INTO Users (name, password) VALUES (?, ?)', [name, password], function (err){
//       if (err) {
//         reject (err)
//       }
//       else {
//         resolve(this.lastID) //L'ID de l'user ajouté
//       }
//     })
//   })
// })

// ipcMain.handle('user:signIn', async (event, name, password) => {
//   return new Promise ((resolve, reject) => {
//     db.all(`SELECT id, name 
//             FROM Users 
//             WHERE name = ? AND password = ?`, [name, password], function (err, rows){

//       if(err){
//         console.log(err)
//         reject("Erreur de connexion !")
//       }
//       else{
//         if (rows.length === 1){
//           console.log('Connexion réussi !')
//           resolve(rows[0])
//         }
//         else{
//           reject("Erreur de connexion !")
//         }
//       }
//     })
//   })
// })