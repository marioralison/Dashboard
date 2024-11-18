const { content } = require('flowbite-react/tailwind')
const fs = require('fs')
const { stdin, stdout } = require('process')
const readline = require('readline')

const rl = readline.createInterface({
    input : stdin,
    output : stdout
})

const fichier = './test/data/fileData.txt'

// //Mis à jour d'un élément dans un fichier
// En 4 étapes :
//     - Lire le contenu du fichier
//     - Rechercher l'élément à mettre à jour
//     - Remplacer cet élément par la nouvelle valeur
//     - Ecrire le contenu du fichier mis à jour dans le fichier

function updateContentFile(filePath, oldItem, newItem){

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.log('Il y a une erreur lors de la lecture du fichier !')
            return
        }

        //Convertir le contenu du fichier en tableau
        const lines = data.split('\n')

        //Mettre à jour l'élément
        const updateContentLine = lines.map( line => {
            return line.trim() === oldItem ? newItem : line;
        })

        //Convertir la contenu mis à jour dans le fichier
        const updatedContentData = updateContentLine.join('\n')

        //Ecrire le contenu mis à jour dans le fichier
        fs.writeFile(filePath, updatedContentData, 'utf-8', (err) => {
            if (err) {
                console.log('Il y a une erreur lors de l\'écriture du fichier !')
                return
            }
            console.log(`L'élément "${oldItem}" a été mis à jour en "${newItem}" avec succès !`)
        })

        
    })
}

function updateQuestion(){
    rl.question('Entrer l\'élément que vous voulez modifier : ', (oldItem) => {
        if (oldItem.trim() === ''){
            console.log('Veuillez entrer de donnée !')
            return setTimeout(() =>
                {
                    updateQuestion()
                }, 1000
            );
        }
        else{
            rl.question('Entrer sa nouvelle valeur : ', (newItem) => {
                if (newItem.trim() === ''){
                    console.log('Veuillez entrer de donnée !')
                    return setTimeout(() =>
                        {
                            updateQuestion()
                        }, 1000
                    );
                }
                updateContentFile(fichier, oldItem, newItem)
                setTimeout(() => {
                    console.log('')
                    updateQuestion()
                }, 1000);
            })
        }
    })
    console.log('')
}

updateQuestion()