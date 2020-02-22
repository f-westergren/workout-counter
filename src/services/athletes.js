import axios from 'axios'
const baseUrl = '/api/athletes'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response =>response.data)
}

const update = (athleteId, newObject) => {
  const request = axios.post(`${baseUrl}/${athleteId}`, newObject)
  return request.then(response => response.data)
}

const remove = (athleteId) => axios.delete(`${baseUrl}/${athleteId}`)

export default { getAll, create, update, remove }