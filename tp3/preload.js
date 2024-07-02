const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
	convertCurrency: (amount, targetCurrency) => {
		ipcRenderer.send('convertCurrency', amount, targetCurrency);
	},
	on: (channel, callback) => {
		ipcRenderer.on(channel, (event, ...args) => callback(...args));
	},
});
