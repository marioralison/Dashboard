const readline = require('readline')
const fs = require('fs')
const { stdin, resourceUsage } = require('process')

const fileLocation = './test/data/fileData.txt'

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

function inputDataUser() {

    rl.question('Entrez vos donnée : ', (dataUser) => {

        //Test si l'utilisateur n'a pas entré de donnée
        if (dataUser.trim() === ''){
            console.log('Veuillez entrer des données !')
            return inputDataUser()
        }

        fs.open(fileLocation, 'a+', (err, fd) => {
            if (err) throw err
            fs.write(fd, `\n${dataUser}`, (err) => {
                if (err) throw err
            })
            fs.close(fd, () => {})
        })
        console.log('Ajout réussi !')
        console.log('')
        rl.question('Voulez-vous entrer plus de donnée ? (o/n) : ', (answer) => {

            //Test si l'user n'a pas entré de donnée

            if (answer.toLowerCase() === 'o'){
                inputDataUser()
            }
            else if((answer.toLowerCase() === 'n') || (answer.toLowerCase() !== ('n' || 'o'))){
                console.log('Arrêt ajout !')
                console.log('')
                questionUser()
            }
        })
    })
}

//Recherche de mot ligne par ligne pour une gestion efficace de mémoire
function searchData(file, itemSearch){

    //Création de la flux de lecture du fichier
    const fileStream = fs.createReadStream(file, 'utf-8')

    //Création de l'interface de lecture ligne par ligne
    const rlSearchFile = readline.createInterface({
        input : fileStream,
        crlfDelay : Infinity
    })

    //Initialisation du mot trouvé
    let foundWord = false
    let lineWord = 0

    //Recherche du mot dans le fichier
    rlSearchFile.on('line', (item) => {
        lineWord++
        if (item.includes(itemSearch)){
            console.log(`Le mot ${itemSearch} se trouve dans la ligne ${lineWord}`)
            foundWord = true
            rlSearchFile.close() //Stopper le flux de lecture lorsque le mot est trouvé
        }
    })

    //Si le mot n'est pas dans le fichier
    rlSearchFile.on('close', () => {
        if(!foundWord){
            console.log(`Ouupss, le mot ${itemSearch} ne se trouve pas dans le fichier !`)
        }
    })
}

function inputItemSearch(){

    rl.question('Entrez le mot que vous voulez rechercher : ', (element) => {

        //test si l'user n'a pas entré de donnée
        if (element.trim() === ''){
            console.log('Veuillez entrer un élément à recherche !')
            return inputItemSearch()
        }

        searchData(fileLocation, element)
        rl.close()
    })
}

function questionUser(){
    rl.question('Voulez-vous rechercher un élément dans le fichier ? (o/n) : ', (reponse) => {
        if ((reponse.trim() === '') || !((reponse === 'n') || (reponse === 'o'))){
            console.log('Veuillez répondre à la question !')
            return questionUser()
        }
        else if ( reponse === 'o'){
            inputItemSearch()
        }
        else if ( reponse === 'n'){
            console.log('')
            console.log('-------- Enregistrement terminé --------')
            console.log('')
            inputDataUser()
        }
    })
}

inputDataUser()