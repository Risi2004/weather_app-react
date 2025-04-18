import { useState } from "react";
import axios from "axios";

function Weather() {
  const [city, setcity] = useState("");
  const [weather, setweather] = useState("");
  const [temp, settemp] = useState("");
  const [des, setdes] = useState("");

  function handleCity(evt) {
    setcity(evt.target.value);
  }

  function getWeather() {
    const apiKey = "090efaa0e544abaa8c40fe86d851ca79";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios(url)
      .then(function (success) {
        console.log(success.data);
        setweather(success.data.weather[0].main);
        setdes(success.data.weather[0].description);
        settemp(success.data.main.temp);
      })
      .catch(function (error) {
        console.error("Error:", error.response?.data || error.message);
        alert("Could not fetch weather. Please check the city name.");
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">🌤️ Weather Report</h1>
        <p className="text-gray-600 text-center mb-6">Get current weather info for your city</p>
        <input
          onChange={handleCity}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your city name"
          type="text"
        />
        <button
          onClick={getWeather}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Get Report
        </button>

        {weather && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg text-center">
            <h2 className="text-xl font-semibold text-blue-800">📍 {city.toUpperCase()}</h2>
            <p className="text-lg text-gray-700"><b>Weather:</b> {weather}</p>
            <p className="text-lg text-gray-700"><b>Temperature:</b> {temp} °C</p>
            <p className="text-lg text-gray-700"><b>Description:</b> {des}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;
