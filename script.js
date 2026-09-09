// OpenWeatherMap API Configuration
const API_KEY = localStorage.getItem('openWeatherApiKey') || 'demo';
const BASE_URL = 'https://api.openweathermap.org';

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const quickCityBtns = document.querySelectorAll('.quick-city-btn');
const errorMessage = document.getElementById('errorMessage');
const weatherContainer = document.getElementById('weatherContainer');
const currentWeatherSection = document.getElementById('currentWeather');
const forecastSection = document.getElementById('forecastSection');
const loadingSpinner = document.getElementById('loadingSpinner');
const toast = document.getElementById('toast');
const savedCitiesList = document.getElementById('savedCitiesList');
const saveCityBtn = document.getElementById('saveCityBtn');

// State
let currentCity = null;
let savedCities = [];

// Load saved cities from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
    loadSavedCities();
    displaySavedCities();
    // Load last searched city if available
    const lastCity = localStorage.getItem('lastSearchedCity');
    if (lastCity) {
        fetchWeather(lastCity);
    }
});

// Event Listeners
searchBtn.addEventListener('click', () => {
    const city = searchInput.value.trim();
    if (city) {
        fetchWeather(city);
        searchInput.value = '';
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = searchInput.value.trim();
        if (city) {
            fetchWeather(city);
            searchInput.value = '';
        }
    }
});

quickCityBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const city = btn.dataset.city;
        fetchWeather(city);
    });
});

saveCityBtn.addEventListener('click', () => {
    if (currentCity) {
        saveCity(currentCity);
        updateSaveButton();
    }
});

/**
 * Fetch weather data from OpenWeatherMap API
 */
async function fetchWeather(city) {
    // Show loading spinner
    showLoading(true);
    clearError();

    try {
        // Keep the published demo usable without exposing an API key.
        if (API_KEY === 'demo') {
            const demoWeather = createDemoWeather(city);
            currentCity = demoWeather;
            displayCurrentWeather(demoWeather);
            displayForecast(createDemoForecast(demoWeather));
            localStorage.setItem('lastSearchedCity', city);
            showToast('Showing demo weather data. Add an API key for live results.');
            return;
        }

        // Fetch current weather
        const weatherUrl = `${BASE_URL}/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const weatherResponse = await fetch(weatherUrl);

        if (!weatherResponse.ok) {
            if (weatherResponse.status === 404) {
                throw new Error('City not found. Please try another city.');
            } else if (weatherResponse.status === 401) {
                throw new Error('Invalid API key. Please check your API key.');
            } else {
                throw new Error(`Error: ${weatherResponse.status}`);
            }
        }

        const weatherData = await weatherResponse.json();
        currentCity = weatherData;

        // Fetch 5-day forecast
        const forecastUrl = `${BASE_URL}/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();

        // Display weather data
        displayCurrentWeather(weatherData);
        displayForecast(forecastData);

        // Save last searched city
        localStorage.setItem('lastSearchedCity', city);

        // Show success message
        showToast(`Weather data for ${weatherData.name} loaded! 🌦️`);

    } catch (error) {
        console.error('Error fetching weather:', error);
        showError(error.message);
    } finally {
        showLoading(false);
    }
}

/**
 * Display current weather information
 */
