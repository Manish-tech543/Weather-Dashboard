# 🌤️ Weather Dashboard

A beautiful and interactive weather dashboard that fetches real-time weather data from the **OpenWeatherMap API**. Get current weather, 5-day forecasts, and save your favorite cities!

## ✨ Features

✅ **Real-time Weather Data** - Get current weather conditions for any city
✅ **5-Day Forecast** - View weather predictions for the next 5 days
✅ **Detailed Information** - Humidity, wind speed, pressure, visibility, sunrise/sunset
✅ **Save Favorite Cities** - Keep track of your frequently checked cities
✅ **Search by City Name** - Find weather for any city in the world
✅ **Quick City Buttons** - Pre-set buttons for popular cities
✅ **Responsive Design** - Works perfectly on mobile, tablet, and desktop
✅ **Local Storage** - Your saved cities persist even after closing the browser
✅ **Weather Emojis** - Visual weather indicators with emoji icons
✅ **Real-time Updates** - See the exact time weather data was fetched

## 🚀 How to Use / Run

### **Option 1: GitHub Pages**
The repository includes a Pages workflow that deploys the site from `main`. After the workflow completes, open:

`https://manish-tech543.github.io/Weather-Dashboard/`

If the URL returns 404, enable **Settings → Pages → Source: GitHub Actions** once in the repository settings, then rerun the workflow.

### **Option 2: Run Locally**
```bash
# Clone the repository
git clone https://github.com/Manish-tech543/Weather-Dashboard.git

# Navigate to the folder
cd Weather-Dashboard

# Open index.html in your browser
open index.html  # On Mac
start index.html  # On Windows
```

---

## 🔑 IMPORTANT: Get Your API Key

**The weather dashboard requires a FREE API key from OpenWeatherMap.**

### **Step 1: Get Your Free API Key**
1. Visit: https://openweathermap.org/api
2. Click on "Sign Up" and create a free account
3. Go to your "API Keys" section
4. Copy your API key (looks like: `f4c8d537e188282cecf2949335844382`)

### **Step 2: Add API Key to Your Code**
1. Open `script.js` in a text editor
2. Find line 3: `const API_KEY = 'demo';`
3. Replace `'demo'` with your actual API key:
   ```javascript
   const API_KEY = 'f4c8d537e188282cecf2949335844382'; // Your key here
   ```
4. Save the file
5. Refresh your browser and you're ready to go!

### **Alternative: Use the Demo Mode**
Without an API key, the published app automatically shows clearly labeled demo weather so the interface remains usable. Add a key for live results by setting `localStorage.openWeatherApiKey` in the browser console, or by replacing the `API_KEY` fallback in `script.js`.

---

## 📖 How to Use the Application

### **1. Search for Weather**
- Type a city name in the search box (e.g., "London", "New York", "Tokyo")
- Press Enter or click the "🔍 Search" button
- Current weather and 5-day forecast will load

### **2. Use Quick City Buttons**
- Click any of the pre-set city buttons:
  - 🇬🇧 London
  - 🇺🇸 New York
  - 🇯🇵 Tokyo
  - 🇫🇷 Paris
  - 🇦🇺 Sydney
  - 🇦🇪 Dubai

### **3. Current Weather Display**
You'll see:
- **Temperature** - Current temperature in Celsius
- **Weather Icon** - Visual emoji representation (☀️ ⛅ 🌧️ ❄️ etc.)
- **Description** - "Sunny", "Cloudy", "Rainy", etc.
- **Feels Like** - Temperature accounting for wind chill
- **Humidity** - 💧 Moisture in the air (%)
- **Wind Speed** - 💨 Speed in km/h
- **Wind Direction** - 🧭 Direction (N, NE, E, etc.)
- **Pressure** - 🔽 Atmospheric pressure (mb)
- **Visibility** - 👁️ How far you can see (km)
- **Cloud Cover** - ☁️ Percentage of sky covered
- **Sunrise/Sunset** - 🌅🌇 Times

### **4. 5-Day Forecast**
View upcoming weather for the next 5 days with:
- Date
- Weather emoji
- High and low temperatures
- Weather description
- Humidity and wind speed

### **5. Save Favorite Cities**
- Searched cities appear in "My Saved Cities" section
- Click **"♡ Save city"** on the current weather card to add a favorite
- Click **"View"** to see that city's weather again
- Click **"Delete"** to remove from saved list
- Saved cities persist even after closing the browser

---

## 🌍 What You Can Search

You can search for any city in the world:
- **Cities**: London, New York, Tokyo, Paris, Sydney, Dubai, Mumbai, Beijing, etc.
- **Countries**: USA, UK, Japan, France, Australia, India, China, etc.
- **Regions**: California, Texas, Scotland, Bavaria, etc.
- **Latitude/Longitude**: (Optional - can be extended)

### **Example Searches**
```
London
New York City
Tokyo, Japan
Sydney
Paris
Dubai
Mumbai
Beijing
Los Angeles
San Francisco
Seoul
Bangkok
Toronto
Mexico City
```

---

## 🔧 Project Structure

