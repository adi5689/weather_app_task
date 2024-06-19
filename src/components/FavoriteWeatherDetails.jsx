import useWeatherApi from "./hooks/useWeatherApi";


const FavoriteWeatherDetails = ({ cityName, unit, onDelete, onSelectCity }) => {
    const { currentWeather, error } = useWeatherApi(cityName, unit);
  
    // Function to capitalize the first letter of each word
    const capitalizeCityName = (name) => {
      return name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };
  
    console.log(currentWeather);
  
  
    return (
      <div className="border p-4 rounded shadow-lg transform transition-transform duration-300 hover:scale-105">
        <h3 className="text-2xl text-center font-bold mb-2">
          <button
            className="text-white hover:underline"
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
              src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
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


  export default FavoriteWeatherDetails;