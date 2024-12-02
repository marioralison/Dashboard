const { app, BrowserWindow, ipcMain } = require('electron');

// ---------------- GESTION AU NIVEAU DU POINT D'ENTREE ELECTRON --------------------

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
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
const { getA5, getA4} = require('./model/productModel.js')

//Ajout utilisateur
ipcMain.handle('data:addUser', ajoutUser.handleAddUser)

//Gestion de mot de passe User
ipcMain.handle('mdp:hash', hashageMPD.createPassword)
ipcMain.handle('mdp:Verify', verifyMDP.verificationMdp)
ipcMain.handle('userNameData', dataUser.user)
ipcMain.handle('A5Collection', getA5)
ipcMain.handle('A4Collection', getA4)