function displayCurrentWeather(data) {
    const {
        name,
        sys: { country, sunrise, sunset },
        main: { temp, feels_like, humidity, pressure },
        weather: [{ main, description, icon }],
        wind: { speed, deg },
        clouds: { all: cloudCover },
        visibility
    } = data;

    // Update location info
    document.getElementById('cityName').textContent = name;
    document.getElementById('country').textContent = `${country} 🌍`;
    document.getElementById('lastUpdated').textContent = `Last updated: ${new Date().toLocaleTimeString()}`;

    // Update temperature and weather
    document.getElementById('temperature').textContent = `${Math.round(temp)}°C`;
    document.getElementById('weatherDesc').textContent = description;
    document.getElementById('feelsLike').textContent = `Feels like ${Math.round(feels_like)}°C`;
    document.getElementById('weatherIcon').textContent = getWeatherEmoji(icon);
    updateSaveButton();

    // Update details
    document.getElementById('humidity').textContent = `${humidity}%`;
    document.getElementById('windSpeed').textContent = `${Math.round(speed * 3.6)} km/h`; // Convert m/s to km/h
    document.getElementById('windDirection').textContent = getWindDirection(deg);
    document.getElementById('pressure').textContent = `${pressure} mb`;
    document.getElementById('visibility').textContent = `${(visibility / 1000).toFixed(1)} km`;
    document.getElementById('clouds').textContent = `${cloudCover}%`;
    document.getElementById('sunrise').textContent = formatTime(sunrise * 1000);
    document.getElementById('sunset').textContent = formatTime(sunset * 1000);

    // Show current weather section
    currentWeatherSection.classList.remove('hidden');
}

/**
 * Display 5-day forecast
 */
function displayForecast(data) {
    const forecastContainer = document.getElementById('forecastContainer');
    forecastContainer.innerHTML = '';

    // Group forecast by day (one forecast per day at noon)
    const dailyForecasts = {};

    data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dayKey = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        const hour = date.getHours();

        // Get forecast closest to noon for each day
        if (hour >= 10 && hour <= 14 && !dailyForecasts[dayKey]) {
            dailyForecasts[dayKey] = item;
        }
    });

    // Display up to 5 days
    Object.values(dailyForecasts).slice(0, 5).forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const temp = Math.round(forecast.main.temp);
        const tempMin = Math.round(forecast.main.temp_min);
        const tempMax = Math.round(forecast.main.temp_max);
        const description = forecast.weather[0].description;
        const icon = forecast.weather[0].icon;
        const humidity = forecast.main.humidity;
        const windSpeed = Math.round(forecast.wind.speed * 3.6);

        const forecastCard = document.createElement('div');
        forecastCard.className = 'forecast-card';
        forecastCard.innerHTML = `
            <div class="forecast-date">${date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
            <div class="forecast-icon">${getWeatherEmoji(icon)}</div>
            <div class="forecast-temp">${temp}°C</div>
            <div class="forecast-desc">${description}</div>
            <div class="forecast-info">📈${tempMax}° 📉${tempMin}°</div>
            <div class="forecast-info">💧${humidity}% 💨${windSpeed}km/h</div>
        `;
        forecastContainer.appendChild(forecastCard);
    });

    // Show forecast section
    forecastSection.classList.remove('hidden');
}

/**
 * Get emoji based on weather icon code
 */
function getWeatherEmoji(icon) {
    const iconMap = {
        '01d': '☀️', '01n': '🌙',
        '02d': '⛅', '02n': '🌤️',
        '03d': '☁️', '03n': '☁️',
        '04d': '☁️', '04n': '☁️',
        '09d': '🌧️', '09n': '🌧️',
        '10d': '🌦️', '10n': '🌧️',
        '11d': '⛈️', '11n': '⛈️',
        '13d': '❄️', '13n': '❄️',
        '50d': '🌫️', '50n': '🌫️'
    };
    return iconMap[icon] || '🌤️';
}

/**
 * Convert wind degree to direction
 */
function getWindDirection(deg) {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(deg / 22.5) % 16;
    return `${directions[index]} ${deg}°`;
}

/**
 * Format unix timestamp to time
 */
