const readline = require('readline')
const fs = require('fs')
const { stdin } = require('process')

const fileLocation = './test/data/fileData.txt'
let data = []

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

function inputDataUser() {

    rl.question('Entrez vos donnée : ', (dataUser) => {
        data.push(dataUser)
        fs.open(fileLocation, 'a+', (err, fd) => {
            if (err) throw err
            fs.write(fd, `\n${dataUser}`, (err) => {
                if (err) throw err
                console.log('Ajout réussi !')
            })
            fs.close(fd, () => {})
        })
        rl.question('Voulez-vous entrer plus de donnée ? (o/n) : ', (answer) => {
            if (answer.toLowerCase() === 'o'){
                inputDataUser()
            }
            else if(answer.toLowerCase() === 'n'){
                inputItemSearch()
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

    rl.question('Entrez le mot que vous voulez rechercher : ', (itemInputSearch) => {
        searchData(fileLocation, itemInputSearch)
        rl.close()
    })
}

inputDataUser()