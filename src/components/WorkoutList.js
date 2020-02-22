import React from 'react'

const WorkoutList = ({name, workout, id}) => (
  <div>
    <h2>{name}</h2>
    {workout.map(workout => 
      <p key={workout._id}>
        {new Date(workout.date).toDateString()} - {workout.type} - {workout.note}</p>)}
  </div>
)

export default WorkoutList





