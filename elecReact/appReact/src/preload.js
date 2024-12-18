const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    addUser : (name, password, role) => ipcRenderer.invoke('data:addUser', name, password, role),
    getNameUser : (name) => ipcRenderer.invoke('userNameData', name),
    updateClient: (matricule, name, workPlace, numberPhone) => ipcRenderer.invoke('data:updateClient', matricule, name, workPlace, numberPhone),
    mdpHash : (password) => ipcRenderer.invoke('mdp:hash', password),
    mdpVerify : (name, inputPassword) => ipcRenderer.invoke('mdp:Verify', name, inputPassword),

    addClient : (matricule ,name, workPlace, numberPhone) => ipcRenderer.invoke('data:addClient', matricule, name, workPlace, numberPhone),
    getClient : () => ipcRenderer.invoke('row:client'),
    getClientByName: (name) => ipcRenderer.invoke('getClientByName', name),
    deleteClient : (matricule) => ipcRenderer.invoke('data:deleteClient', matricule),

    getProduct : () => ipcRenderer.invoke('getProduct')
})