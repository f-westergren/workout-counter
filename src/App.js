import React, { useState, useEffect } from 'react'
import athleteService from './services/athletes'
import Athletes from './components/Athletes'
import NewForm from './components/NewForm'

const App = () => {
  const [ athletes, setAthletes ] = useState([])
  const [ newAthlete, addNewAthlete ] = useState('')

  useEffect(() => {
    athleteService 
      .getAll()
      .then(initialAthletes => setAthletes(initialAthletes.sort(compare)))
  }, [])

  const increaseWorkout = (athlete) => {
    const person = athletes.find(p => p.id === athlete)
    const changedAthlete = {...person, workouts: person.workouts+1}

    athleteService
      .update(changedAthlete.id, changedAthlete)
      .then(returnedAthlete =>
        setAthletes(athletes.map(a => a.id !== athlete ? a : returnedAthlete).sort(compare)))
  }

  const decreaseWorkout = (athlete) => {
    const person = athletes.find(p => p.id === athlete)
    const changedAthlete = {...person, workouts: person.workouts-1}

    athleteService
      .update(changedAthlete.id, changedAthlete)
      .then(returnedAthlete =>
        setAthletes(athletes.map(a => a.id !== athlete ? a : returnedAthlete).sort(compare)))
  }

  const resetWorkouts = (athlete) => {
    const person = athletes.find(p => p.id === athlete)
    const changedAthlete = {...person, workouts: 0}

    athleteService
      .update(changedAthlete.id, changedAthlete)
      .then(returnedAthlete =>
        setAthletes(athletes.map(a => a.id !== athlete ? a : returnedAthlete).sort(compare)))
  }

  const addAthlete = (event) => {
    event.preventDefault()
    const newList = {
      name: newAthlete,
      workouts: 0
    }
    athleteService
    .create(newList)
    .then(updatedList => {
      setAthletes(athletes.concat(updatedList))
    })
  }

  const removeAthlete = async (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
    await athleteService.remove(id)
  
    setAthletes(athletes.filter(p => p.id !== id))
    }
}

  const compare = (a, b) => {
    const athleteA = a.workouts
    const athleteB = b.workouts
    let comparison = 0
    if (athleteA < athleteB) {
      comparison = 1
    } else if (athleteA === athleteB) {
      comparison = 0 }
      else {
      comparison = -1
    }
    return comparison
  }

  const names = () => athletes.map(athlete => 
    <Athletes 
      name={athlete.name}
      workouts={athlete.workouts}
      key={athlete.id}
      add={() => increaseWorkout(athlete.id)}
      sub={() => decreaseWorkout(athlete.id)}
      reset={() => resetWorkouts(athlete.id)}
      remove={() => removeAthlete(athlete.id, athlete.name)}
      />
    )
  
  const handleAddAthlete = (event) => addNewAthlete(event.target.value)

  return (
  <div>
    <h1>Niklas och Folkes träningsdagbok</h1>
    <table>
      <tbody>
        {names()}
      </tbody>
    </table>
    <NewForm
      add={addAthlete}
      value={newAthlete}
      onChange={handleAddAthlete}
      />
  </div>

  )
}

export default App;
