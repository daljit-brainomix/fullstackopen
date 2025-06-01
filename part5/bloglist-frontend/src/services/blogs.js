import axios from 'axios'
const baseUrl = '/api/blogs'

let authToken

const setAuthToken = async (newToken) => {
  authToken = `Bearer ${newToken}`
}

// const getAll = () => {
//   const request = axios.get(baseUrl)
//   return request.then(response => response.data)
// }
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async (blogData) => {
  const config = {
    headers: { 
      'Authorization': authToken,
      'Content-Type': 'application/json'  
    }
  }

  try {
    const response = await axios.post(baseUrl, blogData, config)
    console.log('Response:', response.data)
    return response.data
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message)
    throw error // caller must use try/catch
  }
}

export default { 
  createBlog,
  getAll,
  setAuthToken,
}