// import './index.jsx';

const userList = document.getElementById('userList')
const userName = document.getElementById('userName')
const userPassword = document.getElementById('userPassword')
const btnAddUser = document.getElementById('btnAddUser')

//Charger les users depuis la base de donnée
async function loadUsers() {
    const users = await window.electronAPI.getUsers()
    userList.innerHTML = ''
    users.forEach(user => {
        const li = document.createElement('li')
        li.textContent = `Nom : ${user.name}, Mot de passe : ${user.password}`
        userList.appendChild(li)
    });
}

//Ajouter un user
btnAddUser.addEventListener('click', async () => {
    const name = userName.value
    const password = userPassword.value

    if (name && password){
        await window.electronAPI.addUser(name, password)
        loadUsers() //Recharger la liste après l'ajout
    }
})

loadUsers()