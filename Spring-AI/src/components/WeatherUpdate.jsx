import React, { useState } from 'react';

const WeatherUpdate = () => {
  const [city, setCity] = useState('');
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    if (!city) {
      setError('Please enter a city name.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch(`http://localhost:8080/weather?city=${city}`);
      if (!response.ok) {
        throw new Error('City not found or API error.');
      }
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.info || 'Error fetching weather data.');
      }

      setWeatherInfo(data);
    } catch (error) {
      setError(error.message);
      setWeatherInfo(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="WeatherUpdate max-w-xl mx-auto p-6 border shadow-md rounded-lg my-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Weather Update</h2>

      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        onClick={fetchWeather}
        className="w-full p-2 bg-sky-500 text-white font-bold rounded hover:bg-sky-600 transition duration-200 mb-6"
      >
        {loading ? 'Loading...' : 'Get Weather'}
      </button>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {weatherInfo && weatherInfo.current && (
        <div className="output-box mt-4 text-center">
          <h3 className="text-xl font-bold">{weatherInfo.location.name}, {weatherInfo.location.country}</h3>
          <img
            src={weatherInfo.current.weather_icons[0]}
            alt={weatherInfo.current.weather_descriptions[0]}
            className="mx-auto my-4 w-24 h-24"
          />
          <p className="text-3xl font-semibold">{weatherInfo.current.temperature}°C</p>
          <p className="text-gray-600">{weatherInfo.current.weather_descriptions[0]}</p>
          <div className="flex justify-around mt-4 text-sm text-gray-700">
            <div>
              <p className="font-semibold">Humidity</p>
              <p>{weatherInfo.current.humidity}%</p>
            </div>
            <div>
              <p className="font-semibold">Wind</p>
              <p>{weatherInfo.current.wind_speed} km/h</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherUpdate;
