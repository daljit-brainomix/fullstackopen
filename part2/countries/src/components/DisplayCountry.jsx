import { useState, useEffect } from 'react'

import CountriesService from "../services/Countries"
import DisplayWeather from "./DisplayWeather";

const DisplayCountry = ({country}) => {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      if (country.capitalInfo && country.capitalInfo.latlng) {
        const [lat, lon] = country.capitalInfo.latlng;
        CountriesService.fetchWeather(lat, lon)
          .then((response) => {
            setWeather(response);
          })
          .catch((err) => {
            setError("Failed to fetch weather data");
            console.error(err);
          });
      }
    }, [country]);
    
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>Captial: {country.capital[0]}</p>
        <p>Area: {country.area}</p>
        <h4>Languages</h4>
        <ul>
          {Object.values(country.languages).map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} />
        <h3>Weather in {country.capital[0]}</h3>
        {weather ? <DisplayWeather weatherData={weather} /> : error && <p>{error}</p>}
      </div>
    )
  }
  
  export default DisplayCountry