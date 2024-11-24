//Module en javascript
//--- C'est un bloc de code qui contient ses propres fonctionnalités fonctionnant ensemble et qui est
//séparé du reste du code

//Ex : commonJS, AMD, UMD, ES15, ES20

// Utilisation de "import" et "export"
//Il existe 2 types d'export : export nommé, export par défaut

function salutation() {
    console.log('De aona leka zanjyyy...')
}

module.exports = {salutation}