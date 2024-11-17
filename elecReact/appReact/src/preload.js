const { contextBridge, ipcRenderer } = require('electron')

//Communication bidirectionnelle à l'aide de ipcMain.handle et ipcRenderer.invoke
// contextBridge.exposeInMainWorld('electronAPI', {
//     openFile: () => ipcRenderer.invoke('dialog:openFile')
// })

contextBridge.exposeInMainWorld('electronAPI', {
    onUpdateCounter: (callback) => ipcRenderer.on('update-counter', (_event, value) => callback(value)),
    counterValue: (value) => ipcRenderer.send('counter-value', value)
})