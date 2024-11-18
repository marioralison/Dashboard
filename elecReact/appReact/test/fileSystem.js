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
            fs.write(fd, `${dataUser}\n`, (err) => {
                if (err) throw err
            })
            fs.close(fd, () => {})
        })
        console.log('Ajout réussi !\n')
        rl.question('Voulez-vous entrer plus de donnée ? (o/n) : ', (answer) => {

            //Test si l'user n'a pas entré de donnée

            if (answer.toLowerCase() === 'o'){
                console.log('')
                inputDataUser()
            }
            else if((answer.toLowerCase() === 'n') || (answer.toLowerCase() !== ('n' || 'o'))){
                console.log('Arrêt ajout !\n')
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
    const itemSearchLowerCase = itemSearch.toLowerCase()

    //Recherche du mot dans le fichier
    rlSearchFile.on('line', (item) => {
        lineWord++
        if (item.toLowerCase().includes(itemSearchLowerCase)){
            console.log(`Le mot "${itemSearch}" se trouve dans la ligne ${lineWord}`)
            foundWord = true
        }
    })

    //Si le mot n'est pas dans le fichier
    rlSearchFile.on('close', () => {
        if(!foundWord){
            console.log(`Ouupss, le mot ${itemSearch} ne se trouve pas dans le fichier !`)
            console.log('\n-------- Recherche terminé --------\n')
            inputDataUser()
        }
        else{
            console.log('\n-------- Recherche terminé --------\n')
        }
        inputDataUser()
    })
}

function inputItemSearch(){

    rl.question('Entrez le mot que vous voulez rechercher : ', (element) => {

        //test si l'user n'a pas entré de donnée
        if (element.trim() === ''){
            console.log('Veuillez entrer un élément à recherche !')
            return inputItemSearch()
        }
        console.log('')
        searchData(fileLocation, element)
    })
}

function questionUser(){
    rl.question('Voulez-vous rechercher un élément dans le fichier ? (o/n) : ', (reponse) => {
        if ((reponse.trim() === '') || !((reponse === 'n') || (reponse === 'o'))){
            console.log('Veuillez répondre à la question !')
            return questionUser()
        }
        else if ( reponse === 'o'){
            console.log('')
            inputItemSearch()
        }
        else if ( reponse === 'n'){
            console.log('\n-------- Enregistrement terminé --------\n')
            inputDataUser()
        }
    })
}

inputDataUser()