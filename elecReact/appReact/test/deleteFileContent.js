const fs = require('fs')
const readline = require('readline')

const cheminFichier = './test/data/fileData.txt'

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
            return
        }

        //Convertir le contenu du fichier en tableau, chaque ligne est un élément du tableau
        const lines = data.split('\n')

        //Filtrer les lignes pour supprimer celle qui contient l'élément à supprimer
        const updatedLines = lines.filter(lines => lines.trim().toLowerCase() !== itemToDelete.toLowerCase())

        if (lines.length === updatedLines.length){
            console.log(`" ${itemToDelete} "  ne se trouve pas dans le fichier !\n`)
            setTimeout(() => inputContentDelete(), 500);
        }
        else{
            //Convertir le tableau en chaîne de caractères
            const updatedData = updatedLines.join('\n')

            //Ecrire le contenu mis à jour dans le fichier
            fs.writeFile(filePath, updatedData, 'utf-8', (err) => {
                if (err) {
                    console.log('Il y a une erreur lors de l\'écriture du fichier : ', err)
                    return
                }
                console.log(`L'élément "${itemToDelete}" a été supprimé avec succès !`)
            })
        }
    })
}

//Supprimer tous les éléments du fichier
function deleteAllContent(filePath){
    fs.writeFile(filePath, '' ,(err) => {
        if (err){
            console.log('Erreur lors du tentative de suppression')
            return
        }
        console.log('Tous les éléments du fichier sont supprimés !')
    })
}

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

//Entrée élément à supprimer par l'user
function inputContentDelete(){
    rl.question('Entrer l\'élément que vous voulez supprimer : ', (answerDelete) => {

        if (answerDelete.trim() === ''){
            console.log('Veuillez entrer un donnée !')
            return inputContentDelete()
        }
        deleteContent(cheminFichier, answerDelete)

        setTimeout(() => inputContentDelete(), 500);
    })
}

inputContentDelete()