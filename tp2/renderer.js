window.addEventListener('DOMContentLoaded', () => {
    const { electron } = window;

    function searchWeather() {
        const city = document.getElementById('cityInput').value;
        electron.send('searchWeather', city);
    }

    electron.receive('weatherData', (data) => {
        const weatherInfoDiv = document.getElementById('weatherInfo');
        weatherInfoDiv.innerHTML = `
        <h2>${data.city}</h2><p>Température : ${data.temperature} °C</p><p>Humidité : ${data.humidity}%</p><p>Vitesse du vent : ${data.windSpeed} m/s</p>
      `;
    });
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', searchWeather);
});