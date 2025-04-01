const DisplayWeather = ({weatherData}) => {
  return (
    <div>
      <p>Temperature: {(weatherData.main.temp)}°C</p>
      <img
        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
        alt={weatherData.weather[0].description}
      />
      <p>{weatherData.weather[0].description}</p>
      <p>Wind speed: {weatherData.wind.speed} m/s</p>
    </div>
  )
}

export default DisplayWeather