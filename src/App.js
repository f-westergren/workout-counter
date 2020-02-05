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

  // const increaseWorkout = (athlete) => {
  //   const person = athletes.find(p => p.id === athlete)
  //   const changedAthlete = {...person, workouts: person.workouts+1}

  //   athleteService
  //     .update(changedAthlete.id, changedAthlete)
  //     .then(returnedAthlete =>
  //       setAthletes(athletes.map(a => a.id !== athlete ? a : returnedAthlete).sort(compare)))
  // }

  // const decreaseWorkout = (athlete) => {
  //   const person = athletes.find(p => p.id === athlete)
  //   const changedAthlete = {...person, workouts: person.workouts-1}

  //   athleteService
  //     .update(changedAthlete.id, changedAthlete)
  //     .then(returnedAthlete =>
  //       setAthletes(athletes.map(a => a.id !== athlete ? a : returnedAthlete).sort(compare)))
  // }

  // const resetWorkouts = (athlete) => {
  //   const person = athletes.find(p => p.id === athlete)
  //   const changedAthlete = {...person, workouts: 0}

  //   athleteService
  //     .update(changedAthlete.id, changedAthlete)
  //     .then(returnedAthlete =>
  //       setAthletes(athletes.map(a => a.id !== athlete ? a : returnedAthlete).sort(compare)))
  // }

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

  const removeAthlete = async (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
    await athleteService.remove(id)
  
    setAthletes(athletes.filter(p => p.id !== id).sort(compare))
    }
  }

  const addWorkout = (event) => {
    event.preventDefault()
    const person = athletes.find(p => p.name === newName)
    const newWorkout = {
      ...person,
      workouts: [
        ...person.workouts,
      {
        type: workoutType,
        date: date,
        note: newNote,
        id: person.workouts.length+1
      }]
    }
    athleteService
      .update(person.id, newWorkout)
      .then(returnedWorkout => 
        setAthletes(athletes.map(p => p.id !== person.id ? p : returnedWorkout).sort(compare)))
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
      workouts={athlete.workouts.length}
      key={athlete.id}
      remove={() => removeAthlete(athlete.id, athlete.name)}
      />
    )

  const rows = () => 
      athletes.map(x => 
        <WorkoutList
          key={x.name}
          name={x.name}
          workout={x.workouts.map(x => <p key={x.note}>{x.date} {x.type} {x.note}</p>)}
          />
        )

  const handleAddAthlete = (event) => addNewAthlete(event.target.value)
  const handleNewNote = (event) => setNewNote(event.target.value)
  const handleWorkoutChange = (event) => setWorkoutType(event.target.value)
  const handleDateChange = (event) => setDate(event.target.value)
  const handleNameChange = (event) => setNewName(event.target.value)

  return (
  <div>
    <h1>Folkes träningsdagbok</h1>
    <table>
      <tbody>
        {names()}
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
      name={newName}
      nameChange={handleNameChange}
    />
    <NewForm
      add={addAthlete}
      value={newAthlete}
      onChange={handleAddAthlete}
      /> 
    {rows()}
  </div>

  )
}

export default App;
