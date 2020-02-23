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

const removeAthlete = (athleteId) => axios.delete(`${baseUrl}/${athleteId}`)

const removeWorkout = (athleteId, workoutId) => axios.delete(`${baseUrl}/${athleteId}/workouts/${workoutId}`)

export default { getAll, create, update, removeAthlete, removeWorkout }