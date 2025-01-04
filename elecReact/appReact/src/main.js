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
const getClientByMatricule = require('./controller/client/clientController.js')
const deleteClient = require('./controller/client/clientController.js')
const updateClient = require('./controller/client/clientController.js')
const updateClientStat = require('./controller/client/clientController.js')
const getTotalClientMembre = require('./controller/client/clientController.js')

const addCommandImpression = require('./controller/commandes/commandeController.js')
const getCommands = require('./controller/commandes/commandeController.js')
const deleteCommande = require('./controller/commandes/commandeController.js')
const getTotalCommandeImpression = require('./controller/commandes/commandeController.js')

const getProduct = require('./controller/products/productController.js')
const getImpressionData = require('./controller/products/productController.js')
const getProductById = require('./controller/products/productController.js')

const addVente = require('./controller/vente/venteController.js')
const getVentes = require('./controller/vente/venteController.js')
const deleteVenteRow = require('./controller/vente/venteController.js');
const { constSelector } = require('recoil');


//--------------------------GESTION CLIENT-----------------------

ipcMain.handle('data:addClient', addClient.addClient)
ipcMain.handle('row:client', getClient.getClient)

ipcMain.handle('getClientByMatricule', async(event, matricule) => {
  try {
    const result = await getClientByMatricule.getClientByMatricule(matricule)
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

ipcMain.handle('updateClientStat', async (event, matriculeClient, additionalImpression, totalDepense) => {
  try {
    const result = await updateClientStat.updateClientStat(matriculeClient, additionalImpression, totalDepense)
    return result
  } catch (error) {
    console.log('Erreur au niveau de la fonction mise à jour des stats client', error.message)
  }
})

ipcMain.handle('getTotalClientMembre', async () => {
  try {
    const result = await getTotalClientMembre.getTotalClientMembre()
    return result
  } catch (error) {
    console.log('Erreur au niveau de la fonction de récupération de nombre membre', error.message)
  }
})


//-------------------------GESTION UTILISATEUR------------------------

//Ajout utilisateur
ipcMain.handle('data:addUser', ajoutUser.handleAddUser)

//Gestion de mot de passe User
ipcMain.handle('mdp:hash', hashageMPD.createPassword)
ipcMain.handle('mdp:Verify', verifyMDP.verificationMdp)
ipcMain.handle('userNameData', dataUser.user)



//-------------------------GESTION COMMANDES-----------------------------

ipcMain.handle('getProduct', async () => {
  try {
    const results = await getProduct.getProduct()
    return results
  } catch (error) {
    console.log('Erreur lors de la récupération des produits', error.message)
  }
})

ipcMain.handle('getImpressionData', async (event, typeClientId) => {
  try {
    const result = await getImpressionData.getImpressionData(typeClientId)
    return result
  } catch (error) {
    console.log('Erreur au niveau de collection de produit type membre' ,error.message)
  }
})

ipcMain.handle('addCommandeImpression', async (event, commande) => {
  try {

    const result = await addCommandImpression.addCommand(commande)
    return result

  } catch (error) {
    console.log("Erreur au niveau de la fonction d'enregistrement de commande", error.message)
  }
})

ipcMain.handle('getCommandImpression', async () => {
  try {
    const result = await getCommands.getCommands()
    return result
  } catch (error) {
    console.log('Erreur de la fonction de récupération de produits impression', error.message)
  }
})

ipcMain.handle('deleteCommande', async (event ,id_commande) => {
  try {
    const result = await deleteCommande.deleteCommande(id_commande)
    return result
  } catch (error) {
    console.log('Erreur au niveau de la fonction suppression de commande', error.message)
  }
})

ipcMain.handle('getProductById', async (event, productId) => {
  try {
    const result = await getProductById.getProductById(productId)
    return result
  } catch (error) {
    console.log('Erreur au niveau de la fonction de récupération de produit', error.message)
  }
})

ipcMain.handle('getTotalCommandeImpression', async () => {
  try {
    const results = await getTotalCommandeImpression.getTotalCommandeImpression()
    return results
  } catch (error) {
    console.log('Erreur au niveau de la fonction de récupération des données commande', error.message)
  }
})


//------------------------ GESTION VENTES -------------------------
ipcMain.handle('addVente', async (event, commande) => {
  try {
    const result = await addVente.addVente(commande)
    return result
  } catch (error) {
    console.log('Erreur au niveau de la fonction ajout vente', error.message)
  }
})

ipcMain.handle('getVentes', async () => {
  try {
    const result = await getVentes.getVentes()
    return result
  } catch (error) {
    console.log('Erreur au niveau de la fonction de récupération des ventes', error.message)
  }
})

ipcMain.handle('deleteVenteRow', async (event, id) => {
  try {
    const result = await deleteVenteRow.deleteVenteRow(id)
    return result
  } catch (error) {
    console.log('Erreur au niveau de la fonction de supression vente', error.message)
  }
})