function formatTime(timestamp) {
    return new Date(timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

/**
 * Show loading spinner
 */
function showLoading(show) {
    if (show) {
        loadingSpinner.classList.remove('hidden');
    } else {
        loadingSpinner.classList.add('hidden');
    }
}

/**
 * Show error message
 */
function showError(message) {
    errorMessage.textContent = `❌ ${message}`;
    errorMessage.classList.add('show');
    currentWeatherSection.classList.add('hidden');
    forecastSection.classList.add('hidden');
}

/**
 * Clear error message
 */
function clearError() {
    errorMessage.classList.remove('show');
}

/**
 * Show toast notification
 */
function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

/**
 * Save city to favorites
 */
function saveCity(city) {
    if (!savedCities.find(c => c.name.toLowerCase() === city.name.toLowerCase())) {
        savedCities.push({
            name: city.name,
            country: city.sys.country,
            temp: Math.round(city.main.temp),
            description: city.weather[0].description
        });
        localStorage.setItem('savedCities', JSON.stringify(savedCities));
        displaySavedCities();
        showToast(`${city.name} added to saved cities! ❤️`);
    } else {
        showToast(`${city.name} is already saved!`);
    }
}

function updateSaveButton() {
    if (!currentCity) return;
    const isSaved = savedCities.some(city => city.name.toLowerCase() === currentCity.name.toLowerCase());
    saveCityBtn.textContent = isSaved ? '♥ Saved city' : '♡ Save city';
    saveCityBtn.classList.toggle('saved', isSaved);
    saveCityBtn.setAttribute('aria-pressed', String(isSaved));
}

/**
 * Remove city from favorites
 */
function removeCity(cityName) {
    savedCities = savedCities.filter(c => c.name.toLowerCase() !== cityName.toLowerCase());
    localStorage.setItem('savedCities', JSON.stringify(savedCities));
    displaySavedCities();
    showToast(`${cityName} removed from saved cities 🗑️`);
}

/**
 * Load saved cities from localStorage
 */
function loadSavedCities() {
    const stored = localStorage.getItem('savedCities');
    if (stored) {
        try {
            savedCities = JSON.parse(stored);
        } catch (error) {
            console.error('Could not read saved cities:', error);
            savedCities = [];
        }
    }
}

/**
 * Display saved cities
 */
function displaySavedCities() {
    if (savedCities.length === 0) {
        savedCitiesList.innerHTML = '<p class="empty-message">No saved cities yet. Search for a city and click the heart ❤️ to save it!</p>';
        return;
    }

    savedCitiesList.innerHTML = savedCities.map((city, index) => `
        <div class="saved-city-card">
            <div class="saved-city-name">📍 ${city.name}</div>
            <div class="saved-city-temp">${city.temp}°C</div>
            <div class="saved-city-desc">${city.description}</div>
            <div class="saved-city-actions">
                <button class="city-btn view" data-city-index="${index}">View</button>
                <button class="city-btn delete" data-city-index="${index}">Delete</button>
            </div>
        </div>
    `).join('');

    savedCitiesList.querySelectorAll('.view').forEach(button => {
        button.addEventListener('click', () => fetchWeather(savedCities[button.dataset.cityIndex].name));
    });
    savedCitiesList.querySelectorAll('.delete').forEach(button => {
        button.addEventListener('click', () => removeCity(savedCities[button.dataset.cityIndex].name));
    });
}

function createDemoWeather(city) {
    const name = city.split(',')[0].trim() || 'Demo City';
    return {
        name,
        sys: { country: 'DEMO', sunrise: 1710000000, sunset: 1710043200 },
        main: { temp: 21, feels_like: 20, humidity: 58, pressure: 1014 },
        weather: [{ main: 'Clear', description: 'clear skies', icon: '01d' }],
        wind: { speed: 3.5, deg: 180 },
        clouds: { all: 12 },
        visibility: 10000
    };
}

function createDemoForecast(weather) {
    const start = Math.floor(Date.now() / 1000);
    return {
        list: Array.from({ length: 5 }, (_, index) => ({
            dt: start + (index + 1) * 86400,
            main: {
                temp: 20 + index,
                temp_min: 16 + index,
                temp_max: 24 + index,
                humidity: 55 + index
            },
            weather: [{ description: index % 2 ? 'partly cloudy' : 'clear skies', icon: index % 2 ? '02d' : '01d' }],
            wind: { speed: 3 + index / 2 }
        }))
    };
}

console.log('🌦️ Weather Dashboard loaded successfully!');
console.log('⚠️  IMPORTANT: Get your free API key from https://openweathermap.org/api');
console.log('📝 Update the API_KEY variable in script.js with your key');
