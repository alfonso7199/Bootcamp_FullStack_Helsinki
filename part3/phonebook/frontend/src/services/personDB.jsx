import axios from 'axios'
const baseUrl = 'https://part3-phonebook-backend-alfonso.fly.dev/api/personas'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then((response) => {
    console.log('Respuesta del servidor:', response);
    return response.data;
  })
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then((response) => {
    console.log('Respuesta del servidor:', response);
    return response.data;
  })
}

const deletePersona = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then((response) => {
    console.log('Respuesta del servidor:', response);
    return response.data;
  })
}

export default {
  getAll,
  create,
  update,
  deletePersona
}
