import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchCity from './components/SearchCity';
import WeatherDisplay from './components/WeatherDisplay';
import useWeatherApi from './components/hooks/useWeatherApi';
import useFavoritesApi from './components/hooks/useFavoritesApi';
import FavoritesPage from './components/FavoritesPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FavoriteWeatherDetails from './components/FavoriteWeatherDetails';



const App = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [unit, setUnit] = useState('metric');
  const { currentWeather, forecast, error: weatherError, notFound } = useWeatherApi(selectedCity, unit);
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
      <div className="p-4 flex flex-col justify-center items-center font-anta bg-gradient-to-b from-cyan-400 to-blue-600 text-white">
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
                notFound={notFound}
              />
              {favoritesError && <p className="text-red-500">{favoritesError.message}</p>}
              <div className="mt-8">
                <h2 className="text-2xl my-12">Favorite Cities</h2>
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

export default App;
