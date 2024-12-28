const { contextBridge, ipcRenderer, ipcMain } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    addUser : (name, password, role) => ipcRenderer.invoke('data:addUser', name, password, role),
    getNameUser : (name) => ipcRenderer.invoke('userNameData', name),
    updateClient: (matricule, name, workPlace, numberPhone) => ipcRenderer.invoke('data:updateClient', matricule, name, workPlace, numberPhone),
    mdpHash : (password) => ipcRenderer.invoke('mdp:hash', password),
    mdpVerify : (name, inputPassword) => ipcRenderer.invoke('mdp:Verify', name, inputPassword),

    addClient : (matricule ,name, workPlace, numberPhone) => ipcRenderer.invoke('data:addClient', matricule, name, workPlace, numberPhone),
    getClient : () => ipcRenderer.invoke('row:client'),
    getClientByMatricule: (matricule) => ipcRenderer.invoke('getClientByMatricule', matricule),
    deleteClient : (matricule) => ipcRenderer.invoke('data:deleteClient', matricule),
    updateClientStat : (matriculeClient, additionalImpression, totalDepense) => ipcRenderer.invoke('updateClientStat', matriculeClient, additionalImpression, totalDepense),

    getImpressionData : (typeClientId) => ipcRenderer.invoke('getImpressionData', typeClientId),
    addCommandeImpression : (commande) => ipcRenderer.invoke('addCommandeImpression', commande),
    getCommandesImpression : () => ipcRenderer.invoke('getCommandImpression'),
    deleteCommande : (id_commande) => ipcRenderer.invoke('deleteCommande', id_commande)
})