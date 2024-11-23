const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron');
const { rejects } = require('node:assert');
const path = require('node:path');
const sqlite3 = require('sqlite3')

//Chemin de la base de donnée
const dbPath = path.join('data.db')
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.log('Il y a une erreur lors de la connexion à la base de donnée : ', err.message)
  }
  else {
    console.log('Connexion Base donnee done !')
  }
})

//Création de la table
db.run(`CREATE TABLE IF NOT EXISTS Users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  password INTEGER
)`);



// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

//-------Communication unidirectionnelle---------
// function handleSetTitle (event, title) {
//   const webContents = event.sender
//   const win = BrowserWindow.fromWebContents(webContents)
//   win.setTitle(title)
// }

//-------Communication bidirectionnelle----------
// async function handleFileOpen () {
//   const { canceled, filePaths } = await dialog.showOpenDialog({})
//   if (!canceled) {
//     return filePaths[0]
//   }
// }



const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      contextIsolation: true
    },
  });

  // const menu = Menu.buildFromTemplate([
  //   {
  //     label: app.name,
  //     submenu: [
  //       {
  //         click: () => mainWindow.webContents.send('update-counter', 1),
  //         label: 'Increment'
  //       },
  //       {
  //         click: () => mainWindow.webContents.send('update-counter', -1),
  //         label: 'Decrement'
  //       }
  //     ]
  //   }

  // ]);

  // Menu.setApplicationMenu(menu)

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  //Cacher la barre de navigation de la fenêtre d'electron
  mainWindow.setMenuBarVisibility(false);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {

  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

//---------------------------------------  BASE DE DONNEE -------------------------------------------

//Récupérer les données de la base
ipcMain.handle('db:getUsers', (event) => {
  return new Promise((resolve, reject) => {
      db.all('SELECT * FROM users', [], (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
      });
  });
});

//Ajouter un utilisateur dans la base de donnée
ipcMain.handle('db:addUser', (event, name, password) => {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO Users (name, password) VALUES (?, ?)', [name, password], function (err){
      if (err) {
        reject (err)
      }
      else {
        resolve(this.lastID) //L'ID de l'user ajouté
      }
    })
  })
})

ipcMain.handle('user:signIn', (event, name, password) => {
  return new Promise ((resolve, reject) => {
    db.all('SELECT Users WHERE name = ? AND password = ?', [name, password], function (err){
      if(err){
        console.log(err)
        reject()
      }
      else{
        // console.log()
        resolve(true)
      }
    })
  })
})