const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('fs')

// ---------------- GESTION AU NIVEAU DU POINT D'ENTREE ELECTRON --------------------

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.Dilao
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      contextIsolation: true,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  //Cacher la barre de navigation de la fenêtre d'electron
  mainWindow.setMenuBarVisibility(false);
};

app.whenReady().then(() => {

  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


//---------------------------------------  GESTION DES REQUETTES -------------------------------------------*

const ajoutUser = require('./controller/userController.js')
const hashageMPD = require('./model/hashModel.js')
const verifyMDP = require('./controller/hashController.js')
const dataUser = require('./model/userModel.js')
const addClient = require('./controller/clientController.js');
const getClient = require('./controller/clientController.js');
const deleteClient = require('./controller/clientController.js')
const updateClient = require('./controller/clientController.js')
const path = require('path');

//Ajout client
ipcMain.handle('data:addClient', addClient.addClient)

//Récupérer les lignes de données du table client
ipcMain.handle('row:client', getClient.getClient)

//Suppression d'un client avec le matricule correspondant
ipcMain.handle('data:deleteClient', async (event, matricule) => {
  try {

    const result = await deleteClient.deleteClient(matricule)
    return result

  } catch (error) {
    console.log('Il y a une erreur lors de la suppression du client')
    return {success: false, message: error.message}
  }
})

//Mise à jour des informations du client
ipcMain.handle('data:updateClient', async (event, matricule, nameClient, lieuTravail, numberPhone) => {
  try {
    const result = await updateClient.updateClient(matricule, nameClient, lieuTravail, numberPhone)
    return result

  } catch (error) {
    console.log('Erreur lors de la mise à jour information client', error.message)
  }
})

//Ajout utilisateur
ipcMain.handle('data:addUser', ajoutUser.handleAddUser)


//Gestion de mot de passe User
ipcMain.handle('mdp:hash', hashageMPD.createPassword)
ipcMain.handle('mdp:Verify', verifyMDP.verificationMdp)
ipcMain.handle('userNameData', dataUser.user)