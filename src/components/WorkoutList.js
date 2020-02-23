import React from 'react'

const WorkoutList = ({name, workout, remove}) => {
  const workoutListStyle = {
    textAlign: 'center',
    fontFamily: 'Trebuchet MS',
    borderCollapse: 'collapse',
    border: '3px solid #ddd',
    width: '100%'
  }
  return (
    <div style={workoutListStyle}>
    {/* <h2>{name}</h2> */}
    <table>
      <tbody>
        <tr><th style={{paddingTop: '12px', paddingBottom: '12px', textAlign: 'center', backgroundColor: '#4CAF50', color: 'white' }}>{name}</th></tr>
    {workout.map(workout => {

  return (
    <tr key={workout.id}>
      <td>{new Date(workout.date).toDateString()}</td>
      <td>{workout.type}</td>
      <td>{workout.note}</td>
      <td><button onClick={remove}>delete workout</button></td>
    </tr>
  )
  })}
  </tbody>
  </table>
  </div>
  )}



export default WorkoutList

{/* <div>
<h2>{name}</h2>
{workout.map(workout => 
  <p key={workout._id}>
    {new Date(workout.date).toDateString()} - {workout.type} - {workout.note}</p>)}
</div> */}



