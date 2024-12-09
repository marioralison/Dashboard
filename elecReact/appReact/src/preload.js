const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    addUser : (name, password, role) => ipcRenderer.invoke('data:addUser', name, password, role),
    addClient: (name, workPlace, localClient, numberPhone) => ipcRenderer.invoke('data:addClient', name, workPlace, localClient, numberPhone),
    mdpHash : (password) => ipcRenderer.invoke('mdp:hash', password),
    mdpVerify : (name, inputPassword) => ipcRenderer.invoke('mdp:Verify', name, inputPassword),
    getNameUser : (name) => ipcRenderer.invoke('userNameData', name),
    selectImage : () => ipcRenderer.invoke('selection:Image')
})