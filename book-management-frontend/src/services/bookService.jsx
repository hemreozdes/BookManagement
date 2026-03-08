import axios from 'axios'

const API_URL = 'http://localhost:8080/api/books'

const getAuthHeader = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`
  }
})

export const getAllBooks = async (token) => {
  const response = await axios.get(API_URL, getAuthHeader(token))
  return response.data
}

export const getBookById = async (token, id) => {
  const response = await axios.get(`${API_URL}/${id}`, getAuthHeader(token))
  return response.data
}

export const createBook = async (token, bookData) => {
  const response = await axios.post(API_URL, bookData, getAuthHeader(token))
  return response.data
}

export const updateBook = async (token, id, bookData) => {
  const response = await axios.put(`${API_URL}/${id}`, bookData, getAuthHeader(token))
  return response.data
}

export const deleteBook = async (token, id) => {
  await axios.delete(`${API_URL}/${id}`, getAuthHeader(token))
}

export const searchBooks = async (token, params) => {
  const response = await axios.get(`${API_URL}/search`, {
    ...getAuthHeader(token),
    params
  })
  return response.data
}