const fs = require('fs')

const filePath = './data/fileData.txt'

// //Suppresion d'un contenu d'un fichier
// En 3 étapes : 
//     - Lecture de contenu du fichier
//     - Recherche et suppression de l'élément
//     - Ecrire le contenu modifié dans le fichier (en écrasant l'ancien contenu)

function deleteContent(filePath, itemToDelete){

    //Lecture du fichier
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.log('Il y a une erreur lors de la lecture du fichier !')
        }
    })
}