import axios from "axios"

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/"


const fetchWeather = (lat,lon) => {
    const weather_api_key = import.meta.env.VITE_WEATHER_API_KEY 
    return axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weather_api_key}&units=metric`)
        .then((response) => response.data)
}

const fetchAll = () => {
    return axios
        .get(`${baseUrl}all`)
        .then((response) => response.data)
}

const fetchByName = (name) => {
    return axios
        .get(`${baseUrl}name/${name}`)
        .then((response) => response.data)
}

export default {
    fetchAll,
    fetchByName,
    fetchWeather
}