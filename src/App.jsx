import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchCity from './components/SearchCity';
import WeatherDisplay from './components/WeatherDisplay';
import useWeatherApi from './components/hooks/useWeatherApi';
import useFavoritesApi from './components/hooks/useFavoritesApi';
import FavoritesPage from './components/FavoritesPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const dayImgLinks = [
  { name: "sun", imgLink: "https://i.postimg.cc/XNF7w9jT/sun.png" },
  { name: "sun_behind_cloud", imgLink: "https://i.postimg.cc/bwPKKtjS/sun-behind-cloud.png" },
  { name: "rain", imgLink: "https://i.postimg.cc/3xHTYq2R/rain.png" },
  { name: "cloudy", imgLink: "https://i.postimg.cc/3xHTYq2R/rain.png" },
];

const nightImgLinks = [
  { name: "moon", imgLink: "https://i.postimg.cc/C1CMVVQw/moon.png" },
  { name: "moon_behind_cloud", imgLink: "https://i.postimg.cc/WbzD0hyr/moon-behind-cloud.png" },
  { name: "rain", imgLink: "https://i.postimg.cc/3xHTYq2R/rain.png" },
  { name: "cloudy", imgLink: "https://i.postimg.cc/3xHTYq2R/rain.png" },
];

const App = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [unit, setUnit] = useState('metric');
  const { currentWeather, forecast, error: weatherError } = useWeatherApi(selectedCity, unit);
  const { favorites, addFavorite, deleteFavorite, error: favoritesError } = useFavoritesApi();

  useEffect(() => {
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
      setSelectedCity(lastCity);
    }

    const savedUnit = localStorage.getItem('unit');
    if (savedUnit) {
      setUnit(savedUnit);
    }
  }, []);

  const handleSearch = (city) => {
    setSelectedCity(city);
    localStorage.setItem('lastCity', city);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddFavorite = () => {
    if (selectedCity && !favorites.some(fav => fav.name === selectedCity)) {
      addFavorite({ id: `${Date.now()}`, name: selectedCity }); // Ensure ID is a string
    }
  };

  const toggleUnit = () => {
    const newUnit = unit === 'metric' ? 'imperial' : 'metric';
    setUnit(newUnit);
    localStorage.setItem('unit', newUnit);
  };

  return (
    <Router>
      <div className="p-4 flex flex-col justify-center items-center font-anta">
        <h1 className="text-3xl mb-4 text-center">Weather Dashboard</h1>
        <ToastContainer />
        <Routes>
          <Route path="/" element={
            <div>
              <SearchCity onSearch={handleSearch} />
              {weatherError && <p className="text-red-500">{weatherError.message}</p>}
              <WeatherDisplay
                currentWeather={currentWeather}
                forecast={forecast}
                unit={unit}
                onAddFavorite={handleAddFavorite}
                onToggleUnit={toggleUnit}
              />
              {favoritesError && <p className="text-red-500">{favoritesError.message}</p>}
              <div className="mt-8">
                <h2 className="text-2xl mb-4">Favorite Cities</h2>
                {favorites.length === 0 ? (
                  <p>No cities in the favorites</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {favorites.map((favorite) => (
                      <FavoriteWeatherDetails
                        key={favorite.id}
                        cityName={favorite.name}
                        unit={unit}
                        onDelete={() => deleteFavorite(favorite.id)}
                        onSelectCity={(city) => {
                          setSelectedCity(city);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }} // Pass setSelectedCity function with scroll to top
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          } />
          <Route path="/favorites" element={<FavoritesPage favorites={favorites} onDelete={deleteFavorite} onSelect={setSelectedCity} />} />
        </Routes>
      </div>
    </Router>
  );
};

const FavoriteWeatherDetails = ({ cityName, unit, onDelete, onSelectCity }) => {
  const { currentWeather, error } = useWeatherApi(cityName, unit);

  // Function to capitalize the first letter of each word
  const capitalizeCityName = (name) => {
    return name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  // Function to determine if it's day or night
  const isDayTime = (timestamp, sunrise, sunset) => {
    const date = new Date(timestamp * 1000);
    const sunriseTime = new Date(sunrise * 1000);
    const sunsetTime = new Date(sunset * 1000);

    // Extract hours and minutes from dates
    const dateHours = date.getHours();
    const dateMinutes = date.getMinutes();

    const sunriseHours = sunriseTime.getHours();
    const sunriseMinutes = sunriseTime.getMinutes();

    const sunsetHours = sunsetTime.getHours();
    const sunsetMinutes = sunsetTime.getMinutes();

    // Compare only hours and minutes
    const afterSunrise = dateHours > sunriseHours || (dateHours === sunriseHours && dateMinutes >= sunriseMinutes);
    const beforeSunset = dateHours < sunsetHours || (dateHours === sunsetHours && dateMinutes <= sunsetMinutes);

    return afterSunrise && beforeSunset;
  };

  const getWeatherIcon = (weather, timestamp) => {
    const images = isDayTime(timestamp, currentWeather.sys.sunrise, currentWeather.sys.sunset) ? dayImgLinks : nightImgLinks;
    switch (weather) {
      case "Clear":
        return images.find(
          (img) => img.name.includes("sun") || img.name.includes("moon")
        ).imgLink;
      case "Clouds":
        return images.find((img) => img.name.includes("cloud")).imgLink;
      case "Rain":
      case "Drizzle":
      case "Thunderstorm":
        return images.find((img) => img.name === "rain").imgLink;
      default:
        return images[0].imgLink; // Default to the first image
    }
  };

  return (
    <div className="border p-4 rounded shadow-lg transform transition-transform duration-300 hover:scale-105">
      <h3 className="text-2xl text-center font-bold mb-2">
        <button
          className="text-blue-500 hover:underline"
          onClick={() => onSelectCity(cityName)} // Set the selected city on click
        >
          {capitalizeCityName(cityName)}
        </button>
      </h3>
      {error && <p className="text-red-500">{error.message}</p>}
      {currentWeather && (
        <div className='text-center'>
          <p>{currentWeather.weather[0].description}</p>
          <img
            src={getWeatherIcon(currentWeather.weather[0].main, Date.now() / 1000)}
            alt={currentWeather.weather[0].description}
            className="w-[100px] mx-auto"
          />
          <p className='text-xl font-semibold'>
            {currentWeather.main.temp}°{unit === 'metric' ? 'C' : 'F'}
          </p>
          <p>Humidity: {currentWeather.main.humidity}%</p>
          <p>Wind Speed: {currentWeather.wind.speed} {unit === 'metric' ? 'm/s' : 'kmph'}</p>
          <button
            onClick={onDelete}
            className="mt-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-300"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
