//---------Les promises---------
// Une promesse représente une valeur qui peut être disponible maintenant, dans le futur voire jamais

// //Deux parties : 

//     - Déclaration : 'new Promise' qui comporte deux arguments "resolve" et "reject"
//     - Utilisation : 'then' et 'catch' pour l'utilisation de la promesse

// const calcul = (val1, val2) => {
//     return new Promise ((resolve, reject) => {

//         const result = val1 + val2
//         if (result){
//             resolve(result)
//         }
//         else{
//             reject()
//         }
//     })
// }

// calcul(8, 10)
//     .then((result) => {
//     console.log('Le total addition : ', result)})
//     .catch((err) => {
//     console.log('Il y a une erreur !', err)})
const readline = require('readline')

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

function demandeUser(){
    return new Promise ((resolve, reject) => {
        rl.question('Est ce que c\'est Ok ? ', (answer) => {
        })
        if (answer){
            resolve()
        }
        else{
            reject()
        }

        demandeUser()
    })
    .then(() => {
        console.log('Miditra then ilay izy')
    })
}

demandeUser()