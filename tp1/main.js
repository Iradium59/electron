const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;
let notes = [];
const dataPath = path.join(__dirname, 'notes.json');

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

    try {
        const data = fs.readFileSync(dataPath, 'utf-8');
        notes = JSON.parse(data);
    } catch (error) {
        console.log('Erreur lors de la lecture du fichier des notes :', error);
    }

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        mainWindow.webContents.send('updateNotes', notes);
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

ipcMain.on('saveNote', (event, note) => {
    notes.push(note);
    saveNotesToFile();
    mainWindow.webContents.send('updateNotes', notes);
});

ipcMain.on('deleteNote', (event, noteIndex) => {
    if (noteIndex >= 0 && noteIndex < notes.length) {
        notes.splice(noteIndex, 1);
        saveNotesToFile();
        mainWindow.webContents.send('updateNotes', notes);
    }
});

function saveNotesToFile() {
    try {
        fs.writeFileSync(dataPath, JSON.stringify(notes));
    } catch (error) {
        console.log('Erreur lors de l\'écriture du fichier des notes :', error);
    }
}