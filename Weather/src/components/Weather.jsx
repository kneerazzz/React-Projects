import React, { useState } from 'react';

function Weather() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState('');
  const [country, setCountry] = useState('');
  const apiKey = import.meta.env.VITE_WEATHER_API;

  const fetchData = async () => {
    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location},${country}`
      );
      const data = await res.json();
      setWeather(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-cyan-500 to-green-400 flex justify-center items-center px-4">
      <div className="bg-white/10 backdrop-blur-md shadow-xl rounded-3xl px-8 py-10 w-full max-w-md text-white text-center space-y-6">
        
        {/* Search */}
        <div className="flex flex-wrap gap-3 justify-center">
            <input
                type="text"
                placeholder="City"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="rounded-md px-4 py-2 text-black outline-1 outline-gray-500 focus:outline-2 focus:outline-blue-500  w-full sm:w-auto flex-1"
            />
            <input
                type="text"
                placeholder="Country (optional)"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="rounded-md px-4 py-2 text-black outline-1 outline-gray-500 focus:outline-2 focus:outline-blue-500 w-full sm:w-auto flex-1"
            />
            <button
                onClick={fetchData}
                className="bg-gray-200 text-blue-600 font-semibold px-4 py-2 rounded-md hover:bg-blue-100 w-full sm:w-auto"
            >
                Go
            </button>
        </div>

        {/* Weather Info */}
        {weather && (
          <>
            <img
              src={weather.current.condition.icon}
              alt="icon"
              className="mx-auto w-20"
            />
            <h1 className="text-5xl font-bold">{weather.current.temp_c}°C</h1>
            <p className="text-lg">{weather.location.name}, {weather.location.country}</p>

            <div className="flex justify-around text-sm pt-4 border-t border-white/30 mt-6">
              <div>
                <p className="text-gray-200">Humidity</p>
                <p className="font-semibold">{weather.current.humidity}%</p>
              </div>
              <div>
                <p className="text-gray-200">Wind</p>
                <p className="font-semibold">
                  {weather.current.wind_kph} km/h
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Weather;
