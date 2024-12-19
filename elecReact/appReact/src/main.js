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

const ajoutUser = require('./controller/user/userController.js')
const hashageMPD = require('./model/hashModel.js')
const verifyMDP = require('./controller/user/hashController.js')
const dataUser = require('./model/userModel.js')

const addClient = require('./controller/client/clientController.js');
const getClient = require('./controller/client/clientController.js');
const getClientByName = require('./controller/client/clientController.js')
const deleteClient = require('./controller/client/clientController.js')
const updateClient = require('./controller/client/clientController.js')

const getProducts = require('./controller/products/productController.js')


//--------------------------GESTION CLIENT-----------------------

ipcMain.handle('data:addClient', addClient.addClient)
ipcMain.handle('row:client', getClient.getClient)

ipcMain.handle('getClientByName', async(event, name) => {
  try {
    const result = await getClientByName.getClientByName(name)
    return result
  } catch (error) {
    console.log('Erreur lors de la collection du nom client',error.message)
  }
})

ipcMain.handle('data:deleteClient', async (event, matricule) => {
  try {
    const result = await deleteClient.deleteClient(matricule)
    return result

  } catch (error) {
    console.log('Il y a une erreur lors de la suppression du client')
    return {success: false, message: error.message}
  }
})

ipcMain.handle('data:updateClient', async (event, matricule, nameClient, lieuTravail, numberPhone) => {
  try {
    const result = await updateClient.updateClient(matricule, nameClient, lieuTravail, numberPhone)
    return result

  } catch (error) {
    console.log('Erreur lors de la mise à jour information client', error.message)
  }
})



//-------------------------GESTION UTILISATEUR------------------------

//Ajout utilisateur
ipcMain.handle('data:addUser', ajoutUser.handleAddUser)

//Gestion de mot de passe User
ipcMain.handle('mdp:hash', hashageMPD.createPassword)
ipcMain.handle('mdp:Verify', verifyMDP.verificationMdp)
ipcMain.handle('userNameData', dataUser.user)



//-------------------------GESTION PRODUITS-----------------------------
ipcMain.handle('getProduct', async () => {
  try {
    const result = await getProducts.getProduct()
    return result
  } catch (error) {
    console.log('Erreur au niveau de collection de produits' ,error.message)
  }
})