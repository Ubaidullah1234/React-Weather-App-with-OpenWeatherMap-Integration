import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import search_icon from '../assets/search.png';
import clear from '../assets/clear.png';
import cloud from '../assets/cloud.png';
import drizzle from '../assets/drizzle.png';
import humidity from '../assets/humidity.png';
import rain from '../assets/rain.png';
import snow from '../assets/snow.png';
import wind from '../assets/wind.png';


const Weather = () => {

  const inputRef = useRef()
  const[weaterData,setWeatherData] = useState(false);

  const allIcons = {
    "01d":clear,
    "01n":clear,
    "02d":cloud,
    "02n":cloud,
    "03d":cloud,
    "03n":cloud,
    "04d":drizzle,
    "04n":drizzle,
    "09d":rain,
    "09n":rain,
    "10d":rain,
    "10n":rain,
    "13d":snow,
    "13n":snow,
  }

  


  const [city, setCity] = useState('');  // Initialize state for city
  const [temperature, setTemperature] = useState(null); // Initialize state for temperature
  const [humidityLevel, setHumidityLevel] = useState(null); // Initialize state for humidity
  const [windSpeed, setWindSpeed] = useState(null); // Initialize state for wind speed

  const search = async (cityName) => {
    if(cityName === ""){
      alert("Enter City Name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const icon = allIcons[data.weather[0].icon]||clear;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
       icon:icon
      })

      

    } catch (error) {  
      console.error("An error occurred:", error);
    }
  }

  useEffect(() => {
    search("Aomori");  // Call the search function with "London" as the default city
  }, []);

  return (
    <div className='weather'>
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder='Search' />
        <img onClick={()=>search(inputRef.current.value)} src={search_icon} alt="" />
      </div>
      <img src={weaterData.icon} alt="" className='weather-icon' />
      <p className='temperature'> {weaterData.temperature}°C`</p>
      <p className='location'>{weaterData.location}</p>
      <div className="weather-data">
        <div className="col">
          <img src={humidity} alt="" />
          <div>
            <p>{weaterData.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>

        <div className="col2">
          <img src={wind} alt="" />
          <div>
            <p>{weaterData.windSpeed}km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
