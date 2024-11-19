const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    getUsers : () => ipcRenderer.invoke('db:getUsers'),
    addUser : (name, password) => ipcRenderer.invoke('db:addUser', name, password) 
})