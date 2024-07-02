const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    saveNote: (note) => ipcRenderer.send('saveNote', note),
    deleteNote: (noteIndex) => ipcRenderer.send('deleteNote', noteIndex),
    on: (channel, callback) => {
        ipcRenderer.on(channel, (event, ...args) => callback(...args));
    }
});