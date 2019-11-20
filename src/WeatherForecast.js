import React, { useState } from "react";
import WeatherIcon from "./WeatherIcon";
import axios from "axios";
import "./WeatherForecast.css";

export default function WeatherForecast(props) {
  const [loaded, setLoaded] = useState(false);
  const [forecast, setForecast] = useState(null);
  function handleResponse(response) {
    setForecast(response.data);
    setLoaded(true);
  }

  function formatHours(date) {
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    return `${hours}:${minutes}`;
  }

  if (loaded && forecast.city.name === props.city) {
    return (
      <div className="WeatherForecast row">
        {forecast.list.slice(0, 5).map(function(weather) {
          return (
            <div className="col">
              {formatHours(new Date(weather.dt * 1000))}
              <WeatherIcon code={weather.weather[0].icon} />
              {Math.round(weather.main.temp)}°C
            </div>
          );
        })}
      </div>
    );
  } else {
    const apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${props.city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
    return null;
  }
}
