import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const nightImgLinks = [
  { name: "moon", imgLink: "https://i.postimg.cc/C1CMVVQw/moon.png" },
  {
    name: "moon_behind_cloud",
    imgLink: "https://i.postimg.cc/WbzD0hyr/moon-behind-cloud.png",
  },
  { name: "rain", imgLink: "https://i.postimg.cc/3xHTYq2R/rain.png" },
  { name: "cloudy", imgLink: "https://i.postimg.cc/3xHTYq2R/rain.png" },
];

const dayImgLinks = [
  { name: "sun", imgLink: "https://i.postimg.cc/XNF7w9jT/sun.png" },
  {
    name: "sun_behind_cloud",
    imgLink: "https://i.postimg.cc/bwPKKtjS/sun-behind-cloud.png",
  },
  { name: "rain", imgLink: "https://i.postimg.cc/3xHTYq2R/rain.png" },
  { name: "cloudy", imgLink: "https://i.postimg.cc/3xHTYq2R/rain.png" },
];

const WeatherDisplay = ({
  currentWeather,
  forecast,
  unit,
  onAddFavorite,
  onToggleUnit,
}) => {
  if (!currentWeather || !forecast) return null;

  console.log(forecast);

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
    const afterSunrise =
      dateHours > sunriseHours ||
      (dateHours === sunriseHours && dateMinutes >= sunriseMinutes);
    const beforeSunset =
      dateHours < sunsetHours ||
      (dateHours === sunsetHours && dateMinutes <= sunsetMinutes);

    return afterSunrise && beforeSunset;
  };

  const getWeatherIcon = (weather, timestamp, sunrise, sunset) => {
    const images = isDayTime(timestamp, sunrise, sunset)
      ? dayImgLinks
      : nightImgLinks;
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
              <h2 className="text-4xl font-bold">
                {currentWeather.name}, {currentWeather.sys.country}
              </h2>
              <p className="text-lg">
                {new Date().toLocaleDateString()}{" "}
                {new Date().toLocaleTimeString()}
              </p>
            </div>

            <div className="flex flex-col justify-center items-center">
              <img
                src={getWeatherIcon(
                  currentWeather.weather[0].main,
                  Date.now() / 1000,
                  currentWeather.sys.sunrise,
                  currentWeather.sys.sunset
                )}
                alt={currentWeather.weather[0].description}
                className="w-28 md:w-44 mr-4"
              />
              <p className="text-2xl">{currentWeather.weather[0].description}</p>
              <p className="mb-2 text-3xl font-bold">
                {currentWeather.main.temp}°{unit === "metric" ? "C" : "F"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-5">
            <div>
              <p className="mb-2 text-center">
                Feels Like: <br />
                {currentWeather.main.feels_like}°{unit === "metric" ? "C" : "F"}
              </p>
              <p className="mb-2 text-center">
                Humidity: <br />
                {currentWeather.main.humidity}%
              </p>
            </div>

            <div>
              <p className="mb-2 text-center">
                Pressure: <br />
                {currentWeather.main.pressure} hPa
              </p>
              <p className="mb-2 text-center">
                Wind Speed: <br />
                {currentWeather.wind.speed} {unit === "metric" ? "m/s" : "mph"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-center">
                Coordinates: <br />[{currentWeather.coord.lat},{" "}
                {currentWeather.coord.lon}]
              </p>
              <p className="mb-2 text-center">
                Timezone: <br /> GMT
                {currentWeather.timezone / 3600 >= 0
                  ? `+${currentWeather.timezone / 3600}`
                  : currentWeather.timezone / 3600}
              </p>
            </div>

            <div>
              <p className="mb-2 text-center">
                Sunrise: <br />
                {formatTime(
                  currentWeather.sys.sunrise,
                  currentWeather.timezone
                )}{" "}
                am
              </p>
              <p className="mb-2 text-center">
                Sunset: <br />
                {formatTime(
                  currentWeather.sys.sunset,
                  currentWeather.timezone
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
                  <div key={index} className="p-2 border rounded text-center transform transition-transform duration-300 hover:scale-110">
                    <p>{new Date(weather.dt * 1000).toLocaleTimeString()}</p>
                    <img
                      src={getWeatherIcon(
                        weather.weather[0].main,
                        weather.dt,
                        forecast.city.sunrise,
                        forecast.city.sunset
                      )}
                      alt={weather.weather[0].description}
                      className="w-16 mx-auto"
                    />
                    <p>
                      {Math.round(weather.main.temp)}°
                      {unit === "metric" ? "C" : "F"}
                    </p>
                    <p>{weather.weather[0].description}</p>
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
