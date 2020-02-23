import React, { useState, useEffect } from 'react'
import athleteService from './services/athletes'
import Athletes from './components/Athletes'
import Workout from './components/Workout'
import NewForm from './components/NewForm'
import WorkoutList from './components/WorkoutList'

const App = () => {
  const [ athletes, setAthletes ] = useState([])
  const [ newAthlete, addNewAthlete ] = useState('')
  const [ newNote, setNewNote ] = useState('')
  const [ date, setDate ] = useState('')
  const [ workoutType, setWorkoutType ] = useState('')
  const [ newName, setNewName ] = useState('')

  useEffect(() => {
    athleteService 
      .getAll()
      .then(initialAthletes => setAthletes(initialAthletes.sort(compare)))
  }, [])

  const addAthlete = (event) => {
    event.preventDefault()
    const newList = {
      name: newAthlete,
      workouts: []
    }
    athleteService
      .create(newList)
      .then(updatedList => {
        setAthletes(athletes.concat(updatedList))
    })
  }

  const removeAthlete = (athleteId, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      athleteService
        .removeAthlete(athleteId)
  
      setAthletes(athletes.filter(athlete => athlete.athleteId !== athleteId).sort(compare))
      setNewName('')
    }
  }

  const removeWorkout = (athleteId, workoutId, type) => {
    if (window.confirm(`Delete ${type} workout?`)) {
      athleteService
        .removeWorkout(workoutId)

      setAthletes(athletes.filter())
      


    }
  }

  const addWorkout = (event) => {
    event.preventDefault()
    const person = athletes.find(athlete => athlete.name === newName)
    const newWorkout = 
      {
        type: workoutType,
        date: date,
        note: newNote,
    }

    athleteService
      .update(person.athleteId, newWorkout)
      .then(returnedWorkout => 
        setAthletes(athletes.map(athlete => athlete.athleteId !== person.athleteId ? athlete : returnedWorkout).sort(compare)))
        setNewNote('')
        setDate('')
        setWorkoutType('')
        setNewName('')
  }

  const compare = (a, b) => {
    let comparison = 0
    if (a.workouts.length < b.workouts.length) {
      comparison = 1
    } else if (a.workouts.length === b.workouts.length) {
      comparison = 0 }
      else {
      comparison = -1
    }
    return comparison
  }

  const names = athletes.map(athlete => 
    <Athletes 
      name={athlete.name}
      workouts={athlete.workouts.length}
      key={athlete.athleteId}
      remove={() => removeAthlete(athlete.athleteId, athlete.name)}
      />
    )

  const listOfWorkouts = athletes.map(athlete => 
    <WorkoutList
      key={athlete.athleteId}
      name={athlete.name}
      workout={athlete.workouts}
      />
  )

  const handleAddAthlete = (event) => addNewAthlete(event.target.value)
  const handleNewNote = (event) => setNewNote(event.target.value)
  const handleWorkoutChange = (event) => setWorkoutType(event.target.value)
  const handleDateChange = (event) => setDate(event.target.value)
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
  <div>
    <h1>Folkes träningsdagbok</h1>
    <table>
      <tbody>
        {names}
      </tbody>
    </table>
    <Workout 
      add={addWorkout}
      note={newNote}
      noteChange={handleNewNote}
      workout={workoutType}
      workoutChange={handleWorkoutChange}
      date={date}
      dateChange={handleDateChange}
      name={athletes.map(athlete => athlete.name)}
      nameChange={handleNameChange}
    />
    <NewForm
      add={addAthlete}
      value={newAthlete}
      onChange={handleAddAthlete}
      /> 
    {listOfWorkouts}
  </div>

  )
}

export default App;
