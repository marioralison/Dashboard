const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    addUser : (name, password, role) => ipcRenderer.invoke('data:addUser', name, password, role),
    mdpHash : (password) => ipcRenderer.invoke('mdp:hash', password),
    mdpVerify : (name, inputPassword) => ipcRenderer.invoke('mdp:Verify', name, inputPassword),
    getUtilisateur : (name) => ipcRenderer.invoke('userDataCollection', name),
    getA5 : () => ipcRenderer.invoke('A5Collection'),
    getA4 : () => ipcRenderer.invoke('A4Collection')
})