import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios module

const App = () => {
  const [city, setCity] = useState("");
  const [cityWeather, setCityWeather] = useState(null); // Initialize cityWeather with null
  const [loader, setLoader] = useState(false);

  const getWeatherData = async () => {
    try {
      const Api_URL = "https://api.weatherapi.com/v1/current.json";
      const API_KEY = "31a771993c61417896e172031240205";
      const response = await axios.get(`${Api_URL}?key=${API_KEY}&q=${city}`);
      setCityWeather(response.data); // Set cityWeather to response.data
      setLoader(false); // Turn off loader
    } catch (error) {
      alert("Failed to fetch weather data");
      setLoader(false); // Turn off loader even if there's an error
    }
  };

  const handleInput = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    if (city !== "") {
      setCityWeather(null);
      setLoader(true); // Turn on loader
      getWeatherData(); // Call getWeatherData only if city is not empty
    } else {
      alert("Please enter a valid city name!");
    }
  };

  return (
    <div>
      <div className="searchPart">
        <input
          className="inputField"
          type="text"
          value={city}
          placeholder="Enter city name"
          onChange={handleInput}
          required
        ></input>
        <button className="searchButton" onClick={handleSearch}>
          Search
        </button>
      </div>
      {loader && (
        <div className="content">
          <p>Loading data...</p>
        </div>
      )}
      {cityWeather && (
        <div className="weather-cards">
          <div className="weather-card">
            <p>
              <b>Temperature</b>
            </p>
            <p>{cityWeather.current.temp_c}°C</p>
          </div>
          <div className="weather-card">
            <p>
              <b>Humidity</b>
            </p>
            <p> {cityWeather.current.humidity}%</p>
          </div>
          <div className="weather-card">
            <p>
              <b>Condition</b>
            </p>
            <p> {cityWeather.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <p>
              <b>Wind Speed</b>
            </p>
            <p> {cityWeather.current.wind_kph}</p>
          </div>
          {/* Add more weather details as needed */}
        </div>
      )}
    </div>
  );
};

export default App;
