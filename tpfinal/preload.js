const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  loadQuestions: async () => {
    return await ipcRenderer.invoke('load-questions');
  },
  addPoint: () => ipcRenderer.send('add-point')
});
