const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    addUser : (name, password, role) => ipcRenderer.invoke('data:addUser', name, password, role),
    addClient : (matricule ,name, workPlace, numberPhone) => ipcRenderer.invoke('data:addClient', matricule, name, workPlace, numberPhone),
    getClient: () => ipcRenderer.invoke('row:client'),
    deleteClient: (matricule) => ipcRenderer.invoke('data:deleteClient', matricule),
    updateClient: (matricule, name, workPlace, numberPhone) => ipcRenderer.invoke('data:updateClient', matricule, name, workPlace, numberPhone),
    mdpHash : (password) => ipcRenderer.invoke('mdp:hash', password),
    mdpVerify : (name, inputPassword) => ipcRenderer.invoke('mdp:Verify', name, inputPassword),
    getNameUser : (name) => ipcRenderer.invoke('userNameData', name),
    selectImage : () => ipcRenderer.invoke('selection:Image')
})