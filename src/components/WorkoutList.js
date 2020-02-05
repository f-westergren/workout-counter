import React from 'react'

const WorkoutList = ({name, workout}) => (
  <div>
    <h2>{name}</h2>
    {workout}
  </div>
)

export default WorkoutList