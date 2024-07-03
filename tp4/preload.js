const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    changeTitle: (title) => {
        ipcRenderer.send('changeTitle', title);
    },
});