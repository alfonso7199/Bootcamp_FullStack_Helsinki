import { useEffect, useState } from 'react'
import axios from 'axios'

const DatosMeteo = ({ ciudad }) => {
  const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const [weather, setWeather] = useState([])

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&appid=${OPENWEATHER_API_KEY}`
      )
      .then((response) => {
        setWeather(response.data)
      })
  }, [])

  return (
    <>
      {weather.main ? (
        <div>
          <h2>Tiempo en {ciudad}</h2>
          <div>Temperatura {weather.main.temp}°C</div>
          <img
            alt="weather icon"
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          />
          <div>Viento {weather.wind.speed} m/s</div>
        </div>
      ) : null}
    </>
  )
}
export default DatosMeteo