```
Weather-Dashboard/
├── index.html           # Main HTML file with structure
├── styles.css           # All styling and responsive design
├── script.js            # JavaScript logic and API integration
├── README.md            # This file
└── .gitignore           # Git ignore file
```

---

## 🛠️ Technologies Used

- **HTML5** - Semantic markup and structure
- **CSS3** - Gradient backgrounds, animations, responsive grid/flexbox
- **Vanilla JavaScript** - No frameworks, pure JS
- **OpenWeatherMap API** - Weather data provider (https://openweathermap.org/)
- **LocalStorage API** - Browser storage for saved cities
- **Fetch API** - Making API requests

---

## 🔌 OpenWeatherMap API

### **API Details**
- **Website**: https://openweathermap.org/
- **Free Tier**: Up to 60 calls/minute
- **No Credit Card Required** - Truly free!
- **API Endpoints Used**:
  - Current Weather: `/data/2.5/weather`
  - 5-Day Forecast: `/data/2.5/forecast`

### **Sample API Response**
```json
{
  "name": "London",
  "sys": {
    "country": "GB",
    "sunrise": 1694329200,
    "sunset": 1694376600
  },
  "main": {
    "temp": 15.5,
    "feels_like": 14.8,
    "humidity": 72,
    "pressure": 1013
  },
  "weather": [
    {
      "main": "Clouds",
      "description": "overcast clouds",
      "icon": "04d"
    }
  ],
  "wind": {
    "speed": 5.5,
    "deg": 230
  },
  "clouds": { "all": 90 },
  "visibility": 10000
}
```

---

## 💾 LocalStorage Usage

Your app saves data locally:
- **`lastSearchedCity`** - Automatically loads the last city you searched
- **`savedCities`** - Your favorite cities with current weather

Data is stored in your browser and never sent to any server.

---

## 📱 Responsive Design

Works perfectly on:
- ✅ Desktop (1200px+)
- ✅ Tablet (768px - 1200px)
- ✅ Mobile (< 768px)

All elements are responsive with proper touch targets for mobile.

---

## 🎨 UI Features

- **Gradient Backgrounds** - Beautiful purple to pink gradient
- **Smooth Animations** - Weather icons float, cards scale on hover
- **Weather Emojis** - Visual indicators (☀️ ⛅ 🌧️ ⛈️ ❄️ 🌫️)
- **Card-Based Layout** - Organized information in cards
- **Loading Spinner** - Visual feedback while fetching data
- **Toast Notifications** - Success/error messages
- **Dark Mode Ready** - Can be extended with dark mode toggle

---

## 🐛 Troubleshooting

### **Issue: "Please get your free API key from..." error**
- **Cause**: API_KEY is still set to 'demo'
- **Solution**: Follow the "Get Your API Key" section above

### **Issue: "City not found" error**
- **Cause**: Incorrect city name spelling
- **Solution**: Try a different city or use full name (e.g., "New York" instead of "NY")

### **Issue: "Invalid API key" error**
- **Cause**: API key is incorrect or inactive
- **Solution**: Get a new API key from OpenWeatherMap

### **Issue: No saved cities appearing**
- **Cause**: Browser storage might be disabled
- **Solution**: Enable cookies/storage in browser settings

### **Issue: Forecast not showing**
- **Cause**: API might be rate-limited
- **Solution**: Wait a few minutes and try again

---

## 🔐 API Key Safety

⚠️ **Important Security Note**:
- Your API key is included in client-side code (not recommended for production)
- For production apps, use a backend server as a proxy
- Free OpenWeatherMap accounts have rate limits (60 calls/min)
- Don't share your API key publicly

---

## 📚 Learning Outcomes

By exploring this project, you'll learn:
- ✅ How to integrate external APIs in web apps
- ✅ Fetching and parsing JSON data
- ✅ Working with localStorage for persistence
- ✅ DOM manipulation and dynamic content rendering
- ✅ Async/await and error handling
- ✅ Responsive CSS Grid and Flexbox layouts
- ✅ CSS animations and transitions
- ✅ Event handling and form submission
- ✅ Data formatting (timestamps, temperature units, etc.)

---

## 🔗 Useful Links

- [OpenWeatherMap API Docs](https://openweathermap.org/api)
- [MDN Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [MDN localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [CSS Grid Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- [CSS Flexbox Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout)

---

## 🚀 Future Enhancements

- [ ] Geolocation support (auto-detect user's city)
- [ ] Multiple temperature units (Celsius, Fahrenheit, Kelvin)
- [ ] Dark mode toggle
- [ ] Weather alerts and warnings
- [ ] Air quality index (AQI)
- [ ] UV index information
- [ ] Weather history/trends
- [ ] Custom location coordinates
- [ ] Weather maps integration
- [ ] Mobile app (React Native/Flutter)

---

## 📝 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Author

Created by **Manish** | AIML Student | Full-Stack Developer

---

**Enjoy tracking weather around the world! 🌍🌦️**

**Questions? Issues? Suggestions?**
- Open a GitHub issue
- Submit a pull request
- Check OpenWeatherMap documentation

---

*Made with ❤️ and lots of ☕*
