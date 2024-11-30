const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    addUser : (name, password) => ipcRenderer.invoke('data:addUser', name, password),
    mdpHash : (password) => ipcRenderer.invoke('mdp:hash', password),
    mdpVerify : (hash, password) => ipcRenderer.invoke('mdp:Verify', hash, password),
    getUtilisateur : (name) => ipcRenderer.invoke('userDataCollection', name),
    getA5 : () => ipcRenderer.invoke('A5Collection'),
    getA4 : () => ipcRenderer.invoke('A4Collection')
})