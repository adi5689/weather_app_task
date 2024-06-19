import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faTemperatureHigh,
  faTemperatureLow,
  faTint,
  faWind,
  faTachometerAlt,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";

const WeatherDisplay = ({
  currentWeather,
  forecast,
  unit,
  onAddFavorite,
  onToggleUnit,
  notFound,
}) => {
  if (notFound) {
    return (
      <div className="p-4 border flex w-full flex-col justify-center items-center rounded shadow-md">
        <h2 className="text-4xl text-center font-bold lg:my-10 my-6">Searched city not found</h2>
      </div>
    );
  }

  if (!currentWeather || !forecast) return null;

  const formatTime = (timestamp, timezone) => {
    const date = new Date((timestamp + timezone) * 1000);
    return date.toUTCString().slice(-12, -7); // Format the time
  };

  return (
    <div className="p-4 border flex w-full flex-col justify-center items-center rounded shadow-md">
      <div className="flex flex-col md:flex-row justify-center md:items-center">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <div>
              <h2 className="text-4xl text-center font-bold">
                {currentWeather?.name}, {currentWeather?.sys?.country}
              </h2>
              <div className="flex gap-x-4">
                <p className="text-lg">
                  {new Date().toLocaleDateString()}
                  <br /> {new Date().toLocaleTimeString()}
                </p>
                <p className="mb-2 text-lg">
                  Lat: {currentWeather?.coord?.lat} <br /> Lon:{" "}
                  {currentWeather?.coord?.lon}
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center">
              <img
                src={`http://openweathermap.org/img/wn/${currentWeather?.weather[0]?.icon}@2x.png`}
                alt={currentWeather?.weather[0]?.description}
                className="w-28 md:w-44 mr-4"
              />
              <p className="text-2xl">
                {currentWeather?.weather[0]?.description}
              </p>
              <p className="mb-2 text-3xl font-bold">
                {currentWeather?.main?.temp}°{unit === "metric" ? "C" : "F"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-5">
            <div>
              <p className="mb-2 text-center">
                <FontAwesomeIcon icon={faTemperatureHigh} /> Feels Like: <br />
                {currentWeather?.main?.feels_like}°{unit === "metric" ? "C" : "F"}
              </p>
              <p className="mb-2 text-center">
                <FontAwesomeIcon icon={faTint} /> Humidity: <br />
                {currentWeather?.main?.humidity}%
              </p>
            </div>

            <div>
              <p className="mb-2 text-center">
                <FontAwesomeIcon icon={faTachometerAlt} /> Pressure: <br />
                {currentWeather?.main?.pressure} hPa
              </p>
              <p className="mb-2 text-center">
                <FontAwesomeIcon icon={faWind} /> Wind Speed: <br />
                {currentWeather?.wind?.speed} {unit === "metric" ? "m/s" : "mph"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-center">
                <FontAwesomeIcon icon={faTemperatureHigh} className="" /> Max.
                Temp: <br />
                {currentWeather?.main?.temp_max}°{unit === "metric" ? "C" : "F"}
              </p>
              <p className="mb-2 text-center">
                <FontAwesomeIcon icon={faTemperatureLow} /> Min. Temp: <br />
                {currentWeather?.main?.temp_min}°{unit === "metric" ? "C" : "F"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-center">
                <FontAwesomeIcon icon={faSun} /> Sunrise: <br />
                {formatTime(
                  currentWeather?.sys?.sunrise,
                  currentWeather?.timezone
                )}{" "}
                am
              </p>
              <p className="mb-2 text-center">
                <FontAwesomeIcon icon={faMoon} /> Sunset: <br />
                {formatTime(
                  currentWeather?.sys?.sunset,
                  currentWeather?.timezone
                )}{" "}
                pm
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="my-4 w-[300px] flex justify-between items-center">
        <button
          onClick={onAddFavorite}
          className="bg-red-500 text-white p-2 rounded-full flex items-center justify-center hover:bg-red-600 transition duration-300"
          aria-label="Add to Favorites"
        >
          <FontAwesomeIcon icon={faHeart} />
        </button>
        <Link
          to="/favorites"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Go to Favorites
        </Link>
        <button
          onClick={onToggleUnit}
          className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 transition duration-300"
        >
          {unit === "metric" ? "°F" : "°C"}
        </button>
      </div>

      <div className="forecast mt-4">
        <h3 className="text-2xl font-bold mb-2">5-day Forecast</h3>
        {Object.keys(groupForecastByDate(forecast.list)).map((date) => (
          <div key={date} className="mb-4">
            <h4 className="text-xl font-semibold mb-2">{date}</h4>
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2">
              {groupForecastByDate(forecast.list)[date].map(
                (weather, index) => (
                  <div
                    key={index}
                    className="p-2 border rounded text-center transform transition-transform duration-300 hover:scale-110"
                  >
                    <p>{new Date(weather.dt * 1000).toLocaleTimeString()}</p>
                    <img
                      src={`http://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`}
                      alt={weather?.weather[0]?.description}
                      className="w-16 mx-auto"
                    />
                    <p>
                      {Math.round(weather?.main?.temp)}°
                      {unit === "metric" ? "C" : "F"}
                    </p>
                    <p>{weather?.weather[0]?.description}</p>
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const groupForecastByDate = (forecastList) => {
  return forecastList.reduce((acc, curr) => {
    const date = new Date(curr.dt * 1000).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(curr);
    return acc;
  }, {});
};

export default WeatherDisplay;
