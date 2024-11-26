const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    addUser : (name, password) => ipcRenderer.invoke('data:addUser', name, password),
    mdpHash : (password) => ipcRenderer.invoke('mdp:hash', password)
})