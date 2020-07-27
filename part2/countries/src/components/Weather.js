import React, {useState, useEffect} from 'react';
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const Weather = ({capital}) => {
const [weather, setWeather] = useState({})
useEffect(() => {
    axios
    .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
    .then(response => {
        const data = response.data.current
        console.log(data)
        setWeather({temp: data.temperature,
                    img:data.weather_icons[0],
                    wind_speed:data.wind_speed,
                    wind_dir:data.wind_dir})
    })
},[capital])

    return (
      <div>
        <h3>Weather in {capital}</h3>
        temperature: {weather.temp} Celsius <br/>
        <img src={weather.img} alt={capital} wind_dir="70px"/> <br/>
        wind: {weather.wind_speed} mph direction {weather.wind_dir}
      </div>
    );
};

export default Weather;