import axios from "axios"
const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
    return axios
        .get(baseUrl)
        .then(response => response.data)
}

const createEntry = newEntry => {
    return axios
        .post(baseUrl, newEntry)
        .then(response => response.data)
}

const updateEntry = (id, updatedEntry) => {
    return axios
        .put(`${baseUrl}/${id}`, updatedEntry)
        .then(response => response.data)
}

export default {
    getAll,
    createEntry,
    updateEntry
}