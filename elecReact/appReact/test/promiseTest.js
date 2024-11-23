//---------Les promises---------
// Une promesse représente une valeur qui peut être disponible maintenant, dans le futur voire jamais

// //Deux parties : 

//     - Déclaration : 'new Promise' qui comporte deux arguments "resolve" et "reject"
//     - Utilisation : 'then' et 'catch' pour l'utilisation de la promesse

//Système de fichier en utilisant la fonction asynchrone

const readline = require('readline')
const fs = require('fs')

const FILE_LOCATION = './test/data/fileData.txt'

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

//Fonction pour poser de question à l'utilisateur
function poserQuestion(answer) {
    return new Promise ((resolve) => {
        rl.question(answer, resolve)
    })
}

//Fonction pour ajouter des données dans le fichier
async function ajoutElement(data) {
    try {
        await fs.appendFileSync(FILE_LOCATION, `${data}\n`, (err) => {
            if (err) console.log('Erreur lors de l\'ajout !')
        })
    } catch (error) {
        console.log('Erreur lors de l\'ajout !')
    }
}

//Fonction recherche un élément dans un fichier
async function rechercheContenu(file, searchItem) {

    const fileStream = fs.createReadStream(file, 'utf-8')
    const rlSearchLine = readline.createInterface({
        input : fileStream,
        crlfDelay : Infinity
    })

    //initialisation
    let found = false
    let lineNumber = 0;

    //Recherche de l'élément dans le fichier
    for await (const line of rlSearchLine) {
        lineNumber++;
        if (line.toLowerCase().includes(searchItem.toLowerCase())) {
            console.log(`Mot trouvé à la ligne ${searchItem}: ${lineNumber}`);
            found = true;
        }
    }

    if (!found){
        console.log(`Ouppss, le mot ${searchItem} ne se trouve pas dans le fichier !`)
    }
} 

async function demandeUtilisateur() {

    const choiceUser = await poserQuestion('\nQue voulez vous faire ?\n1-Ajouter un élément\n2-Rechercher un élément\n3-Quitter le programme\n---- Tapez votre choix : ')
    switch(choiceUser.trim()){

        case '1' : //Ajout d'élément dans le fichier
            while(true) {
                const addContent = await poserQuestion('\nEntrer vos données : ')
                if (addContent.trim()){
                    ajoutElement(addContent)
                    console.log('Ajout réussi !\n')
                }
                else{
                    console.log('Veuillez entrer un donnée valide !\n')
                }

                const addMoreContent = await poserQuestion('Voulez-vous ajouter plus de donnée ! (O/N) : ')
                if(addMoreContent.trim().toLowerCase() === 'o'){
                    continue
                }
                else{
                    demandeUtilisateur()
                }
            }

        case '2' : //Recherche un élément dans un fichier
            while (true) {
                const askSearchItem = await poserQuestion('\nEntrer l\'élément que vous voulez recherché : ');
                console.log('');
            
                if (askSearchItem.trim()) {
                    await rechercheContenu(FILE_LOCATION, askSearchItem);
                } else {
                    console.log('Veuillez entrer un élément valide.');
                    continue;
                }
            
                const askMoreSearchItem = await poserQuestion('\nVoulez-vous rechercher un autre élément dans le fichier ? (O/N) : ');
            
                if (askMoreSearchItem.trim().toLowerCase() === 'o') {
                    console.log('');
                    continue;
                } else {
                    return demandeUtilisateur();
                }
            }

        case '3' : 
            console.log("\n-------  Merci d\'avoir utilisé le programme, à bientôt ! -------\n")
            setTimeout(() => {
                rl.close()
            }, 2000)
            return

        default : {
            console.log('\nChoix invalide, Veuillez selectionner un choix valide !')
            console.log('-------------------------------------------------------')
            return demandeUtilisateur()
        }
    }
}

demandeUtilisateur()