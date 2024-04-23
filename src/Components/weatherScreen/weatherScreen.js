import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "./weatherScreen.css";

function WeatherScreen({ theme }) {
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = "67b92f0af5416edbfe58458f502b0a31";

  const notify = () => {
    console.log("reached");
    toast("No such place found.", {
      autoClose: false,
      theme: theme === "light" ? "colored" : "dark",
    });
  };

  useEffect(() => {
    const fetchWeather = async (city) => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );

        if (!response.ok) {
          notify();
          throw new Error("No weather found.");
        }
        const data = await response.json();
        displayWeather(data);
      } catch (error) {
        notify();
        console.error("Error fetching weather:", error);
      }
    };

    const displayWeather = (data) => {
      setWeatherData(data);
    };

    const savedCity = localStorage.getItem("lastCity") || "Vellore";
    fetchWeather(savedCity);
  }, []);

  const searchWeather = async () => {
    const city = document.querySelector(".search-bar").value;
    if (!city) return;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new Error("No weather found.");
      }
      const data = await response.json();
      setWeatherData(data);
      localStorage.setItem("lastCity", city);
    } catch (error) {
      notify();
      console.error("Error fetching weather:", error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchWeather();
    }
  };

  return (
    <div
      className="weatherScreen"
      id="main"
      style={{
        backgroundImage:
          'url("https://source.unsplash.com/1600x900/?nature,water,landscape")',
      }}
    >
      <div className={`card ${theme}`}>
        <div className="search">
          <input
            type="text"
            className={`search-bar ${
              theme === "dark" ? "dark-text" : "light-text"
            }`}
            placeholder="Search"
            onKeyDown={handleKeyPress}
          />
          <button onClick={searchWeather}>
            <svg
              stroke={theme === "light" ? "black" : "white"}
              fill={theme === "light" ? "black" : "white"}
              strokeWidth="0"
              viewBox="0 0 1024 1024"
              height="1.5em"
              width="1.5em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
            </svg>
          </button>
        </div>
        {weatherData && (
          <div className="weather">
            <h2 className="city">Weather in {weatherData.name}</h2>
            <h1 className="temp">{weatherData.main.temp}°C</h1>
            <div className="flex">
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                alt=""
                className="icon"
              />
              <div className="description">
                {weatherData.weather[0].description} <br></br>
                H: {weatherData.main.temp_max}°C | L:{" "}
                {weatherData.main.temp_min}
                °C
              </div>
            </div>
            <div className="humidity">
              Feels like: {weatherData.main.feels_like}°C
              <br />
              Humidity: {weatherData.main.humidity}%
            </div>
            <div className="wind">
              Wind speed: {weatherData.wind.speed} km/h
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherScreen;
