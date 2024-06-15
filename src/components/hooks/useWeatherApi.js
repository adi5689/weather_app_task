import React, {useState, useEffect} from 'react';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const useWeatherApi = (city, unit = 'metric') => {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      if (!city) return;
  
      const fetchWeather = async () => {
        try {
          const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`);
          const weatherData = await weatherResponse.json();
  
          const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${API_KEY}`);
          const forecastData = await forecastResponse.json();
  
          setCurrentWeather(weatherData);
          setForecast(forecastData);
        } catch (error) {
          setError(error);
        }
      };
  
      fetchWeather();
    }, [city, unit]);
  
    return { currentWeather, forecast, error };
  };
  
  export default useWeatherApi;