const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			nodeIntegration: false,
			contextIsolation: true,
		},
	});

	mainWindow.loadFile('index.html');

	mainWindow.on('closed', () => {
		mainWindow = null;
	});
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow();
	}
});

ipcMain.on('convertCurrency', (event, amount, targetCurrency) => {
	const exchangeRates = {
		USD: 1.18,
		GBP: 0.86,
		JPY: 131.27,
	};

	if (exchangeRates[targetCurrency]) {
		const convertedAmount = amount * exchangeRates[targetCurrency];
		event.reply('conversionResult', convertedAmount.toFixed(2));
	} else {
		event.reply('conversionResult', 'Erreur: Devise non supportée');
	}
});
