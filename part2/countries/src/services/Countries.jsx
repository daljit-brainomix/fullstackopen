import axios from "axios"

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/"

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
    fetchByName
}