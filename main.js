const { app, BrowserWindow, ipcMain } = require('electron');
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: __dirname + '/preload.js',
      contextIsolation: true,
      enableRemoteModule: false
    }
  });

  mainWindow.loadFile('index.html');
}

app.on('ready', createWindow);

ipcMain.on('searchWeather', async (event, city) => {
  try {
    const apiKey = '26f3894df5b25b6e577e6463a38a1ce4';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const weatherData = await response.json();

    const formattedData = {
      city: weatherData.name,
      temperature: weatherData.main.temp,
      humidity: weatherData.main.humidity,
      windSpeed: weatherData.wind.speed
    };

    event.reply('weatherData', formattedData);
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
  }